<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { auth } from "$lib/firebase/firebase";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { onMount } from "svelte";
  import { Home, BookOpen, Info, FileText, MessageCircle, Menu, X } from "lucide-svelte";

  let user = null;
  let mobileMenuOpen = false;

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
    onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
    });
  });

  // Desktop Dropdown States
  let desktopDropdownState = {
    isCoursesOpen: false,
    isAboutOpen: false,
    isBookingsOpen: false,
    isExploreOpen: false,
    timeoutId: null,
  };

  // Mobile Dropdown States
  let mobileDropdownState = {
    isCoursesOpen: false,
    isBookingsOpen: false,
  };

  function toggleDesktopDropdown(menu, show) {
    if (desktopDropdownState.timeoutId) {
      clearTimeout(desktopDropdownState.timeoutId);
    }
    desktopDropdownState[menu] = show;
    if (!show) {
      desktopDropdownState.timeoutId = setTimeout(() => {
        desktopDropdownState[menu] = false;
      }, 200);
    }
  }

  function handleButtonMouseLeave(event, menu) {
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !relatedTarget.closest(".dropdown-content")) {
      toggleDesktopDropdown(menu, false);
    }
  }

  function toggleMobileDropdown(menu) {
    mobileDropdownState[menu] = !mobileDropdownState[menu];
  }
</script>

<header class="fixed top-0 left-0 w-full bg-white shadow-md z-50 backdrop-filter backdrop-blur-lg">
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="flex items-center space-x-2">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 526 663"
      class="h-12 w-12"

    >
      <style type="text/css">
        .st0 {
          fill-rule: evenodd;
          clip-rule: evenodd;
          fill: #df1814;
        }
        .st1 {
          fill-rule: evenodd;
          clip-rule: evenodd;
          fill: #283377;
        }
      </style>
      <path
        class="st0"
        d="M169.1,258c-0.3-0.5-1-1-1.6-1.4l-5.1-4.7c-0.6-0.6-1-1.1-1.6-1.7c-5.1-5-9.2-11.3-15-17.2c-3-3.1-4.9-4.8-9-7
                  c-2.8-1.5-6.2-2.7-9.7-3.3c-8.2-1.4-12.1-4.7-15-10.8c-3-6.2-3.5-15-2.2-22.4c1.2-7.6,3.7-12,8.7-17c4.2-4.1,11.4-6.1,19-6.7
                  c16.8-1.3,32.7-1.5,49.5,0c14.9,1.3,25.7,7,28.6,22.8c2.4,13.4-2.2,18.2-0.8,23.5c0.9,3.3,4.3,4.4,8.1,4.5c3.6,0.1,8.8-0.2,12.4-0.5
                  c8.2-0.9,12.3-4.1,13.8-11.9c2.9-14.7-2.3-31.2-8.6-41.4c-6.1-10-15.2-18.6-27.5-24c-13.4-5.9-30.2-5.4-46.1-5.4
                  c-13.9,0-35.6-0.7-48.4,3.1c-56.4,16.8-58,102.8,1.6,119.2C134,259.7,154.1,258.2,169.1,258"
      />
      <path
        class="st0"
        d="M360.1,134c0.6,1,0.9,1.2,1.6,2c0.5,0.6,1.1,1.4,1.7,2.1c7.9,10.1,13.3,20.2,24.6,26.9
                  c6.9,4.1,14.6,3.5,20.8,8.5c13.4,10.8,9.8,37.5-1.3,46.1c-3.4,2.7-6.4,4.5-11.8,5.7c-6.1,1.3-17.5,1-24.5,1
                  c-12.8,0-31.5,0.6-42.9-2.8c-13.6-4.1-18.5-12.5-18.5-28.4c0-5.8,1.2-10.6,1.5-16c-17.2-1.8-36.4-4.9-36.4,15.2
                  c0,9,4.4,22.4,7.6,29.7c2,4.5,4.3,8.4,6.9,11.9c8.2,11.3,20.5,18.8,35.3,21c16,2.4,63.2,2.5,77.7-0.1c18.6-3.3,32.4-13.9,40.6-30.7
                  c12.6-26.2,6.7-65.1-18.4-81.6C404.5,131.4,386.7,133.8,360.1,134"
      />
      <path
        class="st1"
        d="M259.9,20.8c-26,2.1-49.1,24.9-47.9,53.1c1.1,26.8,24.9,48.6,53.3,47.6c27.9-1,49.5-23.7,47.5-53.3
