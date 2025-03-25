<!-- <script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { selectedPost } from '$lib/stores/stores';
  import { goto } from '$app/navigation'; // or your routing library

function handlePostClick(post) {
    selectedPost.set(post); // Store the post object
    goto(`/Blog/${post.slug}`); // Navigate to the next page
}
  let editor;
  let title = "";
  let slug = "";
  let imageUrl = "";
  let posts = [];
  let editingPost = null;
  let viewingPost = null; 
  onMount(() => {
    visible = true;
     fetchPosts();
  });

  async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      posts = data;
  }
  let visible = false;
  let selectedCategory = 'all';
  
 

  let categories = ['all', ...new Set(posts.map(post => post.category))];
  
  $: filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

 
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
</script>

<svelte:head>
  <title>Village Tech Blog</title>
  <meta name="description" content="Latest news, success stories, and updates from Village Tech Training Solutions" />
</svelte:head>

<div class="min-h-screen bg-[#21409A]">
  {#if visible}
    <div class="py-16 px-4" in:fade={{ duration: 1000 }}>
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-24">
          <span class="text-blue-400">Village</span> <span class="text-red-500">Tech</span> Blog
        </h1>
        <p class="text-white/80 text-center max-w-2xl mx-auto">
          Explore our latest stories, success cases, and updates about technology education and community impact
        </p>
      </div>
    </div>

    <div class="flex justify-center gap-4 mb-12 px-4 overflow-x-auto">
      {#each categories as category}
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
            {selectedCategory === category.toLowerCase() 
              ? 'bg-red-500 text-white' 
              : 'bg-white/10 text-white hover:bg-white/20'}"
          on:click={() => selectedCategory = category.toLowerCase()}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      {/each}
    </div>

    <div class="max-w-7xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredPosts as post, i}
          <div
            in:fly={{ y: 50, duration: 800, delay: i * 100 }}
            class="group bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div on:click={() => handlePostClick(post)} class="cursor-pointer">
              <img
                  src={post.imageUrl}
                  alt={post.slug}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
            
           

            <div class="p-6">
              <h2 class="text-xl font-bold text-blue-900 mb-2 group-hover:text-red-500 transition-colors duration-300">
                {post.title}
              </h2>
              <p class="text-gray-600 text-sm mb-4">
                {post.excerpt}
              </p>

              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-3">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    class="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p class="font-medium text-blue-900">{post.author.name}</p>
                    <p class="text-gray-500 text-xs">{post.author.role}</p>
                  </div>
                </div>
                <div class="text-gray-500 text-xs">
                  <p>{formatDate(post.date)}</p>
                  <p>{post.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Enable smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }

  /* Add a subtle gradient animation to the background */
  .bg-gradient-to-br {
    background-size: 400% 400%;
    animation: gradientAnimation 15s ease infinite;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style> -->