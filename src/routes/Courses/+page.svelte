<script>
	// import Counter from "./Counter.svelte";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	// import Carousel from 'svelte-carousel'
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
    import { page } from "$app/stores";


	const id = $page.params.subjects;
	let carousel;


 
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
	
</script>

<svelte:head>
	<title>Courses</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col min-h-[100dvh]">

	
	<div class="max-w-7xl mx-auto p-8">
		<!-- <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-4">Featured Courses</h2>
    <Button class="mb-4">View All Courses</Button>
</div> -->

		

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
                <a href={`/Courses/${course.title}`}>
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
