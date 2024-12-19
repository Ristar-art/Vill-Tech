<script>
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import CourseCompetencies from "$lib/components/CourseCompetencies.svelte";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { onMount } from "svelte";
  
  /** @type {import('./$types').PageData} */
  export let data;
  export let streamed;

  onMount(() => {
    fetchCourseImages(data.course.fullname);
  });
  // let courseDetails =  params.details
  // $:console.log ("courseDetails is ", courseDetails)

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

  // Update streamed data when it arrives
  $: {
    if (streamed?.courseContents) {
      streamed.courseContents
        .then((contents) => {
          courseContents = contents;
        })
        .catch((error) => {
          console.error("Error loading streamed course contents:", error);
        });
    }

    if (streamed?.courseCompetencies) {
      streamed.courseCompetencies
        .then((competencies) => {
          courseCompetencies = competencies;
        })
        .catch((error) => {
          console.error("Error loading streamed course competencies:", error);
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
<svelte:head>
  <title>Village Tech</title>
  <meta name="description" content="Village tech" />
</svelte:head>
<body class="font-sans bg-[#21409A]">
  {#if course}
    <div class="relative">
      <div class="max-h-screen" in:fade={{ duration: 1000 }}>
        <div class="flex items-start">
          <div class="absolute inset-0">
            {#if courseImagesData.length > 0}
            <img
              src={courseImagesData[0].imageUrl}
              alt={courseImagesData[0].title}
              class="object-cover w-full h-full"
            />
            {/if}
          </div>
          <div class="relative z-10 flex items-center justify-center h-screen">
            <div
              class="bg-white bg-opacity-90 rounded-tl-[60px] rounded-br-[60px] p-16 mx-4 shadow-xl max-w-4xl"
            >
              {#if course}
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-4">
                     </div>
                  <h1 class="text-4xl font-codec-pro font-bold text-[#222222] mb-4">
                    {course.fullname}:
                    {@html cleanDescription(
                      PorogrammeOvervie?.competency?.shortname,
                    )}
                  </h1>

                  {#if course.summary}
                    <div class="text-lg text-gray-700 mb-4 font-codec-pro">
                      {@html cleanDescription(
                        PorogrammeOvervie?.competency?.description,
                      )}
                    </div>
                  {/if}

                  <div class="flex space-x-4">
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
                    <a
                      href="#"
                      class="bg-gray-100 text-blue-500 font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition transform hover:scale-105 flex items-center"
                    >
                      Contact Us
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
          </div>
        </div>
      </div>
      {#if courseCompetencies}
          <CourseCompetencies {courseCompetencies} />
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
  .absolute.inset-0 img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
</style>
