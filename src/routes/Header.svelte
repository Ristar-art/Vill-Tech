<script>
    let mobileMenuOpen = false;

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
</script>

<header class="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 shadow-md z-50 rounded-lg backdrop-filter backdrop-blur-lg w-full max-w-7xl">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo -->
        <div class="text-2xl font-bold text-indigo-600">
            <a href="/">TechCourses</a>
        </div>

        <!-- Navigation Links (Desktop) -->
        <nav class="hidden lg:flex space-x-8">
<<<<<<< HEAD
            <a href="#" class="text-gray-700 hover:text-indigo-600">Courses</a>
            <a href="#" class="text-gray-700 hover:text-indigo-600">About Us</a>
            <a href="#" class="text-gray-700 hover:text-indigo-600">Blog</a>
            <a href="contact" class="text-gray-700 hover:text-indigo-600">Contact</a>
=======
            <a href="Courses" class="text-gray-700 hover:text-indigo-600">Courses</a>
               <a href="chat" class="text-gray-700 hover:text-indigo-600">Chat</a>
            <a href="About" class="text-gray-700 hover:text-indigo-600">About Us</a>
            <a href="Blog" class="text-gray-700 hover:text-indigo-600">Blog</a>
            <a href="Contact" class="text-gray-700 hover:text-indigo-600">Contact</a>
>>>>>>> ba4ca86dd1bfd9ffd68d2c62eafe437f76bddb46
        </nav>

        <!-- Search Bar -->
        <div class="hidden lg:flex items-center space-x-4">
            <input type="text" placeholder="Search Courses" class="w-64 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none">
        </div>

        <!-- CTA Buttons -->
        <div class="hidden lg:flex items-center space-x-4">
            <a href="Login" class="text-gray-700 hover:text-indigo-600">Login</a>
            <a href="Signup" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden flex items-center text-gray-700" on:click={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>
    </div>

    <!-- Mobile Menu (Initially Hidden) -->
    {#if mobileMenuOpen}
        <div class="lg:hidden">
            <nav class="flex flex-col space-y-2 px-6 py-4 bg-gray-50">
                <a href="Courses" class="text-gray-700 hover:text-indigo-600">Courses</a>
                <a href="chat" class="text-gray-700 hover:text-indigo-600">Chat</a>
                <a href="About" class="text-gray-700 hover:text-indigo-600">About Us</a>
                <a href="Blog" class="text-gray-700 hover:text-indigo-600">Blog</a>
                <a href="Contact" class="text-gray-700 hover:text-indigo-600">Contact</a>
                <input type="text" placeholder="Search Courses" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none">
                <a href="Login" class="text-gray-700 hover:text-indigo-600">Login</a>
                <a href="Signup" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</a>
            </nav>
        </div>
    {/if}
</header>

<style>
    /* Ensuring full browser support for backdrop-filter */
    header {
        -webkit-backdrop-filter: blur(10px); /* Safari */
        backdrop-filter: blur(10px); /* Standard */
    }
</style>
