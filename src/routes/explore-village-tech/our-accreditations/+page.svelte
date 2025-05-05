<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = false;
  
    onMount(() => {
      visible = true;
    });
  </script>
  
  <svelte:head>
    <title>Our Accreditations - Village Tech</title>
    <meta name="description" content="Discover Village Tech's prestigious accreditations, ensuring high-quality, industry-recognized training and certifications." />
  </svelte:head>
  
  <div class="min-h-screen py-16 bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/43.webp');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-slate-50 opacity-90"></div>
        <div class="relative z-10 max-w-2xl px-6">
          <h1 class="text-4xl font-bold">Our Accreditations</h1>
          <p class="text-xl mt-5">
            At Village Tech, we are proud to be accredited by leading industry bodies, ensuring our training programs meet the highest standards and open doors to global career opportunities.
          </p>
        </div>
      </div>
  
      <!-- Accreditations Section -->
      <section class="p-14 text-white">
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Introduction -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">Committed to Excellence</h2>
            <p class="text-white/80">
              Village Tech delivers high-quality training and development programs that are recognized both locally and globally. Our accreditations from prestigious organizations ensure that our qualifications equip learners with the skills and credentials needed to succeed in their industries.
            </p>
          </div>
  
          <!-- EISA Centre (QCTO) -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">External Integrated Summative Assessment (EISA) Centre</h2>
            <p class="text-white/80">
              Village Tech is an accredited QCTO EISA facility, providing external assessments for learners completing Occupational Qualifications. Our centre ensures objective and reliable evaluations through written exams, practical assessments, and portfolios of evidence. We prepare learners to meet industry competency standards, paving the way for successful careers.
            </p>
          </div>
  
          <!-- CISCO -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">CISCO</h2>
            <p class="text-white/80">
              As a Cisco-accredited institution, we offer cutting-edge certifications in networking and cybersecurity. Our programs equip learners with the technical skills to excel in the ever-evolving IT landscape, from foundational networking to advanced security expertise.
            </p>
          </div>
  
          <!-- COMPTIA -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">COMPTIA</h2>
            <p class="text-white/80">
              Through our partnership with CompTIA, we provide globally recognized certifications in IT support, networking, and security. These credentials offer learners both foundational knowledge and advanced technical skills, making them highly competitive in the IT industry.
            </p>
          </div>
  
          <!-- MICT SETA -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">MICT SETA</h2>
            <p class="text-white/80">
              Accredited by the Media, Information and Communication Technologies Sector Education and Training Authority (MICT SETA), we deliver ICT training that meets industry demands. Our programs help learners develop essential technical skills for a digital world.
            </p>
          </div>
  
          <!-- PEARSON VUE -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">PEARSON VUE</h2>
            <p class="text-white/80">
              As a Pearson VUE partner, Village Tech offers a secure and reliable testing platform for professional certification exams. Learners can earn recognized credentials across various fields, supported by our state-of-the-art facilities and professional proctoring.
            </p>
          </div>
  
          <!-- QCTO -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">QCTO (Quality Council for Trades and Occupations)</h2>
            <p class="text-white/80">
              Our programs align with QCTO’s national standards for skills development in trades and occupations. We offer accredited qualifications and part-qualifications that enhance employability and support career growth in diverse sectors.
            </p>
          </div>
  
          <!-- SACE -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">SACE (South African Council for Educators)</h2>
            <p class="text-white/80">
              Accredited by SACE, we provide endorsed training programs for the professional development of educators across South Africa. Our courses empower teachers with the tools and knowledge to excel in their roles.
            </p>
          </div>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section class="p-14 flex items-center justify-center">
        <div in:fly={{ y: 50, duration: 800 }} class="bg-white/10 rounded-2xl p-6 text-white max-w-md">
          <h2 class="text-2xl font-bold mb-4">Learn More</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p class="font-medium">Email Us</p>
                <p class="text-white/80">Contact us at <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a></p>
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
                <p class="text-white/80">Reach out at <strong>087 135 1313</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    {/if}
  </div>
  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
  </style>