<script>
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import CourseCompetencies from "$lib/components/CourseCompetencies.svelte";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { moodleClient } from '$lib/moodle';

  const cache = new Map();
  let loading = true;
  let course = null;
  let courseByField = [];
  let courseContents = [];
  let courseCompetencies = [];
  let courseImagesData = [];
  let error = null;

  $: courseId = parseInt($page.params.details);

  $: startDate = course ? new Date(course.startdate * 1000) : new Date();
  $: console.log('startDate is ', startDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  $: formattedStartDate = startDate.toLocaleDateString('en-za', options);

  onMount(async () => {
    if (!isNaN(courseId)) {
      await loadCourseData();
    } else {
      error = { status: 400, message: 'Invalid course ID' };
      loading = false;
    }
  });

  async function loadCourseData() {
    try {
      console.log(`Loading course data for ID: ${courseId}`);
      const cacheKey = `moodle:course:${courseId}`;
      let cachedCourseData = cache.get(cacheKey);

      if (cachedCourseData) {
        course = cachedCourseData.course;
        courseByField = cachedCourseData.courseByField;
        courseContents = cachedCourseData.courseContents;
        courseCompetencies = cachedCourseData.courseCompetencies;
        console.log('Using cached data:', cachedCourseData);
      } else {
        console.log('Fetching courses from Moodle...');
        const allCourses = await moodleClient.getCourses();
        course = allCourses.find(c => c.id === courseId);

        if (!course) {
          throw new Error(`Course with ID ${courseId} not found`);
        }
        console.log('Found course:', course);

        console.log('Fetching additional course data...');
        [courseByField, courseContents, courseCompetencies] = await Promise.all([
          moodleClient.getCourseByField('id', courseId.toString()).catch(err => {
            console.error('Failed to fetch course by field:', err.message);
            return [];
          }),
          moodleClient.getCourseContents(courseId).catch(err => {
            console.error('Failed to fetch course contents:', err.message);
            if (err.message.includes('Access control exception')) {
              console.warn('Access denied to course contents. User may need enrollment or higher privileges.');
            }
            return [];
          }),
          moodleClient.getCourseCompetencies(courseId).catch(err => {
            console.error('Failed to fetch course competencies:', err.message);
            return [];
          })
        ]);

        const cacheData = { course, courseByField, courseContents, courseCompetencies };
        cache.set(cacheKey, cacheData);
        setTimeout(() => cache.delete(cacheKey), 60 * 60 * 1000);
        console.log('Cached data:', cacheData);
      }

      await fetchCourseImages(course.fullname);
    } catch (e) {
      console.error('Failed to fetch course data:', e.message);
      error = { status: e.message.includes('not found') ? 404 : 500, message: e.message };
      course = null;
      courseByField = [];
      courseContents = [];
      courseCompetencies = [];
    } finally {
      loading = false;
    }
  }

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
      console.error("Error fetching course images: ", err.message);
    }
  }

  $: PorogrammeOvervie = courseCompetencies?.find(
    (comp) => comp.competency.shortname === "Learning Objective",
  );

  function cleanDescription(html) {
    if (!html) return "";
    return html
      .replace(/dir="ltr"/g, "")
      .replace(/>\s+(?=\w)/g, "")
      .replace(/<p><\/p>/g, "");
  }

  let sections = {};
  $: courseContents.forEach((content) => (sections[content.id] = false));
</script>

<svelte:head>
  <title>Village Tech</title>
  <meta name="description" content="Village tech" />
</svelte:head>

<body class="font-sans bg-[#21409A] max-w-7xl mx-auto flex justify-center items-center min-h-screen">
  {#if loading}
    <div class="w-full max-w-5xl">
      <div class="h-screen flex flex-col justify-center items-center">
        <div class="grid gap-6 md:grid-cols-2 items-center animate-pulse">
          <div class="bg-white/20 rounded-lg h-96 w-full"></div>
          <div class="space-y-4">
            <div class="h-8 bg-white/20 w-3/4 mx-auto md:mx-0"></div>
            <div class="h-4 bg-white/20 w-full"></div>
            <div class="h-4 bg-white/20 w-1/2 mx-auto md:mx-0"></div>
            <div class="h-8 bg-white/20 w-1/3 mx-auto md:mx-0"></div>
          </div>
        </div>
      </div>
    </div>
  {:else if error}
    <p class="error text-white text-center">
      {error.message} (Status: {error.status})
      {#if error.message.includes('Access control exception')}
        <br />Please ensure you are logged in or have the necessary permissions.
      {/if}
    </p>
  {:else if course}
    <div class="w-full max-w-5xl">
      <div class="h-screen flex flex-col justify-center items-center" in:fade={{ duration: 1000 }}>
        <div class="grid gap-6 md:grid-cols-2 items-center">
          <div>
            {#if courseImagesData.length > 0}
              <img
                src={courseImagesData[0].imageUrl}
                alt={courseImagesData[0].title}
                width={600}
                height={400}
                class="rounded-lg object-cover"
              />
            {/if}
          </div>
          <div class="space-y-4 text-center md:text-left">
            <h1 class="text-3xl font-bold text-white">{course.fullname}</h1>
            {#if course.summary}
              <p class="text-white">
                {@html course.summary}
              </p>
            {/if}
            <div class="flex justify-center md:justify-start space-x-2 text-white">
              <p>Start Date: {formattedStartDate}</p>
            </div>
            <div class="flex justify-center md:justify-start space-x-2 text-white">
              <span>12 weeks</span>
            </div>
            <div class="flex justify-center md:justify-start space-x-2 font-bold text-2xl">
              <span>R 1,999</span>
            </div>
            <button on:click={() => goto('/Signup')} class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition w-full md:w-auto">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {#if courseCompetencies?.length > 0}
        <CourseCompetencies {courseCompetencies} />
      {:else if courseContents.length === 0}
        <p class="text-white text-center">Course contents not available due to access restrictions.</p>
      {:else}
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
    <p class="error text-white text-center">Course not found</p>
  {/if}
</body>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>