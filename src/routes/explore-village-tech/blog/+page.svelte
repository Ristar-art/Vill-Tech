<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { createRedisStore } from '$lib/redisStore';

  const redisStore = createRedisStore();
  let posts: any[] = [];
  let featuredPost: any = null;
  let loading = true;
  let error: string | null = null;
  let currentCategory = 'all';
  let categories: string[] = [];

  // Subscribe to cache invalidation events
  let unsubscribeChannel: () => void;
  onMount(async () => {
      try {
          // Subscribe to posts cache updates
          unsubscribeChannel = redisStore.subscribeChannel('posts:updated', async () => {
              await fetchPosts(true); // Force refresh on update
          });

          await fetchPosts();
          loading = false;
      } catch (err) {
          console.error('Error fetching posts:', err);
          error = err.message || 'Failed to load posts';
          loading = false;
      }
  });

  onDestroy(() => {
      if (unsubscribeChannel) unsubscribeChannel();
  });

  async function fetchPosts(forceRefresh = false) {
      // Check cache first
      if (!forceRefresh) {
          const cachedPosts = redisStore.get('posts');
          if (cachedPosts) {
              console.log('Using cached posts');
              posts = cachedPosts.filter(post => post.status === 'published');
              updateDerivedData();
              return;
          }
      }

      // Fetch from API
      const response = await fetch('/api/posts');
      if (!response.ok) {
          throw new Error('Failed to fetch posts');
      }
      const allPosts = await response.json();

      // Cache posts with 5-minute TTL
      redisStore.set('posts', allPosts, 300);

      // Update posts
      posts = allPosts.filter(post => post.status === 'published');
      updateDerivedData();
  }

  function updateDerivedData() {
      // Extract featured post
      featuredPost = posts.find(post => post.isFeatured) || posts[0];

      // Extract all categories for the filter
      const allCategories = new Set<string>();
      posts.forEach(post => {
          if (post.categories && Array.isArray(post.categories)) {
              post.categories.forEach(category => allCategories.add(category));
          }
      });
      categories = Array.from(allCategories);
  }

  function formatDate(dateString: string) {
      if (!dateString) return 'Not published yet';
      const date = new Date(dateString);
      return isNaN(date.getTime())
          ? 'Invalid date'
          : date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
  }

  function navigateToPost(slug: string) {
      goto(`/explore-village-tech/blog/${slug}`);
  }

  function filterByCategory(category: string) {
      currentCategory = category;
  }

  $: filteredPosts = currentCategory === 'all'
      ? posts
      : posts.filter(post => post.categories.includes(currentCategory));
</script>

<svelte:head>
  <title>Our Blog | Latest Articles and News</title>
  <meta name="description" content="Read our latest blog posts and articles about trends, news, and insights.">
</svelte:head>

<div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
  <!-- Background Image -->
  <div 
    class="absolute inset-0 bg-cover bg-center" 
    style="background-image: url('/9.webp');"
  ></div>

  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-black-50 opacity-90"></div>

  <!-- Content -->
  <div class="relative z-10 max-w-2xl px-6">
    <h1 class="text-4xl font-bold ">Our Blog</h1>
    <p class="text-xl mt-5">
      Stay updated with the latest trends, insights, and stories from our community. Explore our blog for articles that inspire and inform.   
       </p>
  </div>
