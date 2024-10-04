<script>
	import Counter from "./Counter.svelte";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import Carousel from 'svelte-carousel'
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
    import { page } from "$app/stores";
	import { goto } from "$app/navigation";


	const id = $page.params.subjects;
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
	const topics = [
		{
			id:1,
			name: "Artificial intelligence",
			icon: "https://cdn-icons-png.flaticon.com/512/865/865974.png",
		},
		{   id:2,
			name: "Leadership",
			icon: "https://cdn-icons-png.flaticon.com/512/3037/3037189.png",
		},
		{   id:3,
			name: "Supply chain",
			icon: "https://cdn-icons-png.flaticon.com/512/3659/3659670.png",
		},
		{   id:4,
			name: "Computer programming",
			icon: "https://cdn-icons-png.flaticon.com/512/2829/2829826.png",
		},
		{   id:5,
			name: "Probability",
			icon: "https://cdn-icons-png.flaticon.com/512/2627/2627150.png",
		},
		{   id:6,
			name: "Python",
			icon: "https://cdn-icons-png.flaticon.com/512/3079/3079028.png",
		},
		{   id:7,
			name: "Machine learning",
			icon: "https://cdn-icons-png.flaticon.com/512/897/897200.png",
		},
		{   id:8,
			name: "Computer science",
			icon: "https://cdn-icons-png.flaticon.com/512/3050/3050148.png",
		},
		{   id:9,
			name: "Writing",
			icon: "https://cdn-icons-png.flaticon.com/512/1742/1742585.png",
		},
		{   id:10,
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
	const courses = [
		{
			title: "Artificial Intelligence: Implications for Business Strategy",
			school: "MIT Sloan School of Management",
			image: "https://picsum.photos/200/150?random=1",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2048px-MIT_logo.svg.png",
			category: "Executive Education",
		},
		{
			title: "MBA Essentials",
			school: "LSE",
			image: "https://picsum.photos/200/150?random=2",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/London_School_of_Economics_COA.svg/800px-London_School_of_Economics_COA.svg.png",
			category: "Executive Education",
		},
		{
			title: "Oxford Executive Leadership Programme",
			school: "Oxford Saïd",
			image: "https://picsum.photos/200/150?random=3",
			logo: "https://upload.wikimedia.org/wikipedia/en/e/ec/Oxford_University.png",
			category: "Executive Education",
		},
		{
			title: "Deepak Chopra: Soul of Leadership and Wellbeing",
			school: "ChopraX",
			image: "https://picsum.photos/200/150?random=4",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Deepak_Chopra.jpg/800px-Deepak_Chopra.jpg",
			category: "Executive Education",
		},
	];
	const images = [
		{ src: "/favicon.png", alt: "Image 1" },
		{ src: "/favicon.png", alt: "Image 2" },
		{ src: "/favicon.png", alt: "Image 3" },
		{ src: "/favicon.png", alt: "Image 4" },
		{ src: "/favicon.png", alt: "Image 5" },
		{ src: "/favicon.png", alt: "Image 6" },
		{ src: "/favicon.png", alt: "Image 7" },
		{ src: "/favicon.png", alt: "Image 8" },
		{ src: "/favicon.png", alt: "Image 9" },
		{ src: "/favicon.png", alt: "Image 10" },
		{ src: "/favicon.png", alt: "Image 11" },
		{ src: "/favicon.png", alt: "Image 12" },
		{ src: "/favicon.png", alt: "Image 13" },
		{ src: "/favicon.png", alt: "Image 14" },
		{ src: "/favicon.png", alt: "Image 15" },
		{ src: "/favicon.png", alt: "Image 16" },
		{ src: "/favicon.png", alt: "Image 17" },
		{ src: "/favicon.png", alt: "Image 18" },
		{ src: "/favicon.png", alt: "Image 19" },
		{ src: "/favicon.png", alt: "Image 20" },
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col min-h-[100dvh]">
	<section
		class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]"
	>
		<div class="container px-4 md:px-6">
			<div
				class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
			>
				<div class="flex flex-col justify-center space-y-4">
					<div class="space-y-2">
						<h1
							class="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-5xl xl:text-6xl/none"
						>
							Unlock Your Tech Potential
						</h1>
						<p
							class="max-w-[600px] text-primary-foreground md:text-xl"
						>
							Enroll in our online tech courses and gain the
							skills to thrive in the digital age. Taught by
							industry experts, our programs are designed to help
							you succeed.
						</p>
					</div>
					<div>
						<Button
							href="/Enroll"
							className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							prefetch={false}
						>
							Enroll Now
						</Button>
					</div>
				</div>
				<img
					src="/favicon.png"
					width="550"
					height="400"
					alt="Hero"
					className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
				/>
			</div>
		</div>
	</section>
	<section class="bg-white py-8 md:py-12">
		<div class="max-w-2xl mx-auto text-center space-y-4 px-4 md:px-0">
			<h2
				class="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-[#f9b51b]"
			>
				Meet our Members
			</h2>
			<!-- <p class="text-sm md:text-base lg:text-xl text-muted-foreground text-black">
      Check out some of the top businesses in our directory.
    </p> -->
		</div>
		{#if browser}
			<div class="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
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
							class="bg-white rounded-lg overflow-hidden transition-all hover:scale-105 p-4"
						>
							<img
								src={image.src}
								alt={image.alt}
								class="rounded-box w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto hover:scale-110 transition-transform"
							/>
						</div>
					{/each}
				</Carousel>

			</div>
		{/if}
	</section>
	<div class="max-w-7xl mx-auto p-8">
		<div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-4">Featured Courses</h2>
    <Button on:click={() => goto("/Courses")} class="mb-4">View All Courses</Button>
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

		<!-- Filter Tags -->
		<!-- <div class="flex space-x-4 overflow-x-auto pb-4">
        {#each filters as filter}
        <button class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition">
            {filter}
        </button>
        {/each}
    </div> -->

		<!-- Courses Carousel -->
		<div class="flex space-x-6 overflow-x-auto pb-6 mt-6">
			{#each courses as course}
				<div
					class="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
				>
					<div class="relative">
						<img
							src={course.image}
							alt={course.title}
							class="w-full h-40 object-cover"
						/>
						<img
							src={course.logo}
							alt={course.school}
							class="absolute top-2 left-2 h-12 w-12 bg-white p-1 rounded-lg shadow"
						/>
					</div>
					<div class="p-4">
						<h3 class="text-lg font-semibold text-gray-800 mb-2">
							{course.title}
						</h3>
						<p class="text-gray-600 text-sm mb-4">
							{course.school}
						</p>
						<span
							class="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm"
							>{course.category}</span
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="max-w-7xl mx-auto p-8">
		<h2 class="text-2xl font-semibold mb-6">Explore Top Subjects</h2>
		<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
			{#each topics as topic}
				<div
					class="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition-shadow duration-200"
				
					>
					<a href={`/${topic.name}`}>
<img
						src={topic.icon}
						alt={topic.name}
						class="h-16 w-16 mb-4"
					/>
					<span class="text-lg font-medium text-gray-800"
						>{topic.name}</span
					>
					</a>
					
				</div>
			{/each}
		</div>
	</div>

	<div class="max-w-7xl mx-auto p-8">
		<h2 class="text-3xl font-bold mb-4">Newly added Courses</h2>

		<!-- Category Tabs -->
		<!-- <div class="flex space-x-6 mb-6 border-b">
        {#each categories as category, i}
        <button class="py-2 px-4 text-lg font-medium text-gray-600 hover:text-gray-900 focus:text-gray-900 transition-colors border-b-2 {i === 0 ? 'border-green-700 text-green-700' : 'border-transparent'}">
            {category}
        </button>
        {/each}
    </div> -->

		<!-- Filter Tags -->
		<!-- <div class="flex space-x-4 overflow-x-auto pb-4">
        {#each filters as filter}
        <button class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition">
            {filter}
        </button>
        {/each}
    </div> -->

		<!-- Courses Carousel -->
		<div class="flex space-x-6 overflow-x-auto pb-6 mt-6">
			{#each courses as course}
				<div
					class="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
				>
					<div class="relative">
						<img
							src={course.image}
							alt={course.title}
							class="w-full h-40 object-cover"
						/>
						<img
							src={course.logo}
							alt={course.school}
							class="absolute top-2 left-2 h-12 w-12 bg-white p-1 rounded-lg shadow"
						/>
					</div>
					<div class="p-4">
						<h3 class="text-lg font-semibold text-gray-800 mb-2">
							{course.title}
						</h3>
						<p class="text-gray-600 text-sm mb-4">
							{course.school}
						</p>
						<span
							class="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm"
							>{course.category}</span
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div
		class="container flex flex-wrap justify-around w-full mt-8 p-6 bg-[#f9b51b] rounded-2xl shadow-lg"
	>
		<div class="text-center text-black w-1/2 sm:w-1/4 mb-4 sm:mb-0">
			<h2 class="text-2xl font-bold">55</h2>
			<p class="text-white">Accommodations</p>
		</div>
		<div class="text-center text-black w-1/2 sm:w-1/4 mb-4 sm:mb-0">
			<h2 class="text-2xl font-bold">72</h2>
			<p class="text-white">Activities</p>
		</div>
		<div class="text-center text-black w-1/2 sm:w-1/4">
			<h2 class="text-2xl font-bold">115</h2>
			<p class="text-white">Stakeholders</p>
		</div>
		<div class="text-center text-black w-1/2 sm:w-1/4">
			<h2 class="text-2xl font-bold">20</h2>
			<p class="text-white">Years of Operation</p>
		</div>
	</div>
	<section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
						Our online tech courses cover a wide range of topics,
						from programming fundamentals to cutting-edge
						technologies. Dive deep and gain the skills to excel in
						the tech industry.
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
									Master the core concepts of programming,
									including variables, data types, control
									structures, and algorithms.
								</p>
							</div>
						</li>
						<li>
							<div class="grid gap-1">
								<h3 class="text-xl font-bold text-foreground">
									Web Development
								</h3>
								<p class="text-muted-foreground">
									Learn to build responsive and interactive
									websites using HTML, CSS, and JavaScript.
								</p>
							</div>
						</li>
						<li>
							<div class="grid gap-1">
								<h3 class="text-xl font-bold text-foreground">
									Mobile App Development
								</h3>
								<p class="text-muted-foreground">
									Dive into the world of mobile app
									development, creating apps for both iOS and
									Android platforms.
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<section class="w-full py-12 md:py-24 lg:py-32">
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
						Our tech courses are taught by industry experts with
						years of experience. Learn from the best and unlock your
						full potential.
					</p>
				</div>
			</div>
			<div
				class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
			>
				<div class="flex flex-col justify-center space-y-4">
					<div class="grid gap-4">
						<div
							class="grid grid-cols-[80px_1fr] items-center gap-4"
						>
							<Avatar.Root>
								<Avatar.Image
									src="/favicon.png"
									alt="Instructor 1"
								/>
								<Avatar.Fallback>J</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<h3 class="text-xl font-bold text-foreground">
									John Doe
								</h3>
								<p class="text-muted-foreground">
									Senior Software Engineer
								</p>
							</div>
						</div>
						<div
							class="grid grid-cols-[80px_1fr] items-center gap-4"
						>
							<Avatar.Root>
								<Avatar.Image
									src="/favicon.png"
									alt="Instructor 2"
								/>
								<Avatar.Fallback>J</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<h3 class="text-xl font-bold text-foreground">
									Jane Smith
								</h3>
								<p class="text-muted-foreground">
									Lead Mobile Developer
								</p>
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
	</section>
	<section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
						Hear from our students about their experiences and how
						our tech courses have helped them achieve their goals.
					</p>
				</div>
			</div>
			<div
				class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
			>
				<div class="flex flex-col justify-center space-y-4">
					<div class="grid gap-4">
						<div
							class="grid grid-cols-[80px_1fr] items-center gap-4"
						>
							<Avatar.Root>
								<Avatar.Image
									src="/favicon.png"
									alt="Student 1"
								/>
								<Avatar.Fallback>J</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<blockquote class="text-foreground">
									"The tech courses at this platform have been
									a game\n changer for me. The instructors are
									knowledgeable and\n the curriculum is
									top-notch. Highly recommended!"
								</blockquote>
								<p class="text-muted-foreground">
									- Sarah Johnson, Software Engineer
								</p>
							</div>
						</div>
						<div
							class="grid grid-cols-[80px_1fr] items-center gap-4"
						>
							<Avatar.Root>
								<Avatar.Image
									src="/favicon.png"
									alt="Student 2"
								/>
								<Avatar.Fallback>J</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<blockquote class="text-foreground">
									"I was able to transition into a tech career
									thanks to\n the comprehensive training and
									support provided by this\n platform. The
									courses are engaging and practical."
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
	</section>
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
</style>
