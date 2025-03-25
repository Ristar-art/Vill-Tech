<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import * as Card from "$lib/components/ui/card";
  import { createRedisStore } from "$lib/redisStore";
  import FilterButton from "./FilterButton.svelte";
  import { page } from "$app/stores";

  const cache = createRedisStore();
  let loading = true;
  let loadedCourses: any[] = [];
  let currentCourseType = $page.params.courseType || "all-courses";
  let filter = "all";
 
  
  // Fetch courses when component mounts or courseType changes
  onMount(() => fetchCoursesByType(currentCourseType));
  $: currentCourseType = $page.params.courseType || "all-courses";
  $: fetchCoursesByType(currentCourseType);

  async function fetchCoursesByType(courseType: string) {
    loading = true;
    
    // Reset filter when course type changes
    if (courseType !== "all-courses") {
      filter = "all";
    }

    const cacheKey = courseType === "all-courses" ? "courses" : `courses_${courseType}`;
    const cachedCourses = cache.get(cacheKey);
    
    if (cachedCourses) {
      loadedCourses = cachedCourses;
      loading = false;
      return;
    }

    try {
      let querySnapshot;
      if (courseType === "all-courses") {
        const coursesCollection = collection(db, "courses");
        querySnapshot = await getDocs(query(coursesCollection));
      } else {
        querySnapshot = await getDocs(
          query(collection(db, "courses"), where("category", "==", courseType))
        );
      }

      loadedCourses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      cache.set(cacheKey, loadedCourses, 3600);
    } catch (err) {
      console.error("Error fetching courses: ", err);
      loadedCourses = [];
    } finally {
      loading = false;
    }
  }

  function filterCourses(courses: any[], filter: string) {
    if (!courses || filter === "all") return courses;
    return courses.filter((course) => 
      course.category?.toLowerCase() === filter.toLowerCase()
    );
  }

  $: filteredCourses = filterCourses(loadedCourses, filter);
</script>

<svelte:head>
  <title>Village Tech - Courses</title>
  <meta name="description" content="Explore our comprehensive tech training courses" />
</svelte:head>

<div class="min-h-screen bg-[#21409a]">
  <div
    class="h-[60vh] flex flex-col items-center justify-center pt-20 text-center bg-cover bg-center"
    style="background-image: url('https://picsum.photos/500/300?random=9');"
  >
    <h1 class="text-4xl font-bold text-white">Our Courses</h1>
    <p class="text-xl mt-5 text-white max-w-2xl mx-auto">
      At Village Tech, we believe in making a positive impact beyond education. Explore the courses we offer and how you
      can get involved.
    </p>
  </div>

  {#if loading || loadedCourses.length === 0}
    <!-- Skeleton Loader -->
    <div class="max-w-7xl mx-auto px-4 pt-8 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each Array(6) as _}
          <div class="bg-white/20 rounded-xl animate-pulse">
            <div class="h-48 bg-white/10 rounded-2xl"></div>
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
  <div class="my-8 flex justify-center">
    {#if currentCourseType === "all-courses"}
      <FilterButton bind:filter />
    {/if}
  </div>
    <div class="flex flex-row flex-wrap justify-center" in:fade={{ duration: 300 }}>
      {#each filteredCourses as course}
        <Card.Root class="w-[20rem] m-4 bg-white rounded-md">
          <Card.Content class="p-0">
            <a href="/Courses/{currentCourseType}/{course.id}" class="cursor-pointer">
              <img
                src={course.imageUrl || "/placeholder-image.jpg"}
                alt={course.title}
                class="w-full h-[18rem] object-cover rounded-md"
              />
            </a>
          </Card.Content>
          <Card.Footer class="flex flex-col items-start p-4">
            <h3 class="text-lg text-[#21409a] font-semibold">{course.title}</h3>
            <p class="text-[#21409a] text-xs mb-3 line-clamp-2">
              {@html course.description || "No description available."}
            </p>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="inline-block px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                Duration: {course.duration || "Not specified"}
              </span>
              <span class="inline-block px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                Price: R{(course.price ?? 0).toFixed(2)}
              </span>
            </div>
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  {/if}
</div>