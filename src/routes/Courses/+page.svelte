<!-- CoursesPage.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { collection, getDocs, query } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import * as Card from "$lib/components/ui/card";
  import { createRedisStore } from "$lib/redisStore"; // Import the redis store

  // Initialize the redis-like store
  const cache = createRedisStore();

  let loading = true;
  let loadedCourses: any[] = []; // Will hold courses from Firebase
  $: console.log("loadedCourses is :",loadedCourses)
  // Fetch courses from Firebase or cache on mount
  onMount(async () => {
    await fetchCourses();
  });

  async function fetchCourses() {
    const cacheKey = "courses";

    // Try to get data from cache first
    const cachedCourses = cache.get(cacheKey);
    if (cachedCourses) {
      loadedCourses = cachedCourses; // Use cached data if available
      loading = false; // Set loading to false immediately for cached data
      return; // Exit early if cache hit
    }

    // If no cache, fetch from Firebase
    const coursesCollection = collection(db, "courses");
    const q = query(coursesCollection);

    try {
      const coursesSnapshot = await getDocs(q);
      loadedCourses = coursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Cache the fetched data for 1 hour (3600 seconds)
      cache.set(cacheKey, loadedCourses, 3600);
    } catch (err) {
      console.error("Error fetching courses: ", err);
      if (err.code) console.error("Error code:", err.code);
      if (err.name) console.error("Error name:", err.name);
      loadedCourses = []; // Fallback to empty array on error
    } finally {
      loading = false; // Ensure loading is false whether success or fail
    }
  }
</script>

<svelte:head>
  <title>Courses - Village Tech</title>
  <meta name="description" content="Explore our comprehensive tech training courses" />
</svelte:head>

<div class="min-h-screen bg-[#21409a]">
  <div class="h-[60vh] flex flex-col items-center justify-center pt-20 text-center">
    <h1 class="text-4xl font-bold text-blue-400">Our Courses</h1>
    <p class="text-xl mt-5 text-white max-w-2xl mx-auto">
      At Village Tech, we believe in making a positive impact beyond education. Explore the courses we offer and how you
      can get involved.
    </p>
  </div>

  {#if loading || loadedCourses.length === 0}
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
    <div class="max-w-7xl mx-auto px-4 pb-16 pt-5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each loadedCourses as course}
          <Card.Root key={course.id}>
            <Card.Content class="p-0">
              <a href="/Courses/{course.id}" data-sveltekit-preload-data="false">
                <div class="relative">
                  <img
                    src={course.imageUrl || "/placeholder-image.jpg"}
                    alt={course.title}
                    class="w-full h-48 object-cover rounded-md"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </a>
            </Card.Content>
            <Card.Footer class="flex flex-col items-start p-4">
              <h3 class="text-lg font-semibold">{course.title}</h3>
              <p class="text-gray-600 text-xs mb-3 line-clamp-2">
                {@html course.description || "No description available."}
              </p>

             

              <!-- {#if course.programmeOverviewDuration}
                <div class="flex items-center space-x-1 text-xs">
                  <span>Overview: {@html course.programmeOverviewDuration}</span>
                </div>
              {/if} -->
              <div class="flex flex-wrap gap-1 mb-2">
                <span class="inline-block px-2 py-1 bg-blue-400 text-white text-xs rounded-full">
                  Duration: {course.duration || "Not specified"}
                </span>
                <span class="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  Price: R{(course.price ?? 0).toFixed(2)}
                </span>
              </div>
            </Card.Footer>
          </Card.Root>
        {/each}
      </div>
    </div>
  {/if}
</div>