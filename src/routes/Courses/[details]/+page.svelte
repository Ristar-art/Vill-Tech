<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import CourseIncludes from "$lib/components/CourseIncludes.svelte";
  import Accreditation from "$lib/components/Accreditation.svelte";
  import Duration from "$lib/components/Duration.svelte";
  import TargetAudience from "$lib/components/TargetAudience.svelte";
  import EntryRequirements from "$lib/components/EntryRequirements.svelte";
  import CourseAndModules from "$lib/components/CourseAndModules.svelte";
  import Module1 from "$lib/components/Module1.svelte";
  import Module2 from "$lib/components/Module2.svelte";
  import Module3 from "$lib/components/Module3.svelte";
  import Module4 from "$lib/components/Module4.svelte";
  import Module5 from "$lib/components/Module5.svelte";
  import Module6 from "$lib/components/Module6.svelte";
  import Module7 from "$lib/components/Module7.svelte";
  import Module8 from "$lib/components/Module8.svelte";
 import TrainingMethodology from "$lib/components/TrainingMethodology.svelte";
 import CareerOpportunities from "$lib/components/CareerOpportunities.svelte";
 import RecommendedCoursesFee from "$lib/components/RecommendedCoursesFee.svelte";
  

  /** @type {import('./$types').PageData} */
  export let data;

 
  const subject = $page.params.subjects;
  const { course, courseContents, courseCompetencies } = data;
  // Course data
  $: console.log("course is ", data.course);
  $: courseId = $page.params.details;
  $: competencyDescription =
    data.courseCompetencies?.[0]?.competency?.description || "";
  // $: console.log("competencyDescription is ", competencyDescription);
  $: PorogrammeOvervie = data.courseCompetencies?.find(
    (comp) => comp.competency.shortname === "Learning Objective"
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
  {#if course}
        <div class="max-w-5xl mx-auto p-8 pt-12">
                  <div in:fade={{ duration: 1000 }}>

                           <div class="bg-white bg-opacity-90 rounded-tl-[60px] rounded-br-[60px] p-8 shadow-xl mb-12">

        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-4">
                                <span class="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">Free</span>
                                <span class="text-gray-600">Course</span>
                            </div>
          <h1 class="text-4xl font-bold text-[#222222] mb-4">
            {course.fullname}:
              {@html cleanDescription(PorogrammeOvervie?.competency?.shortname)}
          </h1>

          {#if course.summary}
            <div class="text-lg text-gray-700 mb-4">
                 {@html cleanDescription(PorogrammeOvervie?.competency?.description)}
            </div>
          {/if}

          <div class="flex flex-wrap items-center gap-6 mb-8">
                                <div class="flex items-center">
                                    <span class="text-2xl font-bold text-blue-900 mr-2">4.3</span>
                                    <div class="flex text-red-400 text-xl">{"★".repeat(4)}{"☆"}</div>
                                    <span class="ml-2 text-sm text-gray-500">(3,400 ratings)</span>
                                </div>
                                <div class="flex items-center text-gray-700">
                                    <svg class="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span>93,012 learners enrolled</span>
                                </div>
                            </div>
         <div class="flex items-center space-x-4">
                                <a href={`/Courses/${subject}/content`} 
                                   class="bg-red-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2">
                                    <span>Start Learning</span>
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                            
        </div>
        
         </div>

      <Accreditation courseCompetencies={data.courseCompetencies} />
      <Duration courseCompetencies={data.courseCompetencies} />
      <TargetAudience courseCompetencies={data.courseCompetencies} />
      <EntryRequirements courseCompetencies={data.courseCompetencies} />
      <CourseAndModules courseCompetencies={data.courseCompetencies} />
      <Module1 courseCompetencies={data.courseCompetencies} />
      <Module2 courseCompetencies={data.courseCompetencies} />
      <Module3 courseCompetencies={data.courseCompetencies} />
      <Module4 courseCompetencies={data.courseCompetencies} />
      <Module5 courseCompetencies={data.courseCompetencies} />
      <Module6 courseCompetencies={data.courseCompetencies} />
      <Module7 courseCompetencies={data.courseCompetencies} />
      <Module8 courseCompetencies={data.courseCompetencies} />
      <TrainingMethodology courseCompetencies={data.courseCompetencies} />
      <CareerOpportunities courseCompetencies={data.courseCompetencies} />
      <!-- <RecommendedCoursesFee courseCompetencies={data.courseCompetencies} /> -->
      <div class="max-w-4xl mx-auto py-10">
        </div>
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
    </style>
