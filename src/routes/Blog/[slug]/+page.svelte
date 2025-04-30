<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { createRedisStore } from '$lib/redisStore';

    const redisStore = createRedisStore();
    let post: any = null;
    let relatedPosts: any[] = [];
    let loading = true;
    let error: string | null = null;
    let unsubscribeChannel: (() => void) | null = null;

    // Reactive statement to handle slug changes
    $: {
        const slug = $page.params.slug;
        if (slug) {
            // Clean up previous subscription
            if (unsubscribeChannel) {
                unsubscribeChannel();
                unsubscribeChannel = null;
            }

            // Subscribe to new post cache updates
            unsubscribeChannel = redisStore.subscribeChannel(`post:${slug}:updated`, async () => {
                await fetchPost(slug, true); // Force refresh on update
            });

            // Fetch post for the new slug
            fetchPost(slug).then(() => {
                loading = false;
            }).catch((err) => {
                console.error('Error fetching post:', err);
                error = err.message || 'Failed to fetch post';
                loading = false;
            });
        } else {
            error = 'No slug provided';
            loading = false;
        }
    }

    onDestroy(() => {
        if (unsubscribeChannel) {
            unsubscribeChannel();
        }
    });

    async function fetchPost(slug: string, forceRefresh = false) {
        // Check cache first
        if (!forceRefresh) {
            const cachedPost = redisStore.get(`post:${slug}`);
            if (cachedPost) {
                console.log('Using cached post:', slug);
                post = cachedPost;
                await fetchRelatedPosts();
                return;
            }
        }

        // Fetch from API
        const response = await fetch(`/api/posts/by-slug?slug=${encodeURIComponent(slug)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        post = await response.json();

        // Cache post with 5-minute TTL
        redisStore.set(`post:${slug}`, post, 300);

        // Track post view
        await trackPostView(post.id);

        // Fetch related posts
        await fetchRelatedPosts();
    }

    async function trackPostView(postId: string) {
        try {
            const response = await fetch('/api/posts/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId })
            });
            if (!response.ok) console.error('Failed to increment view');
        } catch (err) {
            console.error('Error tracking view:', err);
        }
    }

    async function fetchRelatedPosts() {
        if (!post) return;

        // Check cache first
        const cachedRelated = redisStore.get(`related:${post.slug}`);
        if (cachedRelated) {
            console.log('Using cached related posts:', post.slug);
            relatedPosts = cachedRelated;
            return;
        }

        // Fetch all posts
        const response = await fetch('/api/posts');
        if (!response.ok) {
            console.error('Failed to fetch related posts');
            return;
        }
        const allPosts = await response.json();

        // Filter out the current post and only show published posts
        const publishedPosts = allPosts.filter(p => 
            p.id !== post.id && p.status === 'published'
        );

        // Find posts with matching categories or tags
        let matchingPosts = publishedPosts.filter(p => {
            const sharedCategories = p.categories.filter(cat => 
                post.categories.includes(cat)
            );
            const sharedTags = p.tags.filter(tag => 
                post.tags.includes(tag)
            );
            return sharedCategories.length > 0 || sharedTags.length > 0;
        });

        // If not enough related posts, add recent posts
        if (matchingPosts.length < 3) {
            const recentPosts = publishedPosts
                .filter(p => !matchingPosts.find(mp => mp.id === p.id))
                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
            matchingPosts = [...matchingPosts, ...recentPosts].slice(0, 3);
        } else {
            matchingPosts = matchingPosts.slice(0, 3);
        }

        relatedPosts = matchingPosts;

        // Cache related posts with 5-minute TTL
        redisStore.set(`related:${post.slug}`, relatedPosts, 300);
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

    // async function likePost() {
    //     if (!post) return;

    //     try {
    //         const response = await fetch('/api/posts/like', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ id: post.id })
    //         });
    //         if (!response.ok) throw new Error('Failed to increment like');
    //         post = { ...post, likes: post.likes + 1 };

    //         // Update cache
    //         redisStore.set(`post:${post.slug}`, post, 300);
    //     } catch (err) {
    //         console.error('Error liking post:', err);
    //     }
    // }

    function navigateToPost(slug: string) {
        goto(`/Blog/${slug}`);
    }

    function goBack() {
        goto('/Blog');
    }
</script>

<svelte:head>
    {#if post}
        <title>{post.meta?.metaTitle || post.title}</title>
        <meta name="description" content={post.meta?.metaDescription || post.excerpt}>
        <meta property="og:title" content={post.meta?.ogTitle || post.title}>
        <meta property="og:description" content={post.meta?.ogDescription || post.excerpt}>
        {#if post.meta?.ogImage || post.featuredImage?.url}
            <meta property="og:image" content={post.meta?.ogImage || post.featuredImage?.url}>
        {/if}
    {/if}
</svelte:head>

<section class="w-full mx-auto py-12">
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    {:else if error || !post}
        <div class="text-center py-16">
            <h1 class="text-2xl font-bold text-red-600 mb-2">Post Not Found</h1>
            <p class="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist or is no longer available.</p>
            <button
                on:click={goBack}
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
                Return to Blog
            </button>
        </div>
    {:else}
        <!-- Back Button -->
     

        <!-- Featured Image Section -->
        {#if post.featuredImage?.url}
            <div class="relative h-[60vh] w-full flex flex-col items-center justify-center pt-20 text-center text-white mb-12">
                <!-- Background Image -->
                <div 
                    class="absolute inset-0 bg-cover bg-center" 
                    style="background-image: url('{post.featuredImage.url}');"
                ></div>
              
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-black-50 opacity-90"></div>
              
                <!-- Content -->
                <div class="relative z-10 max-w-2xl px-6">
                    <div class="mb-8 w-full">
                        
            
                        <h1 class="text-4xl font-bold mb-4">{post.title}</h1>
            
                       
                    </div>
                </div>
            </div>
        {:else}
            <!-- Title Section (when no featured image) -->
            <div class="mb-12">
                <div class="flex flex-wrap gap-2 mb-4">
                    {#each post.categories as category}
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{category}</span>
                    {/each}
                </div>
                <h1 class="text-4xl font-bold mb-4">{post.title}</h1>
                
            </div>
        {/if}
        <div class="flex justify-between items-center mb-8 max-w-6xl mx-auto">
            <button
              on:click={goBack}
              class="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium py-2 px-6 transition-colors duration-200"
              aria-label="Back to blog"
            >
              Back to Blog
            </button>
          
              <div
                class="flex items-center text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-200"
              >
                <div class="max-w-4xl flex flex-row  gap-2">
                  <div class="flex flex-row h-0.5 gap-2 mb-4">
                    {#each post.categories as category}
                      <span
                        class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        >{category}</span
                      >
                    {/each}
                  </div>
          
                    <div>
                        
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(post.publishedAt)} • {post.readTime || 3} min read
                      </p>
                  </div>
                </div>
              </div>
            </div>
          
        
        <!-- Post Content -->
        <div class="prose prose-lg max-w-4xl mx-auto dark:prose-invert mb-12">
            <h1 class="text-4xl font-bold mb-4">{post.title}</h1>

            {@html post.content}
        </div>

        <!-- Tags -->
        {#if post.tags && post.tags.length > 0}
            <div class="max-w-4xl mx-auto mb-12">
                <h3 class="text-lg font-semibold mb-2">Tags:</h3>
                <div class="flex flex-wrap gap-2">
                    {#each post.tags as tag}
                        <span class="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{tag}</span>
                    {/each}
                </div>
            </div>
        {/if}
        <!-- Comments Section -->
        <!-- Engagement -->
        <!-- <div class="max-w-4xl mx-auto flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-12">
            <div class="flex items-center">
                <button
                    on:click={likePost}
                    class="flex items-center text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes || 0} likes</span>
                </button>
            </div>

            <div class="flex items-center text-gray-700 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.views || 0} views</span>
            </div>
        </div> -->

        <!-- Author Bio -->
        {#if post.author?.name}
            <div class="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-12">
                <div class="flex flex-col sm:flex-row items-start sm:items-center">
                    {#if post.author.profilePicture}
                        <img
                            src={post.author.profilePicture}
                            alt={post.author.name}
                            class="h-12 w-12 rounded-full mr-6 object-cover mb-4 sm:mb-0"
                        >
                    {:else}
                        <div class="h-32 w-32 rounded-full mr-6 bg-gray-300 dark:bg-gray-700 flex items-center justify-center mb-4 sm:mb-0">
                            <span class="text-gray-600 dark:text-gray-400 text-4xl font-bold">{post.author.name.charAt(0)}</span>
                        </div>
                    {/if}
                    <div class="px-4">
                        <h3 class="text-xl font-bold mb-1">About {post.author.name}</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-3">Author</p>
                        <p class="text-gray-700 dark:text-gray-300">
                            {post.author.bio || `${post.author.name} is a contributing author to our blog.`}
                        </p>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Related Posts -->
        {#if relatedPosts.length > 0}
            <div class="max-w-4xl mx-auto mb-12">
                <h2 class="text-2xl font-bold mb-6">Related Articles</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each relatedPosts as relatedPost}
                        <button
                            type="button"
                            class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer w-full text-left"
                            on:click={() => navigateToPost(relatedPost.slug)}
                        >
                            {#if relatedPost.featuredImage?.url}
                                <img
                                    src={relatedPost.featuredImage.url}
                                    alt={relatedPost.featuredImage.altText || relatedPost.title}
                                    class="w-full h-48 object-cover"
                                >
                            {:else}
                                <div class="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span class="text-gray-500 dark:text-gray-400">No image</span>
                                </div>
                            {/if}
                            <div class="p-4">
                                <h3 class="text-lg font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">{relatedPost.excerpt}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(relatedPost.publishedAt)}
                                </p>
                            </div>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
</section>

<style>
    :global(.prose) {
        max-width: 100%;
    }
    :global(.prose img) {
        border-radius: 0.5rem;
        margin: 2rem auto;
    }
    :global(.prose a) {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
    }
    :global(.prose a:hover) {
        text-decoration: underline;
    }
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>