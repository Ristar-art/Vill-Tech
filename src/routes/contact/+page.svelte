<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
    let visible = false;
    let formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    let isSubmitting = false;
    let submitStatus = null;
    let map;
    
    onMount(() => {
      visible = true;
      
      // Initialize OpenStreetMap
      if (typeof window !== 'undefined') {
        // Wait for the map container to be available
        setTimeout(() => {
          map = L.map('map').setView([40.7128, -74.0060], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          // Add a marker for the location
          const marker = L.marker([40.7128, -74.0060]).addTo(map);
          marker.bindPopup("<b>Village Tech</b><br>123 Tech Street, Digital Village").openPopup();
        }, 0);
      }
    });
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      isSubmitting = true;
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      submitStatus = 'success';
      isSubmitting = false;
      
      // Reset form
      formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        submitStatus = null;
      }, 3000);
    };
  </script>
  
  <svelte:head>
    <title>Contact Us - Village Tech</title>
    <meta name="description" content="Get in touch with Village Tech Training Solutions" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  </svelte:head>
  
  <div class="min-h-screen bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="py-16 px-4" in:fade={{ duration: 1000 }}>
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-24">
            <span class="text-blue-400">Contact</span> <span class="text-red-500">Us</span>
          </h1>
          <p class="text-white/80 text-center max-w-2xl mx-auto">
            Have questions about our programs? Want to partner with us? We'd love to hear from you!
          </p>
        </div>
      </div>
  
      <!-- Contact Section -->
      <div class="max-w-4xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Information -->
          <div in:fly={{ x: -50, duration: 800 }} class="space-y-8">
            <div class="bg-white/10 rounded-tl-[40px] rounded-br-[40px] p-6 text-white">
              <h2 class="text-2xl font-bold mb-4">Get in Touch</h2>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Email</p>
                    <p class="text-white/80">info@villagetech.co.za</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Location</p>
                    <p class="text-white/80">85 Main Street Groundfloor, Marshalltown, Johannesburg, 2107</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6905166364404!2d28.037884175415257!3d-26.206743977075003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ea242cbb1e3%3A0xea12498442f6848e!2sVillage%20Tech%20Training%20Solutions!5e0!3m2!1sen!2sza!4v1729850883675!5m2!1sen!2sza" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Phone</p>
                    <p class="text-white/80">087 135 1313</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Contact Form -->
          <div in:fly={{ x: 50, duration: 800 }} class="bg-white rounded-tl-[40px] rounded-br-[40px] p-6 shadow-xl">
            <form on:submit={handleSubmit} class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  bind:value={formData.email}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  bind:value={formData.subject}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  bind:value={formData.message}
                  required
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full bg-red-500 text-white py-2 px-6 rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {#if isSubmitting}
                  Sending...
                {:else}
                  Send Message
                {/if}
              </button>
              
              {#if submitStatus === 'success'}
                <div class="text-green-600 text-center" in:fade>
                  Message sent successfully!
                </div>
              {/if}
            </form>
          </div>
        </div>
  
        <!-- Map Section -->
        <div 
          in:fly={{ y: 50, duration: 800, delay: 200 }} 
          class="mt-12 bg-white rounded-tl-[40px] rounded-br-[40px] p-6 shadow-xl"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Find Us</h2>
          <div id="map" class="h-[400px] w-full rounded-lg"></div>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
  
    .bg-blue {
      background-color: #1a365d;
    }
  
    /* Map container styles */
    :global(.leaflet-container) {
      z-index: 1;
    }
  </style>