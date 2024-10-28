<script>
    import { fade, fly } from 'svelte/transition';
    
    let visible = false;
    let formData = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    
    let isSubmitting = false;
    let submitStatus = null;
    let errors = {};
    
    function validateForm() {
      errors = {};
      
      if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.email.includes('@')) {
        errors.email = 'Please enter a valid email';
      }
      
      return Object.keys(errors).length === 0;
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      
      isSubmitting = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      submitStatus = 'success';
      isSubmitting = false;
      
      // Reset form after success
      setTimeout(() => {
        submitStatus = null;
        formData = {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      }, 3000);
    };
    
    import { onMount } from 'svelte';
    onMount(() => {
      visible = true;
    });
  </script>
  
  <svelte:head>
    <title>Sign Up - Village Tech</title>
    <meta name="description" content="Create your account with Village Tech Training Solutions" />
  </svelte:head>
  
  {#if visible}
    <div class="min-h-screen bg-[#21409A] flex items-center justify-center px-4 py-12" in:fade={{ duration: 1000 }}>
      <div class="w-full max-w-md bg-white rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl" in:fly={{ y: 50, duration: 800 }}>
        <div class="space-y-6">
          <!-- Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold">
              <span class="text-blue-600">Create</span>
              <span class="text-red-500">Account</span>
            </h1>
            <p class="text-gray-500">
              Sign up to start your journey with us
            </p>
          </div>
  
          <!-- Form -->
          <form on:submit={handleSubmit} class="space-y-4">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                bind:value={formData.fullName}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
  
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent {errors.email ? 'border-red-500' : 'border-gray-300'}"
                placeholder="you@example.com"
              />
              {#if errors.email}
                <p class="mt-1 text-sm text-red-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              {/if}
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                bind:value={formData.password}
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent {errors.password ? 'border-red-500' : 'border-gray-300'}"
                placeholder="••••••••"
              />
              {#if errors.password}
                <p class="mt-1 text-sm text-red-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              {/if}
            </div>
  
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                bind:value={formData.confirmPassword}
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent {errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}"
                placeholder="••••••••"
              />
              {#if errors.confirmPassword}
                <p class="mt-1 text-sm text-red-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {errors.confirmPassword}
                </p>
              {/if}
            </div>
  
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full bg-red-500 text-white py-2 px-6 rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                Creating Account...
              {:else}
                Sign Up
              {/if}
            </button>
  
            {#if submitStatus === 'success'}
              <div class="text-green-600 text-center flex items-center justify-center" in:fade>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Account created successfully!
              </div>
            {/if}
  
            <p class="text-center text-sm text-gray-500">
              Already have an account?
              <a href="/login" class="text-red-500 hover:text-red-600">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
  </style>