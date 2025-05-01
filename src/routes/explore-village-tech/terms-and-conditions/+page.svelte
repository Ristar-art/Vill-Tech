<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = false;
  
    onMount(() => {
      visible = true;
    });
</script>

<svelte:head>
    <title>Terms & Conditions - Village Tech</title>
    <meta name="description" content="Review the Terms & Conditions for using Village Tech's website and services." />
</svelte:head>

<div class="min-h-screen py-16 bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/8.webp');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-slate-50 opacity-90"></div>
        <div class="relative z-10 max-w-2xl px-6">
          <h1 class="text-4xl font-bold">Village Tech Terms & Conditions</h1>
          <p class="text-xl mt-5">
            By accessing and using our website, you agree to comply with these Terms & Conditions. Please read them carefully to understand your rights and responsibilities.
          </p>
        </div>
      </div>

      <!-- Terms & Conditions Section -->
      <section class="p-14 text-white">
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Introduction -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">1. Introduction</h2>
            <p class="text-white/80">
              Welcome to the Village Tech website. By accessing and using our website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.
            </p>
          </div>

          <!-- Use of the Website -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">2. Use of the Website</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li>You may use this website for lawful purposes only.</li>
              <li>Unauthorized use of this website may result in legal action.</li>
              <li>We reserve the right to restrict or terminate access to the website if any misuse is detected.</li>
            </ul>
          </div>

          <!-- Intellectual Property -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">3. Intellectual Property</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li>All content on this website, including text, graphics, logos, images, and software, is the property of Village Tech and is protected by copyright and trademark laws.</li>
              <li>You may not reproduce, distribute, modify, or use any content without prior written consent from Village Tech.</li>
            </ul>
          </div>

          <!-- User Accounts & Security -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">4. User Accounts & Security</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li>If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You agree to notify us immediately if you suspect any unauthorized use of your account.</li>
            </ul>
          </div>

          <!-- Privacy Policy -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">5. Privacy Policy</h2>
            <p class="text-white/80">
              Your use of this website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data in compliance with POPIA.
            </p>
          </div>

          <!-- Limitation of Liability -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li>Village Tech does not guarantee that the website will always be available or error-free.</li>
              <li>We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website.</li>
            </ul>
          </div>

          <!-- Third-Party Links -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">7. Third-Party Links</h2>
            <p class="text-white/80">
              Our website may contain links to external websites. These links are provided for convenience only, and we do not endorse or take responsibility for third-party content.
            </p>
          </div>

          <!-- Governing Law -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">8. Governing Law</h2>
            <p class="text-white/80">
              These Terms & Conditions are governed by the laws of South Africa. Any disputes arising from the use of this website shall be subject to the jurisdiction of South African courts.
            </p>
          </div>

          <!-- Changes to Terms & Conditions -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">9. Changes to Terms & Conditions</h2>
            <p class="text-white/80">
              Village Tech reserves the right to modify these Terms & Conditions at any time. Updates will be posted on this page with an updated effective date.
            </p>
          </div>

          <!-- Contact Information -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">10. Contact Information</h2>
            <p class="text-white/80">
              If you have any questions regarding these Terms & Conditions, please contact us at:
            </p>
            <ul class="list-disc pl-5 space-y-2 mt-4">
              <li>Village Tech</li>
              <li>Email: <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a></li>
              <li>Tel: 087 135 1313</li>
            </ul>
            <p class="text-white/80 mt-4">
              By using our website, you acknowledge that you have read and understood these Terms & Conditions and agree to be bound by them.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="p-14 flex items-center justify-center">
        <div in:fly={{ y: 50, duration: 800 }} class="bg-white/10 rounded-2xl p-6 text-white max-w-md">
          <h2 class="text-2xl font-bold mb-4">Need Assistance?</h2>
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
                <p class="text-white/80">Contact us at <strong>087 135 1313</strong></p>
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