<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    //  import CourseBlocks from '$lib/components/CourseBlocks.svelte';
    //  import { getCourseBlocks } from '$lib/moodleApi';
    import CourseIncludes from '$lib/components/CourseIncludes.svelte';
    import Accreditation from '$lib/components/Accreditation.svelte';
    import Duration from '$lib/components/Duration.svelte';
// const { courseBlocks } = data;
       
  /** @type {import('./$types').PageData} */
    export let data;

    $: console.log(data);
    const subject = $page.params.subjects;
      const { course, courseContents, courseBlocks,courseCompetencies } = data;
    // Course data
    $: courseId = $page.params.details;
    // $: course = data.course;
    // $: courseContents = data.courseContents;
    $: competencyDescription = data.courseCompetencies?.[0]?.competency?.description || '';
    $: PorogrammeOvervie = data.courseCompetencies?.find(comp => comp.competency.shortname === 'Programme Overview')
    function cleanDescription(html) {
    if (!html) return '';
    return html
      .replace(/dir="ltr"/g, '')  // Remove dir="ltr" attributes
      .replace(/>\s+(?=\w)/g, '') // Remove remaining > followed by whitespace before words
      .replace(/<p><\/p>/g, '');  // Remove empty paragraphs
  }
  
    // Dynamically manage section toggle states
    let sections = {};
    $: courseContents.forEach(content => sections[content.id] = false);

    // Toggle function
    function toggleSection(sectionId) {
        sections[sectionId] = !sections[sectionId];
    }

    // Icon function
    function getModuleIcon(modname) {
        const icons = {
            resource: '📄',
            url: '🔗',
            forum: '💬',
            assign: '📝',
            quiz: '❓',
            default: '📚'
        };
        return icons[modname] || icons.default;
    }

    // Navigate to lesson details
    // function viewLessonDetails(lessonId) {
    //     goto(`/Courses/${subject}/${lessonId}`); // Navigate to lesson details page
    // }
</script>

<body class="font-sans pt-14 bg-[#21409A]">
   
    {#if course}
    <div class="max-w-5xl mx-auto p-8">
      
        <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:space-x-8">
           
            <div class="flex-1 ">
                <div class="mb-2">
                    <span class="bg-black text-white text-sm font-semibold px-3 py-1 rounded-full">Free</span>
                    <span class="ml-2 text-sm text-gray-600">Course</span>
                </div>
                <h1 class="text-4xl font-bold text-[#222222] mb-4">{course.fullname}</h1>

                {#if course.summary}
                <div class="text-lg text-gray-700 mb-4">
                    {@html course.summary}
                </div>
                {/if}

                <div class="flex items-center mb-4">
                    <span class="text-2xl font-bold text-[#222222] mr-2">4.3</span>
                    <div class="flex space-x-1">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/star-fill.svg" alt="star" class="w-5 h-5 text-yellow-400">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/star-fill.svg" alt="star" class="w-5 h-5 text-yellow-400">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/star-fill.svg" alt="star" class="w-5 h-5 text-yellow-400">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/star-fill.svg" alt="star" class="w-5 h-5 text-yellow-400">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/star-half.svg" alt="half star" class="w-5 h-5 text-yellow-400">
                    </div>
                    <span class="ml-2 text-sm text-gray-500">(3,400 ratings)</span>
                </div>
                <div class="flex items-center mb-6">
                    <a href={`/Courses/${courseId}/`} class="bg-[#4b24ec] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#3a1ebd] transition">Start</a>
                    <div class="flex items-center ml-4 text-gray-700">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/people-fill.svg" alt="learners" class="w-6 h-6">
                        <span class="ml-2">93,012 learners enrolled</span>
                    </div>
                </div>
            </div>
<!-- <CourseBlocks blocks={courseBlocks} /> -->
<CourseIncludes {competencyDescription} />
           
            <!-- <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 class="text-xl font-semibold text-[#222222] mb-4">This course includes</h3>
                <ul class="space-y-3 text-gray-700">
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-indigo-600">
                        AI assistance for guided coding help
                    </li>
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-indigo-600">
                        Projects to apply new skills
                    </li>
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-indigo-600">
                        Quizzes to test your knowledge
                    </li>
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-indigo-600">
                        A certificate of completion
                    </li>
                </ul>
            </div> -->
        </div>

           <Accreditation  courseCompetencies={data.courseCompetencies}  />
<Duration courseCompetencies={data.courseCompetencies} />
                  
        
        <div class="max-w-4xl mx-auto py-10">
           
          
            <div class="pt-12 bg-white bg-opacity-70 shadow-md rounded-lg p-6 mb-4">
                <h2 class="text-2xl font-bold">Syllabus</h2>
                <p class="text-sm text-gray-600">6 lessons · 2 projects · 5 quizzes</p>
            </div>

           
            
            {#each courseContents as content}
            <div class="bg-white bg-opacity-70 shadow-md rounded-lg mb-4">
                <button on:click={() => toggleSection(content.id)} class="w-full flex justify-between items-center p-4">
                    <div class="flex items-center space-x-4">
                        <span class="bg-indigo-900 text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">{content.id}</span>
                        <h3 class="font-semibold text-lg">{content.name}</h3>
                    </div>
                    <span class="text-lg">{sections[content.id] ? '⌃' : '⌄'}</span>
                </button>
                {#if sections[content.id]}
                <div class="px-6 pb-4">
                    <p class="text-sm mb-4">
                        {@html content.summary || "No summary available for this lesson."}
                    </p>
                    <ul>
                        <li class="flex justify-between items-center py-2">
                            <div class="flex items-center space-x-2">
                                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/journal.svg" alt="Lesson" class="w-5 h-5">
                                <span >Lesson</span>
                            </div>
                            <span >
                             
                             <a><a href={`/Courses`}> {content.name}</a></span>
                        </li>
                    </ul>
                </div>
                {/if}
            </div>
            {/each}
        </div>
    </div>
    {:else}
    <p class="error">Course not found</p>
    {/if}
</body>




<!-- <div class="course-details">
    {#if course}
        <h1>{course.fullname}</h1>
        
        {#if course.summary}
            <div class="course-summary">
                {@html course.summary}
            </div>
        {/if}

        {#if courseContents && courseContents.length > 0}
            {#each courseContents as section}
                <section>
                    <h2>{section.name || 'Untitled Section'}</h2>
                    {#if section.summary}
                        <div class="section-summary">
                            {@html section.summary}
                        </div>
                    {/if}
                    
                    {#if section.modules && section.modules.length > 0}
                        <ul class="module-list">
                            {#each section.modules as module}
                                <li class="module-item">
                                    <span class="module-icon">{getModuleIcon(module.modname)}</span>
                                    <div class="module-content">
                                        {#if module.url}
                                            <a href={module.url} target="_blank" rel="noopener noreferrer">
                                                {module.name}
                                            </a>
                                        {:else}
                                            <span>{module.name}</span>
                                        {/if}
                                        
                                        {#if module.description}
                                            <div class="module-description">
                                                {@html module.description}
                                            </div>
                                        {/if}
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="no-content">No content in this section.</p>
                    {/if}
                </section>
            {/each}
        {:else}
            <p class="no-content">No content available for this course.</p>
        {/if}
    {:else}
        <p class="error">Course not found</p>
    {/if}
</div> -->
