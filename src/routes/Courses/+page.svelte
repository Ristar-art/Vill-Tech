<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  
  export let data;
  
  $: console.log(data);
  const subject = $page.params.subjects;
  $: courseId = $page.params.details;
  $: course = data.course;
  $: courseContents = data.courseContents;
  
  let visible = false;
  let activeSection = null;
  
  // Dynamically manage section toggle states
  let sections = {};
  $: courseContents.forEach(content => sections[content.id] = false);
  
  function toggleSection(sectionId) {
      sections[sectionId] = !sections[sectionId];
      activeSection = sections[sectionId] ? sectionId : null;
  }
  
  onMount(() => {
      visible = true;
  });
  
  // Course features data
  const features = [
      {
          title: "AI Assistance",
          description: "Get guided coding help from our AI tutors",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>`
      },
      {
          title: "Hands-on Projects",
          description: "Apply your skills with real-world projects",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>`
      },
      {
          title: "Interactive Quizzes",
          description: "Test your knowledge with engaging quizzes",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>`
      },
      {
          title: "Certificate",
          description: "Earn a certificate upon completion",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>`
      }
  ];
  </script>
  
  <div class="min-h-screen py-16 px-4 md:px-16 bg-[#21409A]">
      {#if visible && course}
          <div in:fade={{ duration: 1000 }}>
              <div class="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-tl-[60px] rounded-br-[60px] shadow-xl p-8 mb-12">
                  <div class="flex flex-col md:flex-row gap-8">
                      <div class="flex-1">
                          <div in:fly={{ y: 50, duration: 800 }}>
                              <span class="inline-block bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Free Course</span>
                              <h1 class="text-4xl font-bold text-blue-900 mb-4">{course.fullname}</h1>
                              
                              {#if course.summary}
                                  <div class="text-lg text-gray-700 mb-6">
                                      {@html course.summary}
                                  </div>
                              {/if}
  
                              <div class="flex items-center mb-6">
                                  <span class="text-2xl font-bold text-blue-900 mr-2">4.3</span>
                                  <div class="flex space-x-1 text-red-400">
                                      {"★".repeat(4)}{"☆"}
                                  </div>
                                  <span class="ml-2 text-sm text-gray-500">(3,400 ratings)</span>
                              </div>
  
                              <a href={`/Courses/${subject}/content`} 
                                 class="inline-block bg-red-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                  Start Learning
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
  
              <!-- Course Features -->
              <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {#each features as feature, i}
                      <div 
                          in:fly={{ y: 50, duration: 800, delay: i * 200 }}
                          class="group bg-white bg-opacity-90 rounded-tl-[30px] rounded-br-[30px] p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                          <div class="mb-4">
                              {@html feature.icon}
                          </div>
                          <h3 class="text-lg font-semibold text-blue-900 mb-2">{feature.title}</h3>
                          <p class="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                  {/each}
              </div>
  
              <!-- Course Content -->
              <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold text-white text-center mb-8">Course Content</h2>
                  
                  {#each courseContents as content, i}
                      <div 
                          in:fly={{ y: 50, duration: 800, delay: (i + 8) * 200 }}
                          class="bg-white bg-opacity-90 rounded-tl-[30px] rounded-br-[30px] mb-4 overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl"
                      >
                          <button 
                              on:click={() => toggleSection(content.id)}
                              class="w-full flex justify-between items-center p-6 hover:bg-blue-50 transition-colors duration-300"
                          >
                              <div class="flex items-center space-x-4">
                                  <span class="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full">{content.id}</span>
                                  <h3 class="font-semibold text-lg text-blue-900">{content.name}</h3>
                              </div>
                              <span class="text-red-500 transform transition-transform duration-300" style="transform: rotate({sections[content.id] ? '180deg' : '0deg'})">▼</span>
                          </button>
                          
                          {#if sections[content.id]}
                              <div 
                                  in:fly={{ y: -20, duration: 300 }}
                                  class="px-6 pb-6"
                              >
                                  <p class="text-gray-600 mb-4">
                                      {@html content.summary || "No summary available for this lesson."}
                                  </p>
                                  <a 
                                      href={`/Courses/${subject}/${content.id}`}
                                      class="inline-flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium"
                                  >
                                      <span>Start Lesson</span>
                                      <span>→</span>
                                  </a>
                              </div>
                          {/if}
                      </div>
                  {/each}
              </div>
          </div>
      {:else}
          <p class="text-white text-center">Course not found</p>
      {/if}
  </div>
  
  <style>
      :global(html) {
          scroll-behavior: smooth;
      }
  </style>