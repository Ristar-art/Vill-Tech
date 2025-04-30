<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = false;
    let openSection = null; // Track which FAQ section is open
  
    function toggleSection(section) {
      openSection = openSection === section ? null : section; // Toggle open/close
    }
  
    onMount(() => {
      visible = true;
    });
  </script>
  
  <svelte:head>
    <title>FAQs - Village Tech</title>
    <meta name="description" content="Find answers to common questions about Village Tech's training programs, payments, and services." />
  </svelte:head>
  
  <div class="min-h-screen bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/_ Village Tech FAQs.webp');"></div>
        <!-- <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-slate-50 opacity-90"></div> -->
        <div class="relative z-10 max-w-2xl px-6">
          <h1 class="text-4xl font-bold">Frequently Asked Questions</h1>
          <p class="text-xl mt-5">
            Got questions? We’ve got answers! Explore the most common inquiries about our training programs, payment options, and services below.
          </p>
        </div>
      </div>
  
      <!-- FAQ Section -->
      <section class="p-14 text-white">
        <div class="max-w-5xl mx-auto space-y-6">
          <!-- General Questions -->
          <div class="bg-white/10 rounded-2xl p-6">
            <button
              on:click={() => toggleSection('general')}
              class="w-full text-left text-2xl font-bold mb-4 focus:outline-none"
            >
              General Questions
              <span class="float-right">{openSection === 'general' ? '−' : '+'}</span>
            </button>
            {#if openSection === 'general'}
              <div in:fade class="space-y-4 text-white/80">
                <p><strong>Q: What courses does Village Tech offer?</strong><br>A: We offer a range of accredited and non-accredited courses, including SETA-accredited courses (End-User Computing, Systems Development, Business Analysis, etc.), trades courses (Health & Safety, Technical Support, Hardware Repairs, etc.), international vendor certifications (CompTIA, Cisco, Microsoft, etc.), and educator training (Technology-enhanced Teaching, ICT Tools for Education, etc.).</p>
              </div>
            {/if}
          </div>
  
          <!-- Enrollment & Registration -->
          <div class="bg-white/10 rounded-2xl p-6">
            <button
              on:click={() => toggleSection('enrollment')}
              class="w-full text-left text-2xl font-bold mb-4 focus:outline-none"
            >
              Enrollment & Registration
              <span class="float-right">{openSection === 'enrollment' ? '−' : '+'}</span>
            </button>
            {#if openSection === 'enrollment'}
              <div in:fade class="space-y-4 text-white/80">
                <p><strong>Q: How do I register for a course?</strong><br>A: You can register online through our website, visit our training centre, or contact our support team for assistance.</p>
                <p><strong>Q: Are there any prerequisites for enrollment?</strong><br>A: Some advanced courses require prior knowledge or experience. Entry-level courses are open to beginners. Specific prerequisites are listed on each course page.</p>
                <p><strong>Q: Can I take courses online or in-person?</strong><br>A: We offer both online and face-to-face training for most courses. Check the course details for availability.</p>
              </div>
            {/if}
          </div>
  
          <!-- Payment & Financing -->
          <div class="bg-white/10 rounded-2xl p-6">
            <button
              on:click={() => toggleSection('payment')}
              class="w-full text-left text-2xl font-bold mb-4 focus:outline-none"
            >
              Payment & Financing
              <span class="float-right">{openSection === 'payment' ? '−' : '+'}</span>
            </button>
            {#if openSection === 'payment'}
              <div in:fade class="space-y-4 text-white/80">
                <p><strong>Q: What payment methods do you accept?</strong><br>A: We accept EFT, bank deposits, credit/debit cards, company sponsorships, and installment plans (for selected courses).</p>
                <p><strong>Q: Do you offer installment plans for course fees?</strong><br>A: Yes! For courses lasting 3 to 12 months, we offer extended payment plans with monthly installments.</p>
                <p><strong>Q: Can my employer or a sponsor pay for my training?</strong><br>A: Yes, we accept company sponsorships. An official sponsorship letter is required for invoicing.</p>
              </div>
            {/if}
          </div>
  
          <!-- Certification & Assessments -->
          <div class="bg-white/10 rounded-2xl p-6">
            <button
              on:click={() => toggleSection('certification')}
              class="w-full text-left text-2xl font-bold mb-4 focus:outline-none"
            >
              Certification & Assessments
              <span class="float-right">{openSection === 'certification' ? '−' : '+'}</span>
            </button>
            {#if openSection === 'certification'}
              <div in:fade class="space-y-4 text-white/80">
                <p><strong>Q: Will I receive a certificate after completing my course?</strong><br>A: Yes! Learners who successfully complete their training and assessments receive a certificate of completion or an accredited qualification.</p>
                <p><strong>Q: How do I book an exam for my course?</strong><br>A: We offer Pearson VUE exam booking services and QCTO external assessments. Contact us for exam scheduling assistance.</p>
                <p><strong>Q: What happens if I fail an exam?</strong><br>A: You may be eligible for a reassessment or retake, depending on the course provider’s policies.</p>
              </div>
            {/if}
          </div>
  
          <!-- Training Room & Facilities -->
          <div class="bg-white/10 rounded-2xl p-6">
            <button
              on:click={() => toggleSection('facilities')}
              class="w-full text-left text-2xl font-bold mb-4 focus:outline-none"
            >
              Training Room & Facilities
              <span class="float-right">{openSection === 'facilities' ? '−' : '+'}</span>
            </button>
            {#if openSection === 'facilities'}
              <div in:fade class="space-y-4 text-white/80">
                <p><strong>Q: Can I book a training room for private sessions or corporate training?</strong><br>A: Yes, our training rooms are available for hire. We provide fully equipped spaces with computers, high-speed internet, and technical support.</p>
                <p><strong>Q: Do you provide course materials?</strong><br>A: Yes, we provide digital and/or printed learning materials for all our courses.</p>
              </div>
            {/if}
          </div>
  
          <!-- Support & Contact -->
          <div class="bg-white/10 rounded-2xl p-6">
            <button
              on:click={() => toggleSection('support')}
              class="w-full text-left text-2xl font-bold mb-4 focus:outline-none"
            >
              Support & Contact
              <span class="float-right">{openSection === 'support' ? '−' : '+'}</span>
            </button>
            {#if openSection === 'support'}
              <div in:fade class="space-y-4 text-white/80">
                <p><strong>Q: Who do I contact for more information?</strong><br>A: Reach us via:<br>📞 Phone: 087 135 1313<br>📧 Email: <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a><br>🌍 Website: <a href="http://www.villagetech.co.za" class="underline">www.villagetech.co.za</a></p>
              </div>
            {/if}
          </div>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section class="p-14 flex items-center justify-center">
        <div in:fly={{ y: 50, duration: 800 }} class="bg-white/10 rounded-2xl p-6 text-white max-w-md">
          <h2 class="text-2xl font-bold mb-4">Still Have Questions?</h2>
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
    button {
      transition: all 0.3s ease;
    }
    button:hover {
      color: #ef4444; /* Red hover effect matching your theme */
    }
  </style>