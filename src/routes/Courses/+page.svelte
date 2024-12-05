<script>
  import { onMount } from "svelte";
  import { fade, fly } from 'svelte/transition';
  import { page } from "$app/stores";
  import { collection, getDocs, query } from 'firebase/firestore';
  import { db } from '$lib/firebase/firebase'; 

  export let data;
  export let streamed;
  let loading = true;
  let loadedCourses = data.courses;
  let courseImagesData = [];
  $: console.log('loadedCourses is : ',loadedCourses)
  $: {
    // Merge course images with loaded courses when both are available
    if (loadedCourses && courseImagesData.length > 0) {
      loadedCourses = loadedCourses.map(course => {
        // Find matching image by comparing displayname with title
        const matchingImage = courseImagesData.find(
          image => image.title === course.displayname
        );
        
        // If a matching image is found, add its imageUrl to the course
        return matchingImage 
          ? { ...course, courseimage: matchingImage.imageUrl }
          : course;
      });
    }
  }

  $: {
    // Update courses when streamed data arrives
    if (streamed?.courses) {
      streamed.courses.then(courses => {
        loadedCourses = courses;
      }).catch(error => {
        console.error('Failed to load courses:', error);
        loadedCourses = [];
      });
    }
  }

  onMount(() => {      
    fetchCourseImages();
  });

  async function fetchCourseImages() {
    const imageCollection = collection(db, "courses");
    const q = query(imageCollection);
    
    try {
      const imageSnapshot = await getDocs(q);
      courseImagesData = imageSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error fetching course images: ", err);
      if (err.code) {
        console.error("Error code:", err.code);
      }
      if (err.name) {
        console.error("Error name:", err.name);
      }
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Courses - Village Tech</title>
  <meta name="description" content="Explore our comprehensive tech training courses" />
</svelte:head>

<div class="min-h-screen bg-[#21409A]">
  {#if !loadedCourses || loadedCourses.length === 0}
    <!-- Skeleton Loader -->
    <div class="max-w-7xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each Array(6) as _} 
          <div class="bg-white/20 rounded-tl-[40px] rounded-br-[40px] animate-pulse">
            <div class="h-48 bg-white/10 rounded-t-[40px]"></div>
            <div class="p-6">
              <div class="h-6 bg-white/20 mb-4 w-3/4"></div>
              <div class="h-4 bg-white/10 mb-2 w-full"></div>
              <div class="h-4 bg-white/10 mb-2 w-5/6"></div>
              <div class="flex space-x-2 mt-4">
                <div class="h-8 bg-white/20 w-1/3 rounded-full"></div>
                <div class="h-8 bg-white/20 w-1/3 rounded-full"></div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <!-- Rest of your existing code remains the same, just replace courseDetails -->
    <div class="max-w-7xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {#each loadedCourses as course}
          <div
            in:fly={{ y: 50, duration: 800, delay: 100 }}
            class="bg-white rounded-tl-[40px] rounded-br-[40px] shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
          >
            <a href="/Courses/{course.id}"class:active={$page.url.pathname === `/Courses/${course.id}`}>
              <div class="relative">
                <img
                 src={course.courseimage} alt={course.fullname}
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
    </div>
  {/if}
</div>