C311,41.3,288.9,18.5,259.9,20.8 M259.6,53.7c11.4-1.6,19.9,4.5,21.5,14.3c4,25.3-31.5,29.6-35.5,7.3
C243.9,66.1,247.8,55.3,259.6,53.7z"
      />
      <path
        class="st1"
        d="M228.2,270.4c-2.8,0.4-5.3,1.9-6.7,3.3c-2.1,2.1-1.7,4.7-1.5,8.1c0.5,10.8,0.1,28.6,0.1,40.2
c0,3.3,0.2,6.7,0.1,10c-0.1,3.1-0.8,6.5,0.4,9.3c1.9,4.4,6.5,7.1,12.8,7.3c3.1,0.1,6.5-0.3,9.8-0.3c16.6,0,34.6,0.4,50.7,0
c3.2-0.1,5.3-1.5,6.9-3.1c2.4-2.5,1.9-3.9,1.7-7.9c-0.4-11.7-0.1-28.1-0.1-40.3c0-4.3,0.7-16.8-0.1-20.1c-0.6-2.6-2.8-4.7-4.2-5.8
c-2.3-1.6-6.1-1-9.1-1c-16.5,0-34.1-0.3-50.5,0C235.2,270.3,231,270,228.2,270.4"
      />
      <path
        class="st1"
        d="M417.9,496.7c0.3,0.8,2.7,6.7,3.6,6.9H432l0-63.3l-34.2,0l0,14.3l12.7,0c0,4.6,0.2,22.6-0.2,25.7
c-1.1,8.6-8.6,10.8-15.9,9.5c-9.7-1.7-9.1-9.9-9.1-17l0-65.3c0-4.5,0.2-7.7,2.6-10.7c3.8-4.7,14.5-5.5,19.2-0.9
c4.7,4.6,3.3,15.2,3.3,22.8l21.4,0c0-12.7,1.9-21.9-6.2-31.2c-10.7-12.3-43.9-13-55.5-0.2c-7.7,8.4-6.4,17.4-6.4,30.9v55.8
c0,6,0,11.3,2.4,16.4c3.9,8.2,11.2,12.9,22.9,14.3c5.8,0.7,11.5,0.4,17-1.1c2.4-0.7,4.5-1.6,6.5-2.7
C415.8,499.2,415.8,498.6,417.9,496.7"
      />
      <path
        class="st1"
        d="M233.1,134.2c0.3,2.7,5.5,11,7.5,13.7c5.2,7,11.9,12.4,20.5,15.5c7.7,2.8,16.5,3.5,25.3,3
c4.6-0.3,8.9-1.1,13.5-1.2c4.5-0.1,9.6,0.2,14.1,0.5c27.3,2.1,32.2,18.4,29.2,41.4c-1.5,11.2,5.6,8.9,12,9.2
c6.1,0.2,13.9,1.8,18.3-2.8c4.5-4.7,5.4-15.5,4.7-23.6c-2-21.3-16.5-42.1-35.8-50.7c-8.2-3.6-14.1-4.4-23.9-4.9
C290.3,132.9,261.5,134.2,233.1,134.2"
      />
      <path
        class="st1"
        d="M291,257.3c-0.3-4.3-5.9-15.1-9.2-18.7c-5.2-5.6-9.5-8.5-17.5-10.7c-13.5-3.7-36.7-0.8-53.3-1.9
c-21.3-1.4-25.9-7.8-27.3-28.9c-0.7-11.6,2.4-16.2-8.4-20c-7.6-2.6-17.5-1.6-22.2,2.9c-4.5,4.3-5,15.6-4.3,23.5
c1.9,21.2,15,41.6,34.8,49.6c8.1,3.3,14.5,3.7,23.8,4.2C235.5,258.8,262.8,257.2,291,257.3"
      />
      <path
        class="st0"
        d="M358.7,639.4c0-5.8-0.3-52.3,0.2-53.9l26.3,0l0,53.9l20.3-0.1l-0.1-117.2l-20.2,0l0,49.1l-26.4,0l0-49.1
l-20.3,0l0,117.3L358.7,639.4z"
      />
      <path
        class="st1"
        d="M277.5,503.6l21.7,0l5.2-31.6c1.4-0.3,22.9-0.3,24,0l5.2,31.5l21.7,0l-23.1-116.1c-0.3-1.6-0.9-6.9-1.9-7.7
h-27.9L277.5,503.6z M307.2,458.4c0.4-4.8,1.7-10.5,2.4-15.4c1.6-10,3.4-20.3,4.7-30.3c0.3-2.4,1.4-14.4,1.9-15.6
c0.7,0.5,1.1,6.6,1.2,7.8l3.2,23c1,6.4,4.4,25.5,4.9,30.5L307.2,458.4z"
      />
      <path
        class="st0"
        d="M158,44.5c-20,2.5-36.8,20.1-33.8,43.4c2.6,19.8,20.5,36.3,43.7,33.1c5.2-0.7,10.4-2.6,14.3-4.9
