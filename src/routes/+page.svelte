<script>
  import Counter from "./Counter.svelte";
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import Carousel from "svelte-carousel";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  // import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { MessageCircle } from 'lucide-svelte';
  

  // const id = $page.params.subjects;
  let carousel;
  let browser = false;

  const particlesToShow = writable(1);

  function updateParticlesToShow() {
    const width = window.innerWidth;
    if (width < 640) {
      particlesToShow.set(1);
    } else if (width < 1024) {
      particlesToShow.set(2);
    } else {
      particlesToShow.set(4);
    }
  }

  onMount(() => {
    browser = true;
    updateParticlesToShow();

    // Add event listener for window resize
    window.addEventListener("resize", updateParticlesToShow);

    // Clean up the event listener on component destruction
    return () => {
      window.removeEventListener("resize", updateParticlesToShow);
    };
  });
  
  let courses = [
    { id: 1, fullname: 'Course 1', summary: 'This is the first course' },
    { id: 2, fullname: 'Course 2', summary: 'This is the second course' },
    { id: 3, fullname: 'Course 3', summary: 'This is the third course' },
    { id: 4, fullname: 'Course 4', summary: 'This is the fourth course' },
    { id: 5, fullname: 'Course 5', summary: 'This is the fifth course' }
  ]; // Replace with your actual course data
  let error = null;

  let scrollContainer;

  // Continuous scrolling function
  const autoScroll = () => {
    if (scrollContainer) {
      scrollContainer.scrollLeft += 1; // Slow down the scroll speed by setting it to a smaller value

      // Loop back to the start if it reaches the end (infinite scrolling)
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft = 0;
      }
    }
  };

  // Start auto scroll on mount
  onMount(() => {
    const scrollInterval = setInterval(autoScroll, 30); // Slower scrolling by increasing the interval (e.g., 30ms)

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  });
  
  function navigateToChat() {
    goto('/chat');
  }

  let mounted = false;

// Create tweened stores for x and y position
const x = tweened(0, { duration: 5000, easing: cubicInOut });
const y = tweened(0, { duration: 5000, easing: cubicInOut });

// Function to update position
function updatePosition() {
  x.set(Math.random() * 100 - 50);
  y.set(Math.random() * 100 - 50);
  setTimeout(updatePosition, 5000);
}

