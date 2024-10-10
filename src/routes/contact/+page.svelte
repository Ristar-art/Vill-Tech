<script>
    let name = '';
    let email = '';
    let course = '';
    let message = '';
  </script>
  
  <!-- Include Font Awesome for social media icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  
  <!-- Container for Background and Content -->
  <div class="relative h-screen text-white">
  
    <!-- Wavy Header -->
    <div class="relative bg-blue-900 h-40">
      <div class="absolute top-0 left-0 w-full">
        <!-- SVG for Wavy Header -->
        <svg viewBox="0 0 1440 320" class="w-full h-auto">
          <path fill="#1f3b6c" fill-opacity="1" d="M0,64L1440,224L1440,320L0,320Z"></path>
        </svg>
      </div>
      <!-- Contact Text Inside the Wavy Header -->
      <div class="absolute inset-0 flex items-center justify-center z-10">
        <h1 class="text-5xl font-bold text-white">Contact</h1>
      </div>
    </div>
    
  <section>
    <!-- Main Content Container with Map Background -->
    <div class="relative h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6905166364404!2d28.037884175415257!3d-26.206743977075003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ea242cbb1e3%3A0xea12498442f6848e!2sVillage%20Tech%20Training%20Solutions!5e0!3m2!1sen!2sza!4v1728566430369!5m2!1sen!2sza"
          width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
     
    <div class="absolute inset-0 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-center h-full p-10 bg-opacity-75 bg-gray-900">
    
  
      <!-- Contact Form Section -->
      <div class="bg-opacity-75 bg-gray-900 p-8 rounded-xl max-w-lg shadow-lg">
        <h2 class="text-3xl font-semibold mb-4 text-center">Contact Form</h2>
        <form class="space-y-4">
          <div>
            <label for="name" class="block mb-2">Name</label>
            <input type="text" id="name" bind:value={name} class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none" placeholder="Your Name">
          </div>
          <div>
            <label for="email" class="block mb-2">Email</label>
            <input type="email" id="email" bind:value={email} class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none" placeholder="Your Email">
          </div>
          <div>
            <label for="course" class="block mb-2">Course Interest</label>
            <input type="text" id="course" bind:value={course} class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none" placeholder="Course Interest">
          </div>
          <div>
            <label for="message" class="block mb-2">Message</label>
            <textarea id="message" bind:value={message} class="w-full p-2 rounded bg-gray-800 text-white focus:outline-none" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" class="w-full p-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg text-white font-bold">
            Send
          </button>
        </form>
      </div>
  
      <!-- Address and Social Media Section -->
      <div class="bg-opacity-75 bg-gray-900 p-8 rounded-xl">
        <h3 class="text-2xl font-semibold mb-2">Village Tech Address</h3>
        <h4>85 Main Street Groundfloor,</h4>
        <h5> Marshalltown, Johannesburg, 2107</h5>
        <div class="flex space-x-4 mt-4">
          <!-- Social Media Icons using Font Awesome -->
          <a href="#" class="bg-gray-800 p-2 rounded-full">
            <i class="fab fa-facebook-f text-white"></i>
          </a>
          <a href="#" class="bg-gray-800 p-2 rounded-full">
            <i class="fab fa-instagram text-white"></i>
          </a>
          <a href="info@villagetech.co.za" class="bg-gray-800 p-2 rounded-full">
            <i class="fas fa-envelope text-white"></i>
          </a>
        </div>
      </div>
  
    </div>
  
  
  </div>
</section>
  
</div>