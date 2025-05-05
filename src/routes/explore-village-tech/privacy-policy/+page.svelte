<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = false;
  
    onMount(() => {
      visible = true;
    });
</script>

<svelte:head>
    <title>Privacy Policy - Village Tech</title>
    <meta name="description" content="Read Village Tech's Privacy Policy to understand how we collect, use, and protect your personal information." />
</svelte:head>

<div class="min-h-screen py-16 bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/50.webp');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-slate-50 opacity-90"></div>
        <div class="relative z-10 max-w-2xl px-6">
          <h1 class="text-4xl font-bold">Village Tech Privacy Policy</h1>
          <p class="text-xl mt-5">
            We are committed to protecting your privacy. Learn how we collect, use, store, and safeguard your personal information in compliance with data protection laws.
          </p>
        </div>
      </div>

      <!-- Privacy Policy Section -->
      <section class="p-14 text-white">
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Introduction -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">1. Introduction</h2>
            <p class="text-white/80">
              Village Tech ("we," "us," or "our") is committed to protecting the privacy of our website visitors, clients, and partners. This Privacy Policy outlines how we collect, use, store, and protect your personal information in compliance with the Protection of Personal Information Act (POPIA) and other applicable data protection laws.
            </p>
          </div>

          <!-- Information We Collect -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p class="text-white/80 mb-4">
              We may collect the following personal information from users:
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Name, surname, and contact details (email, phone number, address)</li>
              <li>Company/organization details</li>
              <li>User preferences and interactions with our website</li>
              <li>Any other information voluntarily provided by users</li>
            </ul>
          </div>

          <!-- How We Use Your Information -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p class="text-white/80 mb-4">
              Your personal information may be used for the following purposes:
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Providing our services and responding to inquiries</li>
              <li>Improving our website, products, and services</li>
              <li>Communicating important updates, promotions, and offers</li>
              <li>Conducting internal analytics and research</li>
              <li>Fulfilling legal or regulatory requirements</li>
              <li>Marketing and sales efforts related to Village Tech and its affiliated companies</li>
            </ul>
          </div>

          <!-- Sharing of Information -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">4. Sharing of Information</h2>
            <p class="text-white/80 mb-4">
              We do not sell or rent personal information to third parties. However, we may share your information with:
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Our affiliated companies for marketing and business development purposes</li>
              <li>Service providers who assist us in business operations, under strict confidentiality agreements</li>
              <li>Regulatory authorities when required by law</li>
            </ul>
          </div>

          <!-- Data Protection and Security -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">5. Data Protection and Security</h2>
            <p class="text-white/80">
              We implement appropriate technical and organizational measures to protect personal data from unauthorized access, loss, or disclosure. However, while we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </div>

          <!-- Your Rights Under POPIA -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">6. Your Rights Under POPIA</h2>
            <p class="text-white/80 mb-4">
              As per the Protection of Personal Information Act, you have the right to:
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Access, correct, or update your personal information</li>
              <li>Object to the processing of your data for direct marketing purposes</li>
              <li>Request the deletion of your personal information where applicable</li>
              <li>Lodge a complaint with the Information Regulator if you believe your data rights are being violated</li>
            </ul>
          </div>

          <!-- Cookies and Tracking Technologies -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">7. Cookies and Tracking Technologies</h2>
            <p class="text-white/80">
              Our website may use cookies to enhance user experience. By continuing to use our site, you consent to the use of cookies. You may adjust your browser settings to disable cookies, but some functionalities may be affected.
            </p>
          </div>

          <!-- Third-Party Links -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">8. Third-Party Links</h2>
            <p class="text-white/80">
              Our website may contain links to external websites. We are not responsible for the privacy practices of third-party sites and encourage users to review their privacy policies.
            </p>
          </div>

          <!-- Changes to This Policy -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p class="text-white/80">
              Village Tech reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with the updated effective date.
            </p>
          </div>

          <!-- Contact Us -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p class="text-white/80">
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
            </p>
            <ul class="list-disc pl-5 space-y-2 mt-4">
              <li>Village Tech</li>
              <li>Email: <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a></li>
              <li>Tel: 087 135 1313</li>
              <li>Address: 85 Main Street, Groundfloor Nedbank Building, Marshalltown, Johannesburg</li>
            </ul>
            <p class="text-white/80 mt-4">
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to the terms outlined above.
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