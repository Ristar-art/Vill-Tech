<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = false;
  
    onMount(() => {
      visible = true;
    });
  </script>
  
  <svelte:head>
    <title>Payment Methods - Village Tech</title>
    <meta name="description" content="Explore flexible and secure payment options for Village Tech courses and services." />
  </svelte:head>
  
  <div class="min-h-screen py-16 bg-[#21409A]">
    {#if visible}
      <!-- Hero Section -->
      <div class="relative h-[60vh] flex flex-col items-center justify-center pt-20 text-center text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/8.webp');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-slate-50 opacity-90"></div>
        <div class="relative z-10 max-w-2xl px-6">
          <h1 class="text-4xl font-bold">Payment Methods at Village Tech</h1>
          <p class="text-xl mt-5">
            We offer secure and flexible payment options to make enrolling in our training programs simple and accessible for individuals, corporates, and funded learners alike.
          </p>
        </div>
      </div>
  
      <!-- Payment Information Section -->
      <section class="p-14 text-white">
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Accepted Payment Methods -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">Accepted Payment Methods</h2>
            <p class="text-white/80 mb-4">
              At Village Tech, we provide multiple secure payment options to suit your needs. Choose the method that works best for you:
            </p>
            <ul class="space-y-6">
              <li>
                <h3 class="text-lg font-semibold">EFT (Electronic Funds Transfer)</h3>
                <p class="text-white/80">Bank: ABSA<br>Account Name: Village Technologies (Pty) Ltd<br>Branch Code: 632 005<br>Account Number: 4086673469<br>Type: Current<br>Reference: Student ID/Passport Number</p>
              </li>
              <li>
                <h3 class="text-lg font-semibold">Bank Deposit</h3>
                <p class="text-white/80">Make cash deposits at any bank branch. Email proof of payment to <a href="mailto:accounts@villagetech.co.za" class="underline">accounts@villagetech.co.za</a> with your Student ID/Passport Number as the reference.</p>
              </li>
              <li>
                <h3 class="text-lg font-semibold">Credit/Debit Card Payments</h3>
                <p class="text-white/80">Pay securely via our PayFast gateway:<br>1. Enter the amount.<br>2. Click 'Pay Now'.<br>3. Complete payment on the PayFast portal.</p>
              </li>
              <li>
                <h3 class="text-lg font-semibold">Zapper</h3>
                <p class="text-white/80">Fast and easy payments with Zapper:<br>1. Download the Zapper app.<br>2. Tap 'Scan' and scan the QR code.<br>3. Enter your amount and tap 'Pay'.</p>
              </li>
            </ul>
          </div>
  
          <!-- Extended Payment Terms -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">Extended Payment Terms</h2>
            <p class="text-white/80 mb-4">
              We offer flexible installment plans to support your investment in education, tailored to course duration.
            </p>
            <h3 class="text-lg font-semibold mb-2">Payment Plan Options</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>3-Month Courses – Up to 4 monthly installments</li>
              <li>6-Month Courses – Up to 7 monthly installments</li>
              <li>12-Month Courses – Up to 13 monthly installments</li>
            </ul>
            <p class="text-white/80 mt-2">A minimum deposit is required before training begins, with the balance split into equal monthly payments. *Note: International vendor certification plans align with course duration, with no further extensions.</p>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Requirements</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Sign a payment agreement.</li>
              <li>Pay the first installment (deposit) before the course starts.</li>
              <li>Make monthly payments by the agreed due date.</li>
            </ul>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Late Payments & Penalties</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>5% late fee on overdue payments.</li>
              <li>Two missed payments may result in suspension.</li>
              <li>Certificates issued only after full payment.</li>
            </ul>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Eligibility</h3>
            <p class="text-white/80">Available for self-funded or corporate-sponsored learners. Not applicable to SETA/grant-funded programs. Subject to financial assessment if needed.</p>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">How to Apply</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Select your course and request a payment plan.</li>
              <li>Pay the initial deposit.</li>
              <li>Sign the payment agreement.</li>
              <li>Make timely monthly payments.</li>
            </ol>
            <p class="mt-4">Contact us at <strong>087 135 1313</strong> or <a href="mailto:info@villagetech.co.za" class="underline">info@villagetech.co.za</a> for details.</p>
          </div>
  
          <!-- Payment Terms -->
          <div class="bg-white/10 rounded-2xl p-6">
            <h2 class="text-2xl font-bold mb-4">Payment Terms</h2>
            <p class="text-white/80 mb-4">
              Our transparent payment terms ensure a smooth enrollment process for all learners and sponsors.
            </p>
            <h3 class="text-lg font-semibold mb-2">Payment Requirements</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Full payment or an approved plan required before the course starts.</li>
              <li>First installment due before training begins for installment plans.</li>
            </ul>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Accepted Methods</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>EFT, Bank Deposit, Credit/Debit Cards</li>
              <li>Company Sponsorships & Invoicing (with documentation)</li>
              <li>Installment Plans (for eligible courses)</li>
              <li>SETA/Grant-Funded Programs (per funder terms)</li>
            </ul>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Refund & Cancellation Policy</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>7+ days before start: Full refund minus admin fee.</li>
              <li>Less than 7 days: 50% refund.</li>
              <li>After training starts: No refunds.</li>
              <li>Village Tech cancellation: Full refund or reschedule offered.</li>
            </ul>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Late Payments & Non-Payment</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Late payments may lead to suspension.</li>
              <li>Non-payment of installments may result in de-registration.</li>
              <li>5% penalty on overdue invoices.</li>
            </ul>
            
            <h3 class="text-lg font-semibold mt-4 mb-2">Certification</h3>
            <p class="text-white/80">Certificates issued only after full payment and completion of required sessions/assessments.</p>
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