c8.1-4.8,14.4-11.8,17.7-21c1.9-5.2,2.6-11.3,1.8-17.2C199.1,59,180.4,41.7,158,44.5"
      />
      <path
        class="st0"
        d="M359.6,44.3C339,46.4,322.9,63.6,325,86.8c1.9,21.1,19.2,36.9,42.8,34.3c11.8-1.3,20.4-7.2,25.4-13.3
c5.7-6.8,10.4-17.1,9-29.3C399.9,59.7,381.4,42.1,359.6,44.3"
      />
      <path
        class="st1"
        d="M47.3,503.6l24.7,0l26.7-123.9l-20.9,0c-0.7,0.3-2.4,10.9-2.6,12.3l-7.1,37.9c-2.1,10.6-5.4,27.4-6.7,38
c-0.3,2.1-1,12.5-1.6,13.4c-0.2-0.3-0.1,0-0.3-0.5l-1.4-12.5c-1.5-11.7-4.5-26.3-6.7-38.1l-7.1-37.7c-0.7-4-1.9-8.8-2.3-12.7
l-21.2,0L47.3,503.6z"
      />
      <path
        class="st0"
        d="M301.6,602.4c-0.3,6.9,1.3,16.2-2.5,21c-3.2,4.1-13.3,4.8-17.5,0.8c-4.7-4.6-3.4-12.3-3.4-20.1v-46.8
c0-7.6-1.2-15.7,3.5-20c4.2-3.8,14.3-3.3,17.5,1.1c4.1,5.5,1.5,13.8,2.4,20.9l20.2-0.1c0.4-4.3,0.3-15.6-0.6-19.6
c-1.3-5.7-4.5-9.9-7.8-12.4c-13-9.9-50.6-10.9-55.1,13.5c-0.9,5-0.5,32.9-0.5,40.2c0,7.4-0.5,35.2,0.5,40.4
c4.6,24.3,42.8,23,55.1,13.2c9.2-7.4,8.8-16.9,8.3-32L301.6,602.4z"
      />
      <polygon
        class="st1"
        points="451,503.5 504.4,503.5 504.4,489 472.5,488.9 472.5,447.3 500.6,447.3 500.6,432.2 472.5,432.1 
472.5,394.7 504.3,394.7 504.4,379.8 451,379.7 "
      />
      <path
        class="st0"
        d="M215.7,536.5c4.8-0.7,27.8,0.6,30.2-0.3l0-14l-50.5,0l0,117.3l50.5,0l0-13.9l-30.2-0.1l0.1-39.3h26.6l0-14.4
l-26.7-0.1L215.7,536.5z"
      />
      <path
        class="st0"
        d="M144.4,270.5c-4.2,1.4-4.5,5.9-4.4,10.8c0.4,14.4,0.1,32.1,0.1,46.8c0,7-1.6,15.2,3.9,19.3c2,1.5,3.9,1.2,6.6,1
c6.6-0.6,27.9,0.5,31.1-0.2c1.7-0.3,3.1-2.3,3.8-4c0.8-2.1,0.5-4.7,0.5-7c-0.1-5.1-0.1-10.3-0.1-15.4c0-10.4,0-20.8,0-31.2
c0-4.8,1.3-16.7-2.9-19.9c-1-0.8-6-0.4-7.7-0.4C170.7,270.2,146.8,269.7,144.4,270.5"
      />
      <path
        class="st0"
        d="M340.7,270.5c-4.9,1.5-4.6,7.7-4.5,11.1c0.4,14.8,0,31.4,0.1,46.5c0,6.5-1.6,15.3,3.8,19.3c1.7,1.3,4,1.3,6.4,1
