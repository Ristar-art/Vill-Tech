<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let organization = '';
    let contact = '';
    let email = '';
    let phone = '';
    let bookingType = 'Training room hire';
    let attendees = 1;
    let startDate = '';
    let duration = 1;
    let durationUnit = 'Hours';
    let message = '';
  
    async function handleSubmit() {
      const data = { organization, contact, email, phone, bookingType, attendees, startDate, duration, durationUnit, message };
      // Send to API or email service
      console.log('Form submitted:', data);
    }
    let isSubmitting = false;
    let submitStatus = null;
    let visible = false;
  
    onMount(() => {
      visible = true;
      // Initialize OpenStreetMap (if needed in the future)
    });
  </script>
  
  <svelte:head>
    <title>Bookings - Village Tech</title>
    <meta name="description" content="Book your Pearson VUE exams, training rooms, or QCTO assessments with Village Tech." />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  </svelte:head>
  
  <div class="min-h-screen py-16 bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('1.webp');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-black-50 opacity-90"></div>
        <div class="relative z-10 max-w-2xl px-6">
          <h1 class="text-4xl font-bold">Bookings at Village Tech</h1>
          <p class="text-xl mt-5">
            Reserve your spot for Pearson VUE exams, training room rentals, or QCTO assessments with ease. Village Tech offers a professional, secure, and flexible booking experience tailored to your needs.
          </p>
        </div>
      </div>
  
      <!-- Booking Information Section -->
      <section class="p-14 text-white">
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Pearson VUE Exams -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">Pearson VUE Exam Booking Services</h2>
            <p class="text-white/80 mb-4">
              Village Tech is an authorized Pearson VUE test center, providing a secure and professional environment for globally recognized certification exams in IT, business, healthcare, and more.
            </p>
            <h3 class="text-lg font-semibold mb-2">Why Choose Us?</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Accredited Test Centre – Officially authorized by Pearson VUE.</li>
              <li>Secure & Comfortable Environment – Quiet, distraction-free spaces.</li>
              <li>Professional Proctoring – Trained staff ensure compliance.</li>
              <li>Flexible Scheduling – Book at your convenience.</li>
              <li>Technical Support – On-site assistance for test-day needs.</li>
            </ul>
            <h3 class="text-lg font-semibold mt-4 mb-2">How to Book</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Visit <a href="http://www.pearsonvue.com" class="underline">www.pearsonvue.com</a> and log in.</li>
              <li>Select your exam and choose Village Technologies as your test centre.</li>
              <li>Pick a date and time, then confirm with payment.</li>
              <li>Arrive with valid ID on exam day.</li>
            </ol>
            <p class="mt-4">Exams offered include CompTIA (A+, Network+, Security+), Cisco (CCNA, CCNP), Microsoft (Azure, M365), AWS, VMware, and more. Call <strong>087 135 1313</strong> or email <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a> for assistance.</p>
          </div>
  
          <!-- Training Room Bookings -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">Training Room Bookings</h2>
            <p class="text-white/80 mb-4">
              Host your next workshop, seminar, or corporate training in our modern, fully equipped training rooms designed for a professional and comfortable learning experience.
            </p>
            <h3 class="text-lg font-semibold mb-2">Room Features</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>High-Speed Internet & Wi-Fi – Seamless online connectivity.</li>
              <li>Audio-Visual Equipment – Projectors and sound systems included.</li>
              <li>Comfortable Seating & Workstations – Ergonomic setup.</li>
              <li>IT & Technical Support – On-site help available.</li>
              <li>Breakout Areas & Refreshments – Relax during breaks.</li>
            </ul>
            <h3 class="text-lg font-semibold mt-4 mb-2">Booking Options</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Half-day or full-day rentals</li>
              <li>Hourly bookings for short sessions</li>
              <li>Custom packages for multi-day training</li>
            </ul>
            <p class="mt-4">Perfect for corporate training, workshops, ICT skills programs, and educator development. Contact us at <strong>087 135 1313</strong> to check availability and pricing.</p>
          </div>
  
          <!-- QCTO Exam Bookings -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">QCTO Exam Booking Services</h2>
            <p class="text-white/80 mb-4">
              As an accredited QCTO assessment centre, Village Tech offers a compliant and structured environment for your External Integrated Summative Assessment (EISA) to earn occupational qualifications.
            </p>
            <h3 class="text-lg font-semibold mb-2">Qualifications We Assess</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Computer Technician (NQF Level 5, SAQA ID: 101408)</li>
              <li>Software Developer (NQF Level 5, SAQA ID: 118707)</li>
              <li>Data Science Practitioner (NQF Level 5, SAQA ID: 118708)</li>
              <li>Cybersecurity Analyst (NQF Level 5, SAQA ID: 118986)</li>
              <li>Software Tester (NQF Level 5, SAQA ID: 119438)</li>
            </ul>
            <h3 class="text-lg font-semibold mt-4 mb-2">Why Choose Us?</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Accredited QCTO Centre – Meets national standards.</li>
              <li>Secure Testing Environment – Optimized for focus.</li>
              <li>Qualified Assessors – Fair and guideline-compliant.</li>
              <li>Flexible Scheduling – Fits your timeline.</li>
              <li>Pre-Exam Support – Registration and prep assistance.</li>
            </ul>
            <h3 class="text-lg font-semibold mt-4 mb-2">How to Book</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Confirm eligibility with your training provider.</li>
              <li>Register via your provider for assessment scheduling.</li>
              <li>Select Village Tech as your centre and preferred date.</li>
              <li>Receive your exam confirmation and arrive prepared.</li>
            </ol>
            <p class="mt-4">For inquiries, reach out at <strong>087 135 1313</strong> or <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a>.</p>
          </div>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section class="min-h-screen p-14 flex items-center justify-center">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Information -->
          <div in:fly={{ x: -50, duration: 800 }} class="space-y-8">
            <div class="bg-white/10 rounded-2xl p-6 text-white">
              <h2 class="text-2xl font-bold mb-4">Get in Touch</h2>
              <div class="space-y-4">
                <div class="                                         items-center space-x-4">
                  <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Email Us</p>
                    <p class="text-white/80">Reach out at <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a></p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Call Us</p>
                    <p class="text-white/80">Contact us at <strong>087 135 1313</strong> for immediate assistance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Contact Form -->
          <div in:fly={{ x: 50, duration: 800 }} class="bg-white rounded-2xl p-6 shadow-xl">
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
              <div>
                <label for="organization" class="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  id="organization"
                  bind:value={organization}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="contact" class="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  id="contact"
                  bind:value={contact}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  bind:value={email}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  bind:value={phone}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="bookingType" class="block text-sm font-medium text-gray-700 mb-1">Booking Type</label>
                <select bind:value={bookingType} class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option >Training room hire</option>
                  <option>Pearson Vue testing</option>
                  <option>QCTO Assessment</option>
                </select>
              </div>
              <div>
                <label for="attendees" class="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                <input
                  type="number"
                  id="attendees"
                  bind:value={attendees}
                  min="1"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  id="startDate"
                  type="date"
                  bind:value={startDate}
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <div class="flex space-x-2">
                  <input
                    id="duration"
                    type="number"
                    bind:value={duration}
                    min="1"
                    required
                    class="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <select bind:value={durationUnit} class="w-1/2 px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Hours</option>
                    <option>Days</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  bind:value={message}
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
        </div>
      </section>
    {/if}
  </div>
  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
    :global(.leaflet-container) {
      z-index: 1;
    }
  </style>