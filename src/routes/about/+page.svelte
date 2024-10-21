<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<!-- Main container -->
<div class="min-h-screen py-16 bg-#21409A">
	<!-- Main Title -->
	<h1 class="text-6xl font-bold text-white text-center mb-12">ABOUT US PAGES</h1>
  
	<!-- Main Grid Container -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-10">
  
	  <!-- First Card (Chicken) -->
	  <div class="relative bg-white rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-lg">
		<img
		  src="/path/to/chicken-image.jpg"
		  alt="Chicken"
		  class="w-full h-64 object-cover"
		/>
		<div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
		  <h2 class="text-xl font-bold mb-2">Village Tech</h2>
		  <p class="mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem iure, facere beatae voluptates quis eaque voluptatum repellat magnam unde earum aperiam magni reiciendis! Reprehenderit ut quibusdam est sint, voluptatem magnam..</p>
		  <a href="#" class="underline hover:text-yellow-300">Learn more</a>
		</div>
	  </div>
  
	  <!-- Second Card (Mavi Jeans) -->
	  <div class="relative bg-white rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-lg flex flex-col items-center">
		<img
		  src="/path/to/mavi-jeans-image.jpg"
		  alt="Mavi Jeans"
		  class="w-full h-64 object-cover"
		/>
		<div class="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 text-center p-4">
		  <h2 class="text-xl font-bold mb-4 text-black">Village Tech</h2>
		  <p class="text-gray-800 mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus aspernatur necessitatibus, numquam quas cupiditate ducimus distinctio, quae ipsam, corporis quod repellendus nobis. Eos ullam officia laborum veritatis, culpa vel voluptate?</p>
		  <a href="#" class="text-blue-600 underline hover:text-blue-800">Learn more</a>
		</div>
	  </div>
  
	  <!-- Third Card (Future Kind) -->
	  <div class="relative bg-white rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-lg">
		<img
		  src="/path/to/future-kind-image.jpg"
		  alt="Future Kind"
		  class="w-full h-64 object-cover"
		/>
		<div class="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 text-center p-4">
		  <h2 class="text-xl font-bold mb-4 text-black">Village Tech</h2>
		  <p class="text-gray-800 mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error repudiandae laudantium rem consequuntur vero exercitationem. Id, ducimus dolorum incidunt aliquid at enim? Reprehenderit minus similique ab dignissimos ipsum explicabo ipsam?</p>
		  <a href="#" class="text-blue-600 underline hover:text-blue-800">Learn more</a>
		</div>
	  </div>
  
	</div>
  </div>
  
  <style>
	/* Add any custom styles or transitions if necessary */
  </style>