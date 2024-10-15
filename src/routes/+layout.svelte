<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<main class="bg-gradient-to-r from-red-600 via-red-500 to-blue-700">
		
		<slot />
	</main>

	

    <footer class="bg-white pt-8 pb-4 text-center">
        <!-- Social Media Icons -->
        <div class="mb-4">
            <a href="#" class="text-blue-600 mx-3">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/facebook.svg" alt="Facebook" class="w-6 h-6 inline">
            </a>
            <a href="#" class="text-blue-600 mx-3">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/x.svg" alt="Twitter" class="w-6 h-6 inline">
            </a>
            <a href="#" class="text-blue-600 mx-3">
                <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/instagram.svg" alt="Instagram" class="w-6 h-6 inline">
            </a>
        </div>

        <!-- Covid-19 Information Section -->
        <div class="mb-6">
            <p class="text-gray-600">For up to date Corona information, <a href="#" class="text-red-500 underline">visit SA Government’s Covid-19 Portal</a></p>
            <div class="flex justify-center items-center mt-3">
                <img src="covid19.webp" alt="COVID-19, Health Department and NDP Logo " class="h-10 mx-2">
                <!-- <img src="https://via.placeholder.com/100x40?text=Health+Department" alt="Health Department Logo" class="h-10 mx-2">
                <img src="https://via.placeholder.com/100x40?text=NDP" alt="NDP Logo" class="h-10 mx-2"> -->
            </div>
        </div>

        <!-- Copyright Section -->
        <div class="bg-black text-white py-2">
            <p>© Copyright Village Tech</p>
        </div>
    </footer>



</div>

<style>
	/* .app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	} */

	main {
		/* flex: 1;
		display: flex; */
		/* flex-direction: column; */
		/* padding: 1rem; */
		/* width: 100%; */
		/* max-width: 64rem; */
		/* margin: 0 auto; */
		/* box-sizing: border-box; */
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
