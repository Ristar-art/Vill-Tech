<!-- routes/Courses/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { goto } from "$app/navigation";
  import * as Card from "$lib/components/ui/card";
  import { page } from "$app/stores";
  import { fade, fly } from "svelte/transition";
  export let data: { id: string };

  let loading = true;
  let course: any = null;
  let error: string | null = null;
  let imageError = false;

  $: id = data.id || $page.params.id;

  onMount(async () => {
    if (!id) {
      error = "No course ID provided";
      loading = false;
      goto("/Courses");
      return;
    }
    await fetchCourseDetails();
  });

  async function fetchCourseDetails() {
    try {
      const courseRef = doc(db, "courses", id);
      const courseSnap = await getDoc(courseRef);

      if (courseSnap.exists()) {
        course = { id: courseSnap.id, ...courseSnap.data() };
        
      } else {
        error = "Course not found";
        console.log("Course not found for ID:", id);
        goto("/Courses");
      }
    } catch (err) {
      console.error("Error fetching course details:", err);
      error = "Failed to load course details. Please try again later.";
    } finally {
      loading = false;
    }
  }

  function handleImageError() {
    imageError = true;
    console.error("Failed to load image for course:", course?.title);
  }
</script>

<svelte:head>
  {#if course}
    <title>{course.title} - Village Tech</title>
    <meta
      name="description"
      content={course.description || "Course details for " + course.title}
    />
    {#if course.imageUrl}
      <link rel="preload" href={course.imageUrl} as="image" />
    {/if}
  {:else}
    <title>Course Details - Village Tech</title>
    <meta
      name="description"
      content="Explore our tech training course details"
    />
  {/if}
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Header Section with Background Image -->

  <div class="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a307a] to-[#21409a]">
    <!-- Background Overlay -->
    <div class="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Title and Description Section -->
      <div class="relative z-10 text-center md:text-left max-w-lg md:max-w-xl mb-6 md:mb-0">
        {#if loading}
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-200 animate-pulse drop-shadow-lg">
            Loading...
          </h1>
        {:else if error}
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-red-400 drop-shadow-lg">
            {error}
          </h1>
        {:else}
          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg"
            in:fade={{ duration: 500 }}
          >
            {course.title}
          </h1>
          <p
            class="mt-4 text-base sm:text-lg md:text-xl text-white max-w-3xl leading-relaxed opacity-90"
            in:fly={{ y: 20, duration: 600, delay: 200 }}
          >
            {@html course.description || "No description available."}
          </p>
        {/if}
      </div>
  
      <!-- Image Section -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <div class="relative w-full max-w-md aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
          {#if course && course.imageUrl}
            <img
              src={course.imageUrl}
              alt={course.title || "Course Image"}
              class="w-full h-full object-cover rounded-2xl"
              on:error={handleImageError}
              loading="eager"
            />
          {:else}
            <div class="w-full h-full flex items-center justify-center bg-gray-800/50 text-gray-400 text-base sm:text-lg">
              No image available
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  

  <!-- Course Details Section -->
  {#if loading}
    <div class="max-w-5xl mx-auto px-6 pb-20">
      <div class="bg-white/5 rounded-xl backdrop-blur-lg animate-pulse">
        <div class="h-72 bg-white/10 rounded-t-xl"></div>
        <div class="p-8 space-y-6">
          <div class="h-7 bg-white/15 w-2/3 rounded"></div>
          <div class="h-5 bg-white/10 w-full rounded"></div>
          <div class="h-5 bg-white/10 w-5/6 rounded"></div>
        </div>
      </div>
    </div>
  {:else if error}
    <div class="max-w-5xl mx-auto px-6 pb-20 text-center">
      <p class="text-red-400 text-lg">{error}</p>
      <a
        href="/Courses"
        class="mt-6 inline-block text-indigo-300 hover:text-indigo-200 transition-colors duration-200 underline"
      >
        Back to Courses
      </a>
    </div>
  {:else}
    <div class="max-w-5xl mx-auto px-6 pb-20">
      <div class="rounded-xl backdrop-blur-sm overflow-hidden">
        <div class="p-8 space-y-8">
          <!-- Core Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-[#21409a] p-4 rounded-lg">
              <h2 class="text-xl font-semibold text-white">Price</h2>
              <p class="mt-2 text-white">R{(course.price ?? 0).toFixed(2)}</p>
            </div>
            <div class="bg-[#21409a] p-4 rounded-lg">
              <h2 class="text-xl font-semibold text-white">Duration</h2>
              <p class="mt-2 text-white">{course.duration || "Not specified"}</p>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="space-y-6">
            {#if course.accreditation}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Accreditation
                </h2>
                <p class="mt-2">{@html course.accreditation}</p>
              </div>
            {/if}
            {#if course.programmeOverviewDuration}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Programme Overview Duration
                </h2>
                <p class="mt-2">{@html course.programmeOverviewDuration}</p>
              </div>
            {/if}
            {#if course.targetAudience}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Target Audience
                </h2>
                <p class="mt-2">{@html course.targetAudience}</p>
              </div>
            {/if}
            {#if course.entryRequirements}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Entry Requirements
                </h2>
                <p class="mt-2">{@html course.entryRequirements}</p>
              </div>
            {/if}
            {#if course.courseStructureModules}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Course Structure and Modules
                </h2>
                <p class="mt-2">{@html course.courseStructureModules}</p>
              </div>
            {/if}
            <!-- {#if course.trainingMethodology}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Training Methodology
                </h2>
                <p class="mt-2">{@html course.trainingMethodology}</p>
              </div>
            {/if} -->
            {#if course.careerOpportunities}
              <div>
                <h2 class="text-xl font-semibold text-[#21409A]">
                  Career Opportunities
                </h2>
                <p class="mt-2">{@html course.careerOpportunities}</p>
              </div>
            {/if}
          </div>

          <!-- Back Button -->
          <a
            href="/Courses"
            class="inline-block text-[#21409A] hover:text-indigo-200 transition-colors duration-200 underline"
          >
            Back to Courses
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  header {
    background-size: cover;
    background-position: center;
    transition: background-image 0.3s ease-in-out;
  }

  /* Ensure text is readable over the background */
  .relative {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  h1 {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  img {
    transition: transform 0.3s ease-in-out;
  }
</style>
