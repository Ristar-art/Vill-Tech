<script>
  import { onMount } from "svelte";
  import { fade, fly } from 'svelte/transition';
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  
  export let data;
  let visible = false;
  
  onMount(() => {
    visible = true;
  });
</script>

<svelte:head>
  <title>Courses - Village Tech</title>
  <meta name="description" content="Explore our comprehensive tech training courses" />
</svelte:head>

<div class="min-h-screen bg-[#21409A]">
  {#if visible}
    <!-- Hero Section -->
    <div class="py-16 px-4" in:fade={{ duration: 1000 }}>
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-24">
          <span class="text-blue-400">Our</span> <span class="text-red-500">Courses</span>
        </h1>
        <!-- <p class="text-white/80 text-center max-w-2xl mx-auto">
          Explore our cutting-edge tech training programs designed to launch your career in technology
        </p> -->
      </div>
    </div>

    <!-- Courses Grid -->
    <div class="max-w-7xl mx-auto px-4 pb-16">
      {#if data.courses && data.courses.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each data.courses as course}
            <div
              in:fly={{ y: 50, duration: 800, delay: 100 }}
              class="bg-white rounded-tl-[40px] rounded-br-[40px] shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <a href="/Courses/{course.id}">
                <div class="relative">
                  <img
                    src="https://picsum.photos/200/150?random={course.id}"
                    alt={course.fullname}
                    class="w-full h-48 object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                </div>
              </a>

              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-3">{course.fullname}</h3>
                
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  {@html course.summary || "No description available."}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span class="inline-block px-3 py-1 bg-blue-400 text-white text-sm rounded-full">
                    Start: {new Date(course.startdate * 1000).toLocaleDateString()}
                  </span>
                  {#if course.enddate}
                    <span class="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                      End: {new Date(course.enddate * 1000).toLocaleDateString()}
                    </span>
                  {/if}
                </div>

                <div class="flex flex-wrap gap-4 mt-4 text-sm">
                  {#if course.showactivitydates}
                    <div class="flex items-center space-x-2">
                      <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <span>Activity Dates</span>
                    </div>
                  {/if}
                  {#if course.showcompletionconditions}
                    <div class="flex items-center space-x-2">
                      <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <span>Completion Tracking</span>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div 
          in:fade={{ duration: 800 }}
          class="bg-white/10 rounded-tl-[40px] rounded-br-[40px] p-8 text-white text-center"
        >
          <p class="text-xl">No courses found.</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  img {
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }
</style>