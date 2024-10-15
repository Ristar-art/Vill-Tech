<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  
  export let data;
  $: console.log(data);
</script>

<svelte:head>
  <title>Courses</title>
  <meta name="description" content="Modernized course listing app" />
</svelte:head>

<div class="flex flex-col min-h-[100dvh] pt-12">
  <div class="max-w-7xl mx-auto p-8">
    <h2 class="text-4xl font-extrabold text-gray-900 mb-6">Our Courses</h2>

    {#if data.courses && data.courses.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {#each data.courses as course}
          <div
            class="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
		  <a href="/Courses/{course.id}">
		 <div class="relative">
              <img
                src="https://picsum.photos/200/150?random={course.id}" 
                alt={course.fullname} 
                class="w-full h-48 object-cover"
              />
            </div>
		</a>
           

            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-3">{course.fullname}</h3>
              
              <p class="text-gray-600 text-sm mb-4 truncate">
                {@html course.summary || "No description available."}
              </p>

              <!-- Display start and end dates -->
              <div class="flex items-center text-sm text-gray-500 space-x-2 mb-4">
                <span class="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Start: {new Date(course.startdate * 1000).toLocaleDateString()}
                </span>
                {#if course.enddate}
                  <span class="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    End: {new Date(course.enddate * 1000).toLocaleDateString()}
                  </span>
                {/if}
              </div>

              <!-- Conditional icons for activity dates and completion conditions -->
              <div class="flex justify-between items-center mt-4">
                {#if course.showactivitydates}
                  <span class="text-sm text-blue-600 font-semibold">Activity Dates Shown</span>
                {/if}
                {#if course.showcompletionconditions}
                  <span class="text-sm text-purple-600 font-semibold">Completion Conditions Shown</span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-lg text-gray-600">No courses found.</p>
    {/if}
  </div>
</div>

<style>
  h2 {
    letter-spacing: -0.025em;
  }

  img {
    transition: transform 0.2s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }
</style>