</div>
<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  
 
  

  {#if loading}
      <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  {:else if error}
      <div class="text-center text-red-600 py-8">
          <p>Error: {error}</p>
      </div>
  {:else}
      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-8">
          <button
              class={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === 'all' ? 'bg-red-500 hover:bg-gray-300 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              on:click={() => filterByCategory('all')}
          >
              All
          </button>
          {#each categories as category}
              <button
                  class={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === category ? 'bg-red-500 hover:bg-gray-300 text-white' : 'bg-gray-200 hover:bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  on:click={() => filterByCategory(category)}
              >
                  {category}
              </button>
          {/each}
      </div>

      <!-- Featured Post -->
      {#if featuredPost}
          <button
              type="button"
              class="mb-16 cursor-pointer w-full text-left"
              on:click={() => navigateToPost(featuredPost.slug)}
          >
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg shadow-lg">
                  <div class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                      <div class="md:flex">
                          <div class="md:w-1/2">
                              {#if featuredPost.featuredImage?.url}
                                  <img
                                      src={featuredPost.featuredImage.url}
                                      alt={featuredPost.featuredImage.altText || featuredPost.title}
                                      class="h-64 w-full object-cover"
                                  >
                              {:else}
                                  <div class="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                      <span class="text-gray-500 dark:text-gray-400">No image</span>
                                  </div>
                              {/if}
                          </div>
                          <div class="md:w-1/2 p-6">
                              <div class="flex items-center mb-2">
                                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Featured</span>
                                  {#if featuredPost.categories && featuredPost.categories.length > 0}
                                      <span class="bg-gray-100 text-gray-800 text-xs font-semibold mx-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{featuredPost.categories[0]}</span>
                                  {/if}
                              </div>
                              <h2 class="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                              <p class="text-gray-600 dark:text-gray-400 mb-4">{featuredPost.excerpt}</p>
                              <div class="flex items-center">
                                  {#if featuredPost.author?.profilePicture}
                                      <img
                                          src={featuredPost.author.profilePicture}
                                          alt={featuredPost.author.name}
                                          class="w-10 h-10 rounded-full mr-3 object-cover"
                                      >
                                  {:else}
                                      <!-- <div class="w-10 h-10 rounded-full mr-3 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                          <span class="text-gray-500 dark:text-gray-400">{featuredPost.author?.name?.charAt(0) || 'A'}</span>
                                      </div> -->
                                  {/if}
                                  <div>
                                      <p class="font-semibold text-red-500">{featuredPost.author?.name || 'by Vllage Tech'}</p>
                                      <p class="text-sm text-gray-500 dark:text-gray-400">
                                          {formatDate(featuredPost.publishedAt)} • {featuredPost.readTime || 3} min read
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </button>
      {/if}

      <!-- Post List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredPosts.filter(post => post.id !== (featuredPost?.id)) as post}
              <button
                  type="button"
                  class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-102 cursor-pointer w-full text-left"
                  on:click={() => navigateToPost(post.slug)}
              >
                  {#if post.featuredImage?.url}
                      <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.altText || post.title}
                          class="w-full h-48 object-cover"
                      >
                  {:else}
                      <div class="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span class="text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                  {/if}
                  <div class="p-5">
                      <div class="flex flex-wrap gap-2 mb-2">
                          {#each post.categories.slice(0, 2) as category}
                              <span class="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{category}</span>
                          {/each}
                      </div>
                      <h3 class="text-xl font-bold mb-3">{post.title}</h3>
                      <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div class="flex items-center">
                          {#if post.author?.profilePicture}
                              <img
                                  src={post.author.profilePicture}
                                  alt={post.author.name}
                                  class="w-8 h-8 rounded-full mr-2 object-cover"
                              >
                          {:else}
                              <!-- <div class="w-8 h-8 rounded-full mr-2 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <span class="text-gray-500 dark:text-gray-400">{post.author?.name?.charAt(0) || 'A'}</span>
                              </div> -->
                          {/if}
                          <div>
                              <p class="text-sm font-semibold text-red-500">{post.author?.name || 'by Village Tech'}</p>
                              <p class="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(post.publishedAt)} • {post.readTime || 3} min read
                              </p>
                          </div>
                      </div>
                  </div>
              </button>
          {/each}
      </div>

      {#if filteredPosts.length === 0}
          <div class="text-center py-12">
              <p class="text-gray-600 dark:text-gray-400">
                  {posts.length === 0 ? 'No published posts available.' : 'No posts found in this category.'}
              </p>
          </div>
      {/if}
  {/if}
</section>

<style>
  .hover\:scale-102:hover {
      transform: scale(1.02);
  }
  .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
</style>