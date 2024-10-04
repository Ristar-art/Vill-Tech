<script>
    // Data for the course
    let course = {
        title: "Introduction to ChatGPT",
        description: "Learn what ChatGPT is, how it was created and trained, and its potential applications across various industries.",
        lessons: [
            {
                number: 1,
                title: "What is ChatGPT?",
                type: "Lesson",
                description: "Learn the basics of ChatGPT and generative AI.",
                isLocked: false,
                isCompleted: true // Example completion status
            },
            {
                number: 2,
                title: "Applications of ChatGPT",
                type: "Lesson",
                description: "Explore various applications of ChatGPT in real-world scenarios.",
                isLocked: false,
                isCompleted: false // Example completion status
            },
            {
                number: 3,
                title: "ChatGPT Quiz",
                type: "Quiz",
                description: "Test your knowledge on ChatGPT and its capabilities.",
                isLocked: true,
                isCompleted: false // Example completion status
            }
        ]
    };

    // Reactive statement to calculate progress
    $: progress = (course.lessons.filter(lesson => lesson.isCompleted).length / course.lessons.length) * 100;
</script>

<style>
    .progress-container {
        width: 100%;
        background-color: #e0e0e0;
        border-radius: 5px;
        margin-top: 20px;
    }
    
    .progress-bar {
        height: 30px;
        background-color: #4caf50;
        text-align: center;
        line-height: 30px;
        color: white;
        border-radius: 5px;
        transition: width 0.3s ease; /* Smooth transition */
    }
</style>

<main class="container mx-auto px-6 py-8 mt-10">
    <section class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <p class="text-gray-700 text-lg">{course.description}</p>
    </section>

    <!-- Progress Bar Section -->
    <div class="progress-container">
        <div class="progress-bar" style="width: {progress}%;">{Math.round(progress)}% Completed</div>
    </div>

    <!-- Syllabus Section -->
    <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Syllabus</h2>
        <ul class="space-y-4">
            {#each course.lessons as lesson}
                <li class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900">{lesson.number}. {lesson.title}</h3>
                            <p class="text-gray-600">{lesson.description}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            {#if lesson.type === 'Lesson'}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a8 8 0 11-7.894 6.577 1 1 0 01-.37-.37A8 8 0 0110 2zm3.707 9.707a1 1 0 00-1.414 0L9 14.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" />
                                </svg>
                                <span class="text-indigo-600 font-semibold">{lesson.type}</span>
                            {/if}
                            {#if lesson.type === 'Quiz'}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path d="M4 6h16M4 12h16m-7 6h7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                </svg>
                                <span class="text-red-500 font-semibold">{lesson.type}</span>
                            {/if}
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </section>
</main>