onMount(() => {
  mounted = true;
  updatePosition();
});
  const topics = [
    {
      id: 1,
      name: "Artificial intelligence",
      icon: "https://cdn-icons-png.flaticon.com/512/865/865974.png",
    },
    {
      id: 2,
      name: "Leadership",
      icon: "https://cdn-icons-png.flaticon.com/512/3037/3037189.png",
    },
    {
      id: 3,
      name: "Supply chain",
      icon: "https://cdn-icons-png.flaticon.com/512/3659/3659670.png",
    },
    {
      id: 4,
      name: "Computer programming",
      icon: "https://cdn-icons-png.flaticon.com/512/2829/2829826.png",
    },
    {
      id: 5,
      name: "Probability",
      icon: "https://cdn-icons-png.flaticon.com/512/2627/2627150.png",
    },
    {
      id: 6,
      name: "Python",
      icon: "https://cdn-icons-png.flaticon.com/512/3079/3079028.png",
    },
    {
      id: 7,
      name: "Machine learning",
      icon: "https://cdn-icons-png.flaticon.com/512/897/897200.png",
    },
    {
      id: 8,
      name: "Computer science",
      icon: "https://cdn-icons-png.flaticon.com/512/3050/3050148.png",
    },
    {
      id: 9,
      name: "Writing",
      icon: "https://cdn-icons-png.flaticon.com/512/1742/1742585.png",
    },
    {
      id: 10,
      name: "Statistics",
      icon: "https://cdn-icons-png.flaticon.com/512/1046/1046690.png",
    },
  ];

  const categories = [
    "Executive Education",
    "Master's Degrees",
    "Bachelor's Degrees",
    "Certificates",
  ];
  const filters = [
    "Popular",
    "AI & Digital Transformation",
    "Sustainability",
    "Leadership & Interpersonal Skills",
    "Business Management & Strategy",
    "Data Science & Analysis",
    "Education",
    "Finance, Investing",
  ];
  // const courses = [
  //   {
  //     title: "Artificial Intelligence: Implications for Business Strategy",
  //     school: "MIT Sloan School of Management",
  //     image: "https://picsum.photos/200/150?random=1",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2048px-MIT_logo.svg.png",
  //     category: "Executive Education",
  //   },
  //   {
  //     title: "MBA Essentials",
  //     school: "LSE",
  //     image: "https://picsum.photos/200/150?random=2",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/London_School_of_Economics_COA.svg/800px-London_School_of_Economics_COA.svg.png",
  //     category: "Executive Education",
  //   },
  //   {
  //     title: "Oxford Executive Leadership Programme",
  //     school: "Oxford Saïd",
  //     image: "https://picsum.photos/200/150?random=3",
  //     logo: "https://upload.wikimedia.org/wikipedia/en/e/ec/Oxford_University.png",
  //     category: "Executive Education",
  //   },
  //   {
  //     title: "Deepak Chopra: Soul of Leadership and Wellbeing",
  //     school: "ChopraX",
  //     image: "https://picsum.photos/200/150?random=4",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Deepak_Chopra.jpg/800px-Deepak_Chopra.jpg",
  //     category: "Executive Education",
  //   },
  // ];
   export let data;

    $: ({ courses, totalCourses, limit, page, error,totalPages } = data);
     $: console.log(courses);
  
  const images = [
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.png", alt: "Image 2" },
    { src: "image3.png", alt: "Image 3" },
    { src: "image4.PNG", alt: "Image 4" },
    { src: "image5.PNG", alt: "Image 5" },
  
   
  ];
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div >
  <section
   
  >
    <!-- Hero Section -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-1">
		
     
	  <div class="min-h-screen text-white flex flex-col  bg-cover bg-center pt-14">
	
      
        <!-- Navbar -->
        <!-- <div class="flex justify-between items-center p-6">
          <div class="space-x-2">
            <img
              src=""
              alt="menu"
              class="w-6 h-6"
            />
          </div>
        </div> -->

        <!-- Hero Section -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 p-8">
          <!-- Left Section -->
          <div class="flex flex-col justify-center space-y-4">
            <h1 class="text-6xl font-bold">Unlock Your <br/>Tech Potential</h1>
            <p class="text-lg text-gray-300">
              Enroll in our online tech courses and gain the skills<br/> to thrive in
              the digital age. Taught by industry <br/> experts, our programs are
              designed to help you succeed..
            </p>
            <Button on:click ={()=> goto("/Enroll")} class="bg-[#ec1d25] flex justify-start w-16 text-center">Enroll</Button>
          </div>
        
          <!-- Right Section -->
          {#if mounted}
          <div class="w-full h-full flex items-center justify-center overflow-hidden" in:fade>
            <div 
              class="w-[400px] h-[400px] perspective-[1000px] relative preserve-3d transition-transform duration-5000"
              style="transform: translate({$x}px, {$y}px);"
            >
              <div class="w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <svg viewBox="0 0 200 200" class="w-full h-full">
                  <pattern id="earthTexture" patternUnits="userSpaceOnUse" width="200" height="200">
                    <image href="/file.png" width="200" height="200" />
                  </pattern>
                  <defs>
                   
                    <radialGradient id="sphereShading">
                      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                      <stop offset="80%" stop-color="rgba(0,0,0,0.3)" />
                      <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
                    </radialGradient>
                  </defs>
                  
                  <!-- Earth texture -->
                  <circle cx="100" cy="100" r="100" fill="url(#earthTexture)"/>
                  
                  <!-- Shading overlay -->
                  <circle cx="100" cy="100" r="100" fill="url(#sphereShading)"/>
                </svg>
              </div>
              
              <!-- Rotating rings -->
              <div class="w-[400px] h-[400px] border-6 border-[#FFFFFF30] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d shadow-[0_0_15px_#00E5FF30] animate-[spin_15s_linear_infinite]"></div>
              
              <div class="w-[300px] h-[300px] border-3 border-[#21409a30] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d shadow-[0_0_15px_#FFFFFF30] animate-[spin_10s_linear_infinite] [transform:rotateX(91deg)_rotateY(128deg)_rotateZ(345deg)]"></div>
              <div class="w-[300px] h-[300px] border-3 border-[#FFFFFF30] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d shadow-[0_0_15px_#00E5FF30] animate-[spin_10s_linear_infinite_reverse] [transform:rotateX(264deg)_rotateY(321deg)_rotateZ(27deg)]"></div>
              <div class="w-[300px] h-[300px] border-3 border-[#00E5FF30] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d shadow-[0_0_15px_#FFFFFF30] animate-[spin_10s_linear_infinite] [transform:rotateX(120deg)_rotateY(268deg)_rotateZ(215deg)]"></div>
            </div>
          </div>
          {/if}
        </div>

        <!-- Footer Links -->
        <!-- <div class="flex justify-center space-x-10 p-6 text-gray-300">
          <a href="#" class="hover:text-white">01 Sign up</a>
          <a href="#" class="hover:text-white">02 Transfer Details</a>
          <a href="#" class="hover:text-white">03 Transaction</a>
          <a href="#" class="hover:text-white">04 Track your Money</a>
        </div> -->
		<div class="max-w-2xl mx-auto text-center space-y-4 px-1 md:px-0">
		
			<!-- <p class="text-sm md:text-base lg:text-xl text-muted-foreground text-black">
			Check out some of the top businesses in our directory.
		  </p> -->
		  </div>
		  {#if browser}
			<div class=" max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
			  <Carousel
				bind:this={carousel}
				autoplayDuration={0}
				duration={5000}
				autoplay
				timingFunction="linear"
				dots={false}
				arrows={false}
				swiping={false}
				particlesToShow={$particlesToShow}
			  >
				{#each images as image}
				  <div
					class=" rounded-lg overflow-hidden transition-all hover:scale-105 p-4"
				  >
					<img
					  src={image.src}
					  alt={image.alt}
					  class="rounded-box w-12 h-12 md:w-24 md:h-12 lg:w-24 lg:h-12 object-contain mx-auto hover:scale-110 transition-transform"
					/>
				  </div>
				{/each}
			  </Carousel>
			</div>
		  {/if}
      </div>
    </div>
  </section>
  <div 
  class="fixed bottom-4 right-4 p-4 bg-[#ec1d25] rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors"
  on:click={navigateToChat}
>
  <MessageCircle size={24} color="white" />
</div>>
  <section class=" py-8 md:py-12">
    <div class="max-w-2xl mx-auto text-center space-y-4 px-4 md:px-0">
      
    </div>
     </section>
     <div class="max-w-7xl mx-auto p-8">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-4 text-white">Featured Courses</h2>
        <Button on:click={() => goto("/Courses")} class="mb-4 bg-[#21409a]">
          View All Courses
        </Button>
      </div>
    
      <!-- Category Tabs -->
      <div class="flex space-x-6 mb-6 border-b">
        {#each categories as category, i}
          <button
            class="py-2 px-4 text-lg font-medium text-gray-600 hover:text-gray-900 focus:text-gray-900 transition-colors border-b-2 {i ===
            0
              ? 'border-green-700 text-green-700'
              : 'border-transparent'}"
          >
            {category}
          </button>
        {/each}
      </div>
    
      <!-- Courses Carousel -->
      {#if error}
        <p class="text-red-500">{error}</p>
      {:else}
        <div class="flex space-x-6 overflow-x-auto pb-6 mt-6" bind:this={scrollContainer}>
          {#each courses as course}
            <div class="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="relative border border-gray-300 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/200/150?random={course.id}"
                  alt={course.fullname}
                  class="w-full h-48 object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 mb-3">{course.fullname}</h3>
                <p class="text-gray-600 text-sm mb-4 truncate">
                  {@html course.summary || "No description available."}
                </p>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  
  <div class="max-w-7xl mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-6 text-white">Explore Top Subjects</h2>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
      {#each topics as topic}
        <div
          class="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition-shadow duration-200"
        >
          <a href={`/${topic.name}`}>
            <img src={topic.icon} alt={topic.name} class="h-16 w-16 mb-4" />
            <span class="text-lg font-medium text-gray-800">{topic.name}</span>
          </a>
        </div>
      {/each}
    </div>
  </div>

  <div class="max-w-7xl mx-auto p-8">
    <h2 class="text-3xl font-bold mb-4 text-white">Newly added Courses</h2>
  
    {#if error}
      <p class="text-red-500">{error}</p>
    {:else}
      <div class="flex space-x-6 overflow-x-auto pb-6 mt-6" bind:this={scrollContainer}>
        {#each courses as course}
          <div class="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="relative border border-gray-300 rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/200/150?random={course.id}"
                alt={course.fullname}
                class="w-full h-48 object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold text-gray-800 mb-3">{course.fullname}</h3>
              <p class="text-gray-600 text-sm mb-4 truncate">
                {@html course.summary || "No description available."}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div
    class="container flex flex-wrap justify-around w-full mt-8 p-6  rounded-2xl shadow-lg"
  >
    <div class="text-center text-black w-1/2 sm:w-1/4 mb-4 sm:mb-0">
      <h2 class="text-2xl font-bold">55</h2>
      <p class="text-white">Students</p>
    </div>
    <div class="text-center text-black w-1/2 sm:w-1/4 mb-4 sm:mb-0">
      <h2 class="text-2xl font-bold">72</h2>
      <p class="text-white">Lecturers</p>
    </div>
    <div class="text-center text-black w-1/2 sm:w-1/4">
      <h2 class="text-2xl font-bold">115</h2>
      <p class="text-white">Courses</p>
    </div>
    <div class="text-center text-black w-1/2 sm:w-1/4">
      <h2 class="text-2xl font-bold">20</h2>
      <p class="text-white">Certifications</p>
    </div>
  </div>
  <!-- <section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div class="container px-4 md:px-6">
      <div
        class="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div class="space-y-2">
          <div
            class="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary-foreground"
          >
            Course Curriculum
          </div>
          <h2
            class="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl"
          >
            Comprehensive Curriculum for Tech Success
          </h2>
          <p
            class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Our online tech courses cover a wide range of topics, from
            programming fundamentals to cutting-edge technologies. Dive deep and
            gain the skills to excel in the tech industry.
          </p>
        </div>
      </div>
      <div
        class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
      >
        <img
          src="/favicon.png"
          width="550"
          height="310"
          alt="Course Curriculum"
          class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
        <div class="flex flex-col justify-center space-y-4">
          <ul class="grid gap-6">
            <li>
              <div class="grid gap-1">
                <h3 class="text-xl font-bold text-foreground">
                  Programming Fundamentals
                </h3>
                <p class="text-muted-foreground">
                  Master the core concepts of programming, including variables,
                  data types, control structures, and algorithms.
                </p>
              </div>
            </li>
            <li>
              <div class="grid gap-1">
                <h3 class="text-xl font-bold text-foreground">
                  Web Development
                </h3>
                <p class="text-muted-foreground">
                  Learn to build responsive and interactive websites using HTML,
                  CSS, and JavaScript.
                </p>
              </div>
            </li>
            <li>
              <div class="grid gap-1">
                <h3 class="text-xl font-bold text-foreground">
                  Mobile App Development
                </h3>
                <p class="text-muted-foreground">
                  Dive into the world of mobile app development, creating apps
                  for both iOS and Android platforms.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section> -->
  <!-- <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div
        class="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div class="space-y-2">
          <div
            class="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary-foreground"
          >
            Instructors
          </div>
          <h2
            class="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl"
          >
            Meet Our Experienced Instructors
          </h2>
          <p
            class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Our tech courses are taught by industry experts with years of
            experience. Learn from the best and unlock your full potential.
          </p>
        </div>
      </div>
      <div
        class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
      >
        <div class="flex flex-col justify-center space-y-4">
          <div class="grid gap-4">
            <div class="grid grid-cols-[80px_1fr] items-center gap-4">
              <Avatar.Root>
                <Avatar.Image src="/favicon.png" alt="Instructor 1" />
                <Avatar.Fallback>J</Avatar.Fallback>
              </Avatar.Root>
              <div>
                <h3 class="text-xl font-bold text-foreground">John Doe</h3>
                <p class="text-muted-foreground">Senior Software Engineer</p>
              </div>
            </div>
            <div class="grid grid-cols-[80px_1fr] items-center gap-4">
              <Avatar.Root>
                <Avatar.Image src="/favicon.png" alt="Instructor 2" />
                <Avatar.Fallback>J</Avatar.Fallback>
              </Avatar.Root>
              <div>
                <h3 class="text-xl font-bold text-foreground">Jane Smith</h3>
                <p class="text-muted-foreground">Lead Mobile Developer</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/favicon.png"
          width="550"
          height="310"
          alt="Instructors"
          class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
      </div>
    </div>
  </section> -->
  <!-- <section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div class="container px-4 md:px-6">
      <div
        class="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div class="space-y-2">
          <div
            class="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary-foreground"
          >
            Student Testimonials
          </div>
          <h2
            class="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl"
          >
            What Our Students Say
          </h2>
          <p
            class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Hear from our students about their experiences and how our tech
            courses have helped them achieve their goals.
          </p>
        </div>
      </div>
      <div
        class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
      >
        <div class="flex flex-col justify-center space-y-4">
          <div class="grid gap-4">
            <div class="grid grid-cols-[80px_1fr] items-center gap-4">
              <Avatar.Root>
                <Avatar.Image src="/favicon.png" alt="Student 1" />
                <Avatar.Fallback>J</Avatar.Fallback>
              </Avatar.Root>
              <div>
                <blockquote class="text-foreground">
                  "The tech courses at this platform have been a game\n changer
                  for me. The instructors are knowledgeable and\n the curriculum
                  is top-notch. Highly recommended!"
                </blockquote>
                <p class="text-muted-foreground">
                  - Sarah Johnson, Software Engineer
                </p>
              </div>
            </div>
            <div class="grid grid-cols-[80px_1fr] items-center gap-4">
              <Avatar.Root>
                <Avatar.Image src="/favicon.png" alt="Student 2" />
                <Avatar.Fallback>J</Avatar.Fallback>
              </Avatar.Root>
              <div>
                <blockquote class="text-foreground">
                  "I was able to transition into a tech career thanks to\n the
                  comprehensive training and support provided by this\n
                  platform. The courses are engaging and practical."
                </blockquote>
                <p class="text-muted-foreground">
                  - Michael Lee, Mobile Developer
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/favicon.png"
          width="550"
          height="310"
          alt="Student Testimonials"
          class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
      </div>
    </div>
  </section> -->
</div>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
  @keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
  @keyframes rotateBigRingClockwise {
    0% { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg); }
    100% { transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg); }
  }
  @keyframes rotateBigRingCounterClockwise {
    0% { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg); }
    100% { transform: translate(-50%, -50%) rotateX(-360deg) rotateY(-360deg); }
  }
  @keyframes rotateSmallRingClockwise {
    0% { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg); }
    100% { transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg); }
  }
  @keyframes rotateSmallRingCounterClockwise {
    0% { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg); }
    100% { transform: translate(-50%, -50%) rotateX(-360deg) rotateY(-360deg); }
  }

  :global(.preserve-3d) {
    transform-style: preserve-3d;
  }
</style>
