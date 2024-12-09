<script>
  import { page } from "$app/stores";
  import { fade } from 'svelte/transition';
  import CourseCompetencies from "$lib/components/CourseCompetencies.svelte";
  import { collection, getDocs, query, where } from 'firebase/firestore';
  import { db } from '$lib/firebase/firebase';
  import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  export let streamed;

  onMount(() => {
    fetchCourseImages(data.course.fullname);
  });

  let courseImagesData = [];
  let loading = true; // Define loading variable

  async function fetchCourseImages(courseFullName) {
    const imageCollection = collection(db, "courses");
    const q = query(imageCollection, where("title", "==", courseFullName));

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

  // Reactive variables to handle streamed data
  $: course = data.course;
  $: courseContents = data.courseContents;
  $: courseCompetencies = data.courseCompetencies;
  $: courseByField = data.courseByField;
  $: console.log("courseImagesData is ", courseImagesData);

  // Update streamed data when it arrives
  $: {
    if (streamed?.courseContents) {
      streamed.courseContents.then(contents => {
        courseContents = contents;
      }).catch(error => {
        console.error('Error loading streamed course contents:', error);
      });
    }

    if (streamed?.courseCompetencies) {
      streamed.courseCompetencies.then(competencies => {
        courseCompetencies = competencies;
      }).catch(error => {
        console.error('Error loading streamed course competencies:', error);
      });
    }
  }

  $: courseId = $page.params.details;
  $: PorogrammeOvervie = courseCompetencies?.find(
    (comp) => comp.competency.shortname === "Learning Objective",
  );

  function cleanDescription(html) {
    if (!html) return "";
    return html
      .replace(/dir="ltr"/g, "") // Remove dir="ltr" attributes
      .replace(/>\s+(?=\w)/g, "") // Remove remaining > followed by whitespace before words
      .replace(/<p><\/p>/g, ""); // Remove empty paragraphs
  }

  // Dynamically manage section toggle states
  let sections = {};
  $: courseContents.forEach((content) => (sections[content.id] = false));
</script>

<body class="font-sans pt-14 bg-[#21409A]">
  {#if !loading && courseImagesData.length > 0}
    <picture>
      <img 
        src={courseImagesData[0].imageUrl} 
        alt={courseImagesData[0].title} 
      />
    </picture>
  {:else if !loading}
    <p>No course image available.</p>
  {:else}
    <p>Loading course image...</p>
  {/if}

  {#if course}
    <div class="max-w-5xl mx-auto p-8 pt-12">
      <div in:fade={{ duration: 1000 }}>
        <div
          class="bg-white bg-opacity-90 rounded-tl-[60px] rounded-br-[60px] p-8 shadow-xl mb-12"
        >
          {#if course}
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4">
                <span
                  class="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full"
                  >Free</span
                >
                <span class="text-gray-600">Course</span>
              </div>
              <h1 class="text-4xl font-bold text-[#222222] mb-4">
                {course.fullname}:
                {@html cleanDescription(PorogrammeOvervie?.competency?.shortname)}
              </h1>

              {#if course.summary}
                <div class="text-lg text-gray-700 mb-4">
                  {@html cleanDescription(
                    PorogrammeOvervie?.competency?.description,
                  )}
                </div>
              {/if}

              <div class="flex flex-wrap items-center gap-6 mb-8">
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-blue-900 mr-2">4.3</span>
                  <div class="flex text-red-400 text-xl">
                    {"★".repeat(4)}{"☆"}
                  </div>
                  <span class="ml-2 text-sm text-gray-500">(3,400 ratings)</span>
                </div>
                <div class="flex items-center text-gray-700">
                  <svg
                    class="w-6 h-6 text-red-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>93,012 learners enrolled</span>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <a
                  href="https://villagetech.moodlecloud.com/login/index.php?loginredirect=1"
                  class="bg-red-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                >
                  <span>Start Learning</span>
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          {:else}
            <!-- Skeleton Loader for Course Header -->
            <div class="animate-pulse">
              <div class="h-6 bg-gray-200 w-1/4 mb-4"></div>
              <div class="h-12 bg-gray-200 w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-200 w-1/2 mb-2"></div>
              <div class="flex space-x-4">
                <div class="h-10 bg-gray-200 w-1/3"></div>
                <div class="h-10 bg-gray-200 w-1/3"></div>
              </div>
            </div>
          {/if}
        </div>

        {#if courseCompetencies}
          <CourseCompetencies courseCompetencies={courseCompetencies}/>
        {:else}
          <!-- Skeleton Loaders for Sections -->
          <div class="space-y-6">
            {#each Array(6) as _}
              <div class="bg-white/20 rounded-lg p-6 animate-pulse">
                <div class="h-6 bg-gray-200 w-1/2 mb-4"></div>
                <div class="h-4 bg-gray-200 w-3/4"></div>
              </div>
            {/each}
          </div>
        {/if}

        <div class="max-w-4xl mx-auto py-10"></div>
      </div>
    </div>
  {:else}
    <p class="error">Course not found</p>
  {/if}
</body>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  img {
    max-width: 100%; /* Responsive image */
    height: auto;
  }
</style>