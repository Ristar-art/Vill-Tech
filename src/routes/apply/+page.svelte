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
     
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      isSubmitting = true;
  
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
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
  </svelte:head>
  <div class="relative h-[60vh] py-16 flex flex-col items-center justify-center pt-20 text-center text-white">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://picsum.photos/800/600?random=9');"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80  to-slate-50 opacity-90"></div>
    <div class="relative z-10 max-w-2xl px-6">
        <h1 class="text-4xl font-bold">Apply Now</h1>
        <p class="text-xl mt-5">
            We welcome you to come through to our campus and speak to a student advisor today who can assist you to identify your academic values and goals, consistent with your capabilities, interest and educational background so that you can make the right decision for your future. Please ensure that you make an appointment.
        </p>
    </div>
</div>

 
  <div class="min-h-screen  flex items-center py-6 bg-[#21409A]">
    {#if visible}    
      <div class="max-w-4xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Information -->
          <div in:fly={{ x: -50, duration: 800 }} class=" rounded-2xl p-6 shadow-xl bg-white">
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
                  {#if isSubmitting} Sending... {:else} Send Message {/if}
                </button>
                {#if submitStatus === 'success'}
                  <div class="text-green-600 text-center" in:fade>
                    Message sent successfully!
                  </div>
                {/if}
              </form>
            
          </div>
  
          <!-- Contact Form -->
          <div in:fly={{ x: 50, duration: 800 }} class=" ">
            <div class="bg-white/10 rounded-2xl p-6 text-white">
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
                </div>
              </div>
          </div>
        </div>
      </div>
    {/if}
  </div>