<script>
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { spring } from 'svelte/motion';
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    
    export let data;
    let visible = false;
    
    $: console.log(data);
    const subject = $page.params.subjects;
    $: courseId = $page.params.details;
    $: course = data.course;
    $: courseContents = data.courseContents;
    
    // Dynamically manage section toggle states
    let sections = {};
    $: courseContents.forEach(content => sections[content.id] = false);
    
    // Toggle function with animation
    function toggleSection(sectionId) {
        sections[sectionId] = !sections[sectionId];
    }
    
    onMount(() => {
        visible = true;
    });
    
    // Icon function with SVG icons instead of emoji
    function getModuleIcon(modname) {
        const icons = {
            resource: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>`,
            url: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>`,
            forum: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>`,
            assign: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>`,
            quiz: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`,
            default: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>`
        };
        return icons[modname] || icons.default;
    }
    </script>
    
    <div class="min-h-screen bg-[#21409a]">
        {#if visible && course}
        <div class="max-w-5xl mx-auto p-8 pt-12">
            <div in:fade={{ duration: 1000 }}>
                <!-- Course Header Section -->
                <div class="bg-white bg-opacity-90 rounded-tl-[60px] rounded-br-[60px] p-8 shadow-xl mb-12">
                    <div class="flex flex-col md:flex-row md:space-x-8">
                        <div class="flex-1" in:fly={{ y: 50, duration: 800 }}>
                            <div class="flex items-center space-x-3 mb-4">
                                <span class="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">Free</span>
                                <span class="text-gray-600">Course</span>
                            </div>
                            
                            <h1 class="text-4xl font-bold text-blue-900 mb-6">{course.fullname}</h1>
                            
                            {#if course.summary}
                            <div class="text-lg text-gray-700 mb-6 leading-relaxed">
                                {@html course.summary}
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
    
                        <div class="md:w-80 mt-8 md:mt-0" in:fly={{ y: 50, duration: 800, delay: 200 }}>
                            <div class="bg-blue-50 p-6 rounded-tl-[30px] rounded-br-[30px] shadow-lg border border-blue-100">
                                <h3 class="text-xl font-semibold text-blue-900 mb-4">Course Features</h3>
                                <ul class="space-y-4">
                                    {#each ['AI-powered guidance', 'Hands-on projects', 'Interactive quizzes', 'Completion certificate'] as feature}
                                    <li class="flex items-center text-gray-700">
                                        <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {feature}
                                    </li>
                                    {/each}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- Syllabus Section -->
                <div class="mt-12">
                    <div class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8" 
                         in:fly={{ y: 50, duration: 800, delay: 400 }}>
                        <h2 class="text-3xl font-bold text-blue-900 mb-2">Course Syllabus</h2>
                        <p class="text-gray-600">6 lessons · 2 projects · 5 quizzes</p>
                    </div>
    
                    <div class="space-y-4">
                        {#each courseContents as content, i}
                        <div 
                            in:fly={{ y: 50, duration: 800, delay: (i + 3) * 200 }}
                            class="bg-white bg-opacity-90 rounded-tl-[30px] rounded-br-[30px] shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                        >
                            <button 
                                on:click={() => toggleSection(content.id)}
                                class="w-full flex justify-between items-center p-6 hover:bg-blue-50 transition-all duration-300"
                            >
                                <div class="flex items-center space-x-4">
                                    <span class="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
                                        {content.id}
                                    </span>
                                    <h3 class="font-semibold text-lg text-blue-900">{content.name}</h3>
                                </div>
                                <svg 
                                    class="w-6 h-6 text-red-400 transform transition-transform duration-300"
                                    style="transform: rotate({sections[content.id] ? '180deg' : '0deg'})"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {#if sections[content.id]}
                            <div 
                                in:fly={{ y: -20, duration: 300 }}
                                class="px-6 pb-6 border-t border-gray-100"
                            >
                                <p class="text-gray-600 mb-4">
                                    {@html content.summary || "No summary available for this lesson."}
                                </p>
                                <a 
                                    href={`/Courses/${subject}/${content.id}`}
                                    class="inline-flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium group"
                                >
                                    <span>View Lesson</span>
                                    <svg 
                                        class="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                            {/if}
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        {:else}
        <div class="flex items-center justify-center min-h-screen">
            <p class="text-white text-xl">Course not found</p>
        </div>
        {/if}
    </div>
    
    <style>
        :global(html) {
            scroll-behavior: smooth;
        }
    </style>