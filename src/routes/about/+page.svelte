<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { spring } from 'svelte/motion';
  
	let visible = false;
	let cards = [
	  {
		title: "Our Story",
		content: "Village Tech Training Solutions is a registered training and skills development service provider which was founded in 2015 with the main aim of assisting our society to address the high unemployment problem and skills shortage especially amongst the youth, rural societies, women and persons living with disabilities.",
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>`
	  },
	  {
		title: "Our Mission",
		content: "Our mission is to empower individuals through technology education and skills development, creating opportunities for sustainable employment and personal growth in underserved communities.",
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
		</svg>`
	  },
	  {
		title: "Our Impact",
		content: "Since our inception, we have trained over 1000 individuals, with 70% of our graduates securing employment or starting their own ventures within six months of completing our programs.",
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>`
	  },
	  {
		title: "Our Future",
		content: "We are expanding our reach to more rural areas and developing new programs in emerging technologies to ensure our communities stay ahead in the digital age.",
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
		</svg>`
	  }
	];
  
	onMount(() => {
	  visible = true;
	});
  </script>
  
  <svelte:head>
	<title>About Village Tech</title>
	<meta name="description" content="Learn about Village Tech Training Solutions and our mission to empower through technology education" />
  </svelte:head>
  
  <div class="min-h-screen py-16 px-4 md:px-16 bg-[#21409A]">
	{#if visible}
	  <div in:fade={{ duration: 1000 }}>
		<h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-12 mt-24 tracking-tight">
		  About <span class="text-red-500">Village</span> <span class="text-white">Tech</span>
		</h1>
	  </div>
  
	  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-8 max-w-6xl mx-auto">
		{#each cards as card, i}
		  <div
			in:fly={{ y: 50, duration: 800, delay: i * 200 }}
			class="group relative bg-white rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-[280px]"
		  >
			<!-- Background Pattern -->
			<div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 opacity-50"></div>
			
			<!-- Default State -->
			<div class="absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-500 group-hover:opacity-0">
			  {@html card.icon}
			  <h2 class="text-xl font-bold text-blue-900">{card.title}</h2>
			</div>
  
			<!-- Hover State -->
			<div class="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-blue-900 via-blue-900/80 to-red-900/50 text-white text-center p-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
			  <h2 class="text-xl font-bold mb-3 transform transition-all duration-300 text-red-400">
				{card.title}
			  </h2>
			  <p class="text-sm leading-relaxed transform translate-y-4 transition-all duration-300 group-hover:translate-y-0">
				{card.content}
			  </p>
			</div>
		  </div>
		{/each}
	  </div>
	{/if}
  </div>
  
  <style>
	:global(html) {
	  scroll-behavior: smooth;
	}
  
	.bg-gradient-to-br {
	  background-size: 400% 400%;
	  animation: gradientAnimation 15s ease infinite;
	}
  
	@keyframes gradientAnimation {
	  0% {
		background-position: 0% 50%;
	  }
	  50% {
		background-position: 100% 50%;
	  }
	  100% {
		background-position: 0% 50%;
	  }
	}
  </style>