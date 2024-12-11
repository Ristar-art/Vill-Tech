<script>
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    
    let visible = false;
    let selectedCategory = 'all';
    
    // Sample blog data
    let blogPosts = [
      {
        title: "Empowering Rural Youth Through Technology",
        excerpt: "Discover how our latest initiative is bringing coding skills to rural communities...",
        category: "Community",
        date: "2024-03-15",
        readTime: "5 min read",
        image: "/api/placeholder/800/500",
        author: {
          name: "John Doe",
          role: "Program Director",
          avatar: "/api/placeholder/40/40"
        }
      },
      {
        title: "Success Story: From Student to Tech Leader",
        excerpt: "Meet Sarah, who went from our basic coding course to leading a tech team...",
        category: "Success Stories",
        date: "2024-03-10",
        readTime: "4 min read",
        image: "/api/placeholder/800/500",
        author: {
          name: "Jane Smith",
          role: "Student Coordinator",
          avatar: "/api/placeholder/40/40"
        }
      },
      {
        title: "New Course Launch: AI and Machine Learning",
        excerpt: "We're excited to announce our newest course in artificial intelligence...",
        category: "Announcements",
        date: "2024-03-05",
        readTime: "3 min read",
        image: "/api/placeholder/800/500",
        author: {
          name: "Mike Johnson",
          role: "Course Director",
          avatar: "/api/placeholder/40/40"
        }
      },
      {
        title: "Partnership with Local Businesses",
        excerpt: "Village Tech forms new partnerships to create job opportunities...",
        category: "News",
        date: "2024-03-01",
        readTime: "6 min read",
        image: "/api/placeholder/800/500",
        author: {
          name: "Lisa Brown",
          role: "Partnerships Lead",
          avatar: "/api/placeholder/40/40"
        }
      }
    ];
  
    let categories = ['all', ...new Set(blogPosts.map(post => post.category))];
    
    $: filteredPosts = selectedCategory === 'all' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);
  
    onMount(() => {
      visible = true;
    });
  
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
      <!-- Hero Section -->
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
  
      <!-- Category Filter -->
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
  
      <!-- Blog Grid -->
      <div class="max-w-7xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each filteredPosts as post, i}
            <div
              in:fly={{ y: 50, duration: 800, delay: i * 100 }}
              class="group bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <!-- Image -->
              <div class="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
  
              <!-- Content -->
              <div class="p-6">
                <h2 class="text-xl font-bold text-blue-900 mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {post.title}
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
  
                <!-- Author and Meta -->
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
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
  </style>