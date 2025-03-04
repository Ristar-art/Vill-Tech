<!-- routes/Courses/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { goto } from "$app/navigation";
  import * as Card from "$lib/components/ui/card";
  import { page } from "$app/stores";

  export let data: { id: string }; 

  let loading = true;
  let course: any = null;
  let error: string | null = null;
  let imageError = false;

  $: id = data.id || $page.params.id;
  $: console.log("Resolved ID:", id);

  onMount(async () => {
    console.log("onMount - Fetching course with ID:", id);
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
        console.log("Fetched course:", course);
        if (course.imageUrl) {
          console.log("Image URL:", course.imageUrl);
        } else {
          console.warn("No imageUrl found in course data");
        }
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
    <meta name="description" content={course.description || "Course details for " + course.title} />
    {#if course.imageUrl}
      <link rel="preload" href={course.imageUrl} as="image" />
    {/if}
  {:else}
    <title>Course Details - Village Tech</title>
    <meta name="description" content="Explore our tech training course details" />
  {/if}
</svelte:head>

<div class="min-h-screen bg-[#21409a] text-white">
  <!-- Header Section with Background Image -->
  <header 
    class="h-[70vh] flex flex-col items-center justify-center pt-20 text-center px-6 bg-cover bg-center relative"
    style={course && course.imageUrl && !imageError ? `background-image: url('${course.imageUrl}');` : 'background-color: #21409a;'}
  >
    <!-- Overlay for better text readability -->
    <div class="absolute inset-0 bg-black/50 z-0"></div>
    
    <div class="relative z-10">
      {#if loading}
        <h1 class="text-5xl font-extrabold tracking-tight animate-pulse text-indigo-300">Loading...</h1>
      {:else if error}
        <h1 class="text-5xl font-extrabold tracking-tight text-red-400">{error}</h1>
      {:else}
        <h1 class="text-5xl font-extrabold tracking-tight text-indigo-200">{course.title}</h1>
        <p class="mt-6 text-lg text-gray-200 max-w-3xl leading-relaxed">
          {@html course.description || "No description available."}
        </p>
      {/if}
    </div>

    <!-- Fallback image handling -->
    {#if course && course.imageUrl}
      <img
        src={course.imageUrl}
        alt=""
        class="hidden"
        on:error={handleImageError}
        loading="eager"
      />
    {/if}
  </header>

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
      <a href="/Courses" class="mt-6 inline-block text-indigo-300 hover:text-indigo-200 transition-colors duration-200 underline">
        Back to Courses
      </a>
    </div>
  {:else}
    <div class="max-w-5xl mx-auto px-6 pb-20">
      <div class="rounded-xl backdrop-blur-lg overflow-hidden">
        <div class="p-8 space-y-8">
          <!-- Core Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/10 p-4 rounded-lg">
              <h2 class="text-xl font-semibold text-indigo-300">Price</h2>
              <p class="mt-2 text-gray-200">R{(course.price ?? 0).toFixed(2)}</p>
            </div>
            <div class="bg-white/10 p-4 rounded-lg">
              <h2 class="text-xl font-semibold text-indigo-300">Duration</h2>
              <p class="mt-2 text-gray-200">{course.duration || "Not specified"}</p>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="space-y-6">
            {#if course.accreditation}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Accreditation</h2>
                <p class="mt-2 text-gray-200">{@html course.accreditation}</p>
              </div>
            {/if}
            {#if course.programmeOverviewDuration}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Programme Overview Duration</h2>
                <p class="mt-2 text-gray-200">{@html course.programmeOverviewDuration}</p>
              </div>
            {/if}
            {#if course.targetAudience}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Target Audience</h2>
                <p class="mt-2 text-gray-200">{@html course.targetAudience}</p>
              </div>
            {/if}
            {#if course.entryRequirements}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Entry Requirements</h2>
                <p class="mt-2 text-gray-200">{@html course.entryRequirements}</p>
              </div>
            {/if}
            {#if course.courseStructureModules}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Course Structure and Modules</h2>
                <p class="mt-2 text-gray-200">{@html course.courseStructureModules}</p>
              </div>
            {/if}
            {#if course.trainingMethodology}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Training Methodology</h2>
                <p class="mt-2 text-gray-200">{@html course.trainingMethodology}</p>
              </div>
            {/if}
            {#if course.careerOpportunities}
              <div>
                <h2 class="text-xl font-semibold text-indigo-300">Career Opportunities</h2>
                <p class="mt-2 text-gray-200">{@html course.careerOpportunities}</p>
              </div>
            {/if}
          </div>

          <!-- Back Button -->
          <a href="/Courses" class="inline-block text-indigo-300 hover:text-indigo-200 transition-colors duration-200 underline">
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
</style>