c6-0.6,27.9,0.3,31.1-0.1c2-0.3,3.2-2.1,3.9-3.8c0.9-2.1,0.6-4.7,0.6-7.1c-0.3-14.5-0.1-31.8-0.1-46.5c0-4,0.5-11.6-0.3-15.1
c-0.4-1.7-1.7-4.4-2.7-5.1C377.7,269.7,342,270.1,340.7,270.5"
      />
      <polygon
        class="st1"
        points="154.5,503.6 207.9,503.6 207.9,489 176.3,488.9 176,488.9 176,379.8 154.5,379.7 "
      />
      <polygon
        class="st1"
        points="220.6,503.5 274,503.5 273.9,489 242.1,488.9 242.1,379.7 220.6,379.7 "
      />
      <polygon
        class="st0"
        points="119.8,536.4 142,536.4 142,639.5 162.3,639.4 162.4,536.4 184.5,536.3 184.4,522.2 119.8,522.2 "
      />
      <path
        class="st1"
        d="M110.6,503.5l21.4,0.1c0.4-10,0-20.9,0-31c0-6.2,0.3-91-0.1-92.9l-21.2,0L110.6,503.5z"
      />
    </svg>
    </a>

    <!-- Desktop Navigation -->
    <!-- Desktop Navigation -->
