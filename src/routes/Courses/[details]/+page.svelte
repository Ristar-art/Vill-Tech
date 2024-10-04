<script>
import { page } from "$app/stores";
    const subject = $page.params.subjects;
  let sections = {
    section1: false,
    section2: false,
    section3: false
  };

  function toggleSection(sectionId) {
    sections[sectionId] = !sections[sectionId];
  }
</script>

<body class=" font-sans">

    <!-- Container -->
    <div class="max-w-5xl mx-auto p-8">

        <!-- Header Section -->
        <div class="bg-[#fae7d5] p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:space-x-8">
            <!-- Left Content -->
            <div class="flex-1">
                <div class="mb-2">
                    <span class="bg-black text-white text-sm font-semibold px-3 py-1 rounded-full">Free</span>
                    <span class="ml-2 text-sm text-gray-600">Course</span>
                </div>
                <h1 class="text-4xl font-bold text-[#222222] mb-4">Learn How to Use ChatGPT</h1>
                <p class="text-lg text-gray-700 mb-4">Ready to dive into the world of Generative AI? Learn how ChatGPT works, how to use ChatGPT in your everyday life, and how to write effective ChatGPT prompts.</p>
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
                    <a href={`/Courses/${subject}/content`} class="bg-[#4b24ec] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#3a1ebd] transition">Start</a>
                    <div class="flex items-center ml-4 text-gray-700">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/people-fill.svg" alt="learners" class="w-6 h-6">
                        <span class="ml-2">93,012 learners enrolled</span>
                    </div>
                </div>
            </div>

            <!-- Right Content: Course Features -->
            <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
            </div>
        </div>

        <!-- About This Course and Skills Section -->
        <div class="bg-[#fae7d5] p-6 rounded-lg shadow-lg mt-8 md:flex md:space-x-16">
            <!-- About This Course -->
            <div class="md:w-1/2">
                <h2 class="text-2xl font-bold text-[#222222] mb-4">About this course</h2>
                <p class="text-gray-700 text-lg mb-4">
                    Artificial Intelligence is a fast-evolving field of technology that lets computers simulate human functions, such as learning and problem-solving. A subset of AI that’s been gaining traction recently is generative AI, which specializes in creating new content, be it text, images, audio, or videos. Take this course to learn about the different types of generative AI using interactive applets!
                </p>
            </div>
            <!-- Skills You'll Gain -->
            <div class="md:w-1/2">
                <h2 class="text-2xl font-bold text-[#222222] mb-4">Skills you'll gain</h2>
                <ul class="space-y-3 text-gray-700">
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/check-circle-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-[#222222]">
                        Understand what generative AI is
                    </li>
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/check-circle-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-[#222222]">
                        See the different types of generative AI
                    </li>
                    <li class="flex items-center">
                        <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/check-circle-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-[#222222]">
                        Study the ethics of using generative AI
                    </li>
                </ul>
            </div>
        </div>

       <div class="max-w-4xl mx-auto py-10">
    <!-- Syllabus Header -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 class="text-2xl font-bold">Syllabus</h2>
      <p class="text-sm text-gray-600">6 lessons · 2 projects · 5 quizzes</p>
      <!-- <a href="#" class="text-indigo-600 text-sm font-medium float-right">Expand all sections</a> -->
    </div>

    <!-- Accordion Section 1 -->
    <div class="bg-white shadow-md rounded-lg mb-4">
      <button on:click={() => toggleSection('section1')} class="w-full flex justify-between items-center p-4">
        <div class="flex items-center space-x-4">
          <span class="bg-indigo-900 text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">1</span>
          <h3 class="font-semibold text-lg">Introduction to ChatGPT</h3>
        </div>
        <span class="text-lg">{sections.section1 ? '⌃' : '⌄'}</span>
      </button>
      {#if sections.section1}
        <div class="px-6 pb-4">
          <p class="text-sm mb-4">
            Learn what ChatGPT is, how it was created and trained, and its potential applications across various industries.
          </p>
          <ul>
            <li class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/journal.svg" alt="Lesson" class="w-5 h-5">
                <span>Lesson</span>
              </div>
              <span>Introduction to ChatGPT</span>
            </li>
            <li class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/lock-fill.svg" alt="Quiz" class="w-5 h-5">
                <span>Quiz</span>
              </div>
              <span>Introduction to ChatGPT: Quiz</span>
            </li>
          </ul>
        </div>
      {/if}
    </div>

    <!-- Accordion Section 2 -->
    <div class="bg-white shadow-md rounded-lg mb-4">
      <button on:click={() => toggleSection('section2')} class="w-full flex justify-between items-center p-4">
        <div class="flex items-center space-x-4">
          <span class="bg-indigo-900 text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">2</span>
          <h3 class="font-semibold text-lg">How ChatGPT Works</h3>
        </div>
        <span class="text-lg">{sections.section2 ? '⌃' : '⌄'}</span>
      </button>
      {#if sections.section2}
        <div class="px-6 pb-4">
          <p class="text-sm mb-4">
            Learn about generative AI, the process behind things like ChatGPT, LaMDA, and more!
          </p>
          <ul>
            <li class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/journal.svg" alt="Lesson" class="w-5 h-5">
                <span>Lesson</span>
              </div>
              <span>Generative AI Concepts</span>
            </li>
            <li class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/lock-fill.svg" alt="Quiz" class="w-5 h-5">
                <span>Quiz</span>
              </div>
              <span>Generative AI: Quiz</span>
            </li>
          </ul>
        </div>
      {/if}
    </div>

    <!-- Accordion Section 3 -->
    <div class="bg-white shadow-md rounded-lg mb-4">
      <button on:click={() => toggleSection('section3')} class="w-full flex justify-between items-center p-4">
        <div class="flex items-center space-x-4">
          <span class="bg-indigo-900 text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">3</span>
          <h3 class="font-semibold text-lg">Using ChatGPT</h3>
        </div>
        <span class="text-lg">{sections.section3 ? '⌃' : '⌄'}</span>
      </button>
      {#if sections.section3}
        <div class="px-6 pb-4">
          <p class="text-sm mb-4">
            Learn how ChatGPT can be used in everyday life and in business.
          </p>
          <ul>
            <li class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/journal.svg" alt="Lesson" class="w-5 h-5">
                <span>Lesson</span>
              </div>
              <span>Practical Applications of ChatGPT</span>
            </li>
            <li class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/lock-fill.svg" alt="Quiz" class="w-5 h-5">
                <span>Quiz</span>
              </div>
              <span>ChatGPT Use Cases Quiz</span>
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </div>

    </div>

</body>