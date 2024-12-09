<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { auth, db } from "$lib/firebase/firebase";
  import { onAuthStateChanged } from 'firebase/auth';
  import { onMount } from "svelte";
  import { collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
  import { signOut } from "firebase/auth";
  import { Home, BookOpen, Info, FileText, MessageCircle, Search, User, LogOut, Menu, X } from "lucide-svelte";

  let user = null;  
  let userData = null;
  let loading = true;
  let error = null;
  let mobileMenuOpen = false;
  let searchQuery = '';

  async function handleLogout() {
    try {
      await signOut(auth);
      await goto("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  onMount(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      user = currentUser;
      if (user) {
        fetchUserData(user.uid);
      }
    });
  });

  async function fetchUserData(userId) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        userData = { id: userDoc.id, ...userDoc.data() };
      } else {
        error = "User not found";
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handleSearch() {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  }
</script>

<header class="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 shadow-md z-50 backdrop-filter backdrop-blur-lg w-full">
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class:active={$page.url.pathname === '/'} class="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 526 663"
        class="h-12 w-12"
      >
        <!-- SVG Path (same as previous implementation) -->
        <style type="text/css">
          .st0 { fill-rule: evenodd; clip-rule: evenodd; fill: #df1814; }
          .st1 { fill-rule: evenodd; clip-rule: evenodd; fill: #283377; }
        </style>
        <path class="st0" d="M169.1,258c-0.3-0.5-1-1-1.6-1.4l-5.1-4.7c-0.6-0.6-1-1.1-1.6-1.7c-5.1-5-9.2-11.3-15-17.2c-3-3.1-4.9-4.8-9-7 c-2.8-1.5-6.2-2.7-9.7-3.3c-8.2-1.4-12.1-4.7-15-10.8c-3-6.2-3.5-15-2.2-22.4c1.2-7.6,3.7-12,8.7-17c4.2-4.1,11.4-6.1,19-6.7 c16.8-1.3,32.7-1.5,49.5,0c14.9,1.3,25.7,7,28.6,22.8c2.4,13.4-2.2,18.2-0.8,23.5c0.9,3.3,4.3,4.4,8.1,4.5c3.6,0.1,8.8-0.2,12.4-0.5 c8.2-0.9,12.3-4.1,13.8-11.9c2.9-14.7-2.3-31.2-8.6-41.4c-6.1-10-15.2-18.6-27.5-24c-13.4-5.9-30.2-5.4-46.1-5.4 c-13.9,0-35.6-0.7-48.4,3.1c-56.4,16.8-58,102.8,1.6,119.2C134,259.7,154.1,258.2,169.1,258" />
        <!-- Rest of the SVG paths remain the same -->
      </svg>
      <span class="text-2xl font-bold text-[#283377]">VillageTech</span>
    </a>

    <!-- Navigation Links (Desktop) -->
    <nav class="hidden lg:flex space-x-6">
      <a href="/Courses" class:active={$page.url.pathname === "/Courses"} 
        class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A] transition duration-300">
        <BookOpen class="h-5 w-5" />
        <span>Courses</span>
      </a>
      <a href="/about" class:active={$page.url.pathname === "/about"} 
        class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A] transition duration-300">
        <Info class="h-5 w-5" />
        <span>About Us</span>
      </a>
      <a href="/Blog" class:active={$page.url.pathname === "/Blog"} 
        class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A] transition duration-300">
        <FileText class="h-5 w-5" />
        <span>Blog</span>
      </a>
      <a href="/contact" class:active={$page.url.pathname === "/contact"} 
        class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A] transition duration-300">
        <MessageCircle class="h-5 w-5" />
        <span>Contact</span>
      </a>
    </nav>

    <!-- Search Bar -->
    <div class="hidden lg:flex items-center space-x-4">
      <div class="relative">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search Courses"
          class="w-64 px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-[#21409A] focus:outline-none"
        />
        <Search class="absolute left-3 top-3 text-gray-400" />
      </div>
    </div>

    <!-- CTA Buttons -->
    <div class="hidden lg:flex items-center space-x-4">
      {#if userData}
        <button 
          on:click={() => goto("/Profile")}
          class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A] transition duration-300"
        >
          <User class="h-5 w-5" />
          <span>{userData.username}</span>
        </button>
        <button
          on:click={handleLogout}
          class="flex items-center space-x-2 bg-[#21409A] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          <LogOut class="h-5 w-5 mr-2" />
          Sign Out
        </button>
      {:else}
        <a
          href="/Signup" 
          class:active={$page.url.pathname === "/Signup"}
          class="bg-[#21409A] text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2 transition duration-300"
        >
          Create an Account
        </a>
      {/if}
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="lg:hidden flex items-center text-gray-700"
      on:click={toggleMenu}
    >
      {#if mobileMenuOpen}
        <X class="h-6 w-6" />
      {:else}
        <Menu class="h-6 w-6" />
      {/if}
    </button>
  </div>

  <!-- Mobile Menu (Initially Hidden) -->
  {#if mobileMenuOpen}
    <div class="lg:hidden" transition:slide>
      <nav class="flex flex-col space-y-4 px-6 py-4 bg-gray-50">
        <a href="/Courses" class:active={$page.url.pathname === "/Courses"} 
          class="flex items-center space-x-3 text-gray-700 hover:text-[#21409A]">
          <BookOpen class="h-5 w-5" />
          <span>Courses</span>
        </a>
        <a href="/about" class:active={$page.url.pathname === "/about"} 
          class="flex items-center space-x-3 text-gray-700 hover:text-[#21409A]">
          <Info class="h-5 w-5" />
          <span>About Us</span>
        </a>
        <a href="/Blog" class:active={$page.url.pathname === "/Blog"} 
          class="flex items-center space-x-3 text-gray-700 hover:text-[#21409A]">
          <FileText class="h-5 w-5" />
          <span>Blog</span>
        </a>
        <a href="/contact" class:active={$page.url.pathname === "/contact"} 
          class="flex items-center space-x-3 text-gray-700 hover:text-[#21409A]">
          <MessageCircle class="h-5 w-5" />
          <span>Contact</span>
        </a>

        <div class="relative">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search Courses"
            class="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-[#21409A] focus:outline-none"
          />
          <Search class="absolute left-3 top-3 text-gray-400" />
        </div>

        {#if userData}
          <button 
            on:click={() => goto("/Profile")}
            class="flex items-center space-x-3 text-gray-700 hover:text-[#21409A]"
          >
            <User class="h-5 w-5" />
            <span>{userData.username}</span>
          </button>
          <button
            on:click={handleLogout}
            class="flex items-center justify-center space-x-3 bg-[#21409A] text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <LogOut class="h-5 w-5 mr-2" />
            Sign Out
          </button>
        {:else}
          <a 
            href="https://villagetech.moodlecloud.com/login/index.php?loginredirect=1" 
            class="flex items-center space-x-3 text-gray-700 hover:text-[#21409A]"
          >
            <User class="h-5 w-5" />
            <span>Login</span>
          </a>
          <a
            href="/Signup" 
            class:active={$page.url.pathname === "/Signup"}
            class="flex items-center justify-center space-x-3 bg-[#21409A] text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create an Account
          </a>
        {/if}
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