<nav class="hidden lg:flex space-x-6 items-center">
  <a href="/" class="{$page.url.pathname === '/' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
    <span>Home</span>
  </a>

  <!-- Courses Dropdown -->
  <div class="relative" on:mouseenter={() => toggleDesktopDropdown("isCoursesOpen", true)} on:mouseleave={(e) => handleButtonMouseLeave(e, "isCoursesOpen")}>
    <a class="{$page.url.pathname === '/Courses' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
      <span>Courses</span>
    </a>
    {#if desktopDropdownState.isCoursesOpen}
      <div class="dropdown-content absolute bg-white shadow-lg rounded-md min-w-[200px] z-50">
        <a href="/Courses/all-courses" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">All Courses</a>
        <a href="/Courses/seta" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Seta Courses</a>
        <a href="/Courses/international" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">International Courses</a>
        <a href="/Courses/trades" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Trades Courses</a>
        <a href="/Courses/educator-training" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Educator Training</a>
        <a href="/Courses/short-courses" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Short Courses</a>
      </div>
    {/if}
  </div>

  <!-- About Us Dropdown -->
  <div class="relative" on:mouseenter={() => toggleDesktopDropdown("isAboutOpen", true)} on:mouseleave={(e) => handleButtonMouseLeave(e, "isAboutOpen")}>
    <a href="/about" class="{$page.url.pathname === '/about' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
      <span>About Us</span>
    </a>
    {#if desktopDropdownState.isAboutOpen}
      <div class="dropdown-content absolute bg-white shadow-lg rounded-md min-w-[200px] z-50">
        <!-- <a href="/accreditations" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Accreditations</a> -->
        <a href="/services" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</a>
      </div>
    {/if}
  </div>

  <!-- Bookings Dropdown -->
  <!-- <div class="relative" on:mouseenter={() => toggleDesktopDropdown("isBookingsOpen", true)} on:mouseleave={(e) => handleButtonMouseLeave(e, "isBookingsOpen")}>
    <a href="/bookings" class="{$page.url.pathname === '/bookings' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
      <span>Bookings</span>
    </a>
    {#if desktopDropdownState.isBookingsOpen}
      <div class="dropdown-content absolute bg-white shadow-lg rounded-md  min-w-[200px] z-50">
        <a href="/bookings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bookings</a>
        <a href="/pearson-vue-exam-bookings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Pearson Vue Exam Bookings</a>
        <a href="/training-room-bookings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Training Room Bookings</a>
        <a href="/qcto-exam-bookings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">QCTO Exam Bookings</a>
      </div>
    {/if}
  </div> -->
  <a href="/bookings" class="{$page.url.pathname === '/bookings' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
    <span>Bookings</span>
  </a>
  <!-- Explore Village Tech Dropdown -->
  <!-- <div class="relative" on:mouseenter={() => toggleDesktopDropdown("isExploreOpen", true)} on:mouseleave={(e) => handleButtonMouseLeave(e, "isExploreOpen")}>
    <a href="/explore-village-tech" class="{$page.url.pathname === '/explore-village-tech' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
      <span>Explore Village Tech</span>
    </a>
    {#if desktopDropdownState.isExploreOpen}
      <div class="dropdown-content absolute bg-white shadow-lg rounded-md min-w-[200px] z-50">
        <a href="/explore-village-tech" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Explore Village Tech</a>
        <a href="/news-and-media" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">News and Media</a>
        <a href="/payment-methods" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Payment Methods</a>
        <a href="/payment-terms" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Payment Terms</a>
        <a href="/fqas" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">FAQ's</a>
      </div>
    {/if}
  </div> -->

  
  <a href="/learnerships" class="{$page.url.pathname === '/learnerships' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
    <span>Learnerships</span>
  </a>
  <!-- <a href="/apply" class="{$page.url.pathname === '/Apply-or-Enquire-Now' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
    <span>Apply/Enquire Now</span>
  </a> -->
  <a href="/contact" class="{$page.url.pathname === '/contact' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
    <span>Contact</span>
  </a>
</nav>
<a href="https://villagetech.moodlecloud.com/login/index.php?loginredirect=1" class="text-gray-700 flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
  <span>Log in</span>
</a>
    <!-- Mobile Menu Button -->
    <button class="lg:hidden flex items-center text-gray-700" on:click={toggleMenu}>
      {#if mobileMenuOpen}
        <X class="h-6 w-6" />
      {:else}
        <Menu class="h-6 w-6" />
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="lg:hidden bg-gray-50 px-6 py-4">
      <nav class="flex flex-col space-y-4">
        <a href="/" class="{$page.url.pathname === '/' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
          <Home class="h-5 w-5" />
          <span>Home</span>
        </a>

        <!-- Courses Mobile Dropdown -->
        <div class="flex flex-col">
          <button on:click={() => toggleMobileDropdown("isCoursesOpen")} class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A]">
            <BookOpen class="h-5 w-5" />
            <span>Courses</span>
          </button>
          {#if mobileDropdownState.isCoursesOpen}
            <div class="ml-8 flex flex-col space-y-2 mt-2">
              <a href="/Courses" class="text-gray-600 hover:text-[#21409A]">Courses</a>
              <a href="/seta-courses" class="text-gray-600 hover:text-[#21409A]">Seta Courses</a>
              <a href="/international-courses" class="text-gray-600 hover:text-[#21409A]">International Courses</a>
              <a href="/trade-courses" class="text-gray-600 hover:text-[#21409A]">Trades Courses</a>
              <a href="/educator-training" class="text-gray-600 hover:text-[#21409A]">Educator Training</a>
              <a href="/short-courses" class="text-gray-600 hover:text-[#21409A]">Short Courses</a>
            </div>
          {/if}
        </div>

        <a href="/about" class="{$page.url.pathname === '/about' ? 'text-[#21409A]' : 'text-gray-700'} flex items-center space-x-2 hover:text-[#21409A] transition duration-300">
          <Info class="h-5 w-5" />
          <span>About Us</span>
        </a>

        <!-- Bookings Mobile Dropdown -->
        <div class="flex flex-col">
          <button on:click={() => toggleMobileDropdown("isBookingsOpen")} class="flex items-center space-x-2 text-gray-700 hover:text-[#21409A]">
            <span>Bookings</span>
          </button>
          {#if mobileDropdownState.isBookingsOpen}
            <div class="ml-8 flex flex-col space-y-2 mt-2">
              <a href="/bookings" class="text-gray-600 hover:text-[#21409A]">Bookings</a>
              <a href="/pearson-vue-exam-bookings" class="text-gray-600 hover:text-[#21409A]">Pearson Vue Exam Bookings</a>
              <a href="/training-room-bookings" class="text-gray-600 hover:text-[#21409A]">Training Room Bookings</a>
              <a href="/qcto-exam-bookings" class="text-gray-600 hover:text-[#21409A]">QCTO Exam Bookings</a>
            </div>
          {/if}
        </div>

        <!-- <a href="/explore-village-tech" class={$page.url.pathname === "/explore-village-tech" ? "text-[#21409A]" : "text-gray-700"} class="flex items-center space-x-2 hover:text-[#21409A]">
          <span>Explore Village Tech</span>
        </a>
        <a href="/learnerships" class={$page.url.pathname === "/learnerships" ? "text-[#21409A]" : "text-gray-700"} class="flex items-center space-x-2 hover:text-[#21409A]">
          <span>Learnerships</span>
        </a>
        <a href="/Apply-or-Enquire-Now" class={$page.url.pathname === "/Apply-or-Enquire-Now" ? "text-[#21409A]" : "text-gray-700"} class="flex items-center space-x-2 hover:text-[#21409A]">
          <span>Apply/Enquire Now</span>
        </a>
        <a href="/contact" class={$page.url.pathname === "/contact" ? "text-[#21409A]" : "text-gray-700"} class="flex items-center space-x-2 hover:text-[#21409A]">
          <MessageCircle class="h-5 w-5" />
          <span>Contact</span>
        </a>
      </nav> -->
    </div>
  {/if}
</header>

<style>
  header {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    font-family: "Barlow Semi Condensed", sans-serif;
  }

  .dropdown-content {
    min-width: 200px;
    z-index: 50;
    transition: opacity 0.2s ease-in-out;
  }

  @font-face {
    font-family: "Barlow Semi Condensed";
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url("$lib/font/barlow-semi-condensed-latin-100-italic.ttf");
  }
</style>