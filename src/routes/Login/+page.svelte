<script>
    import { fade, fly } from 'svelte/transition';
    
    let visible = false;
    let formData = {
      email: '',
      password: '',
      rememberMe: false
    };
    
    let isSubmitting = false;
    let submitStatus = null;
    let errors = {};
    
    function validateForm() {
      errors = {};
      
      if (!formData.email.includes('@')) {
        errors.email = 'Please enter a valid email';
      }
      if (formData.password.length < 1) {
        errors.password = 'Password is required';
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
      }, 3000);
    };
    
    import { onMount } from 'svelte';
    onMount(() => {
      visible = true;
    });
  </script>
  
  <svelte:head>
    <title>Login - Village Tech</title>
    <meta name="description" content="Login to your Village Tech Training Solutions account" />
  </svelte:head>
  
  {#if visible}
    <div class="min-h-screen bg-[#21409A] flex items-center justify-center px-4 py-12" in:fade={{ duration: 1000 }}>
      <div class="w-full max-w-md bg-white rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl" in:fly={{ y: 50, duration: 800 }}>
        <div class="space-y-6">
          <!-- Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold">
              <span class="text-blue-600">Welcome</span>
              <span class="text-red-500">Back</span>
            </h1>
            <p class="text-gray-500">
              Login to access your account
            </p>
          </div>
  
          <!-- Form -->
          <form on:submit={handleSubmit} class="space-y-4">
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
              <div class="flex justify-between items-center mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="/forgot-password" class="text-sm text-red-500 hover:text-red-600">
                  Forgot password?
                </a>
              </div>
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
  
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember"
                bind:checked={formData.rememberMe}
                class="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
  
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full bg-red-500 text-white py-2 px-6 rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                Logging in...
              {:else}
                Login
              {/if}
            </button>
  
            {#if submitStatus === 'success'}
              <div class="text-green-600 text-center flex items-center justify-center" in:fade>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Login successful!
              </div>
            {/if}
  
            <div class="text-center space-y-2">
              <p class="text-sm text-gray-500">
                Don't have an account?
                <a href="/signup" class="text-red-500 hover:text-red-600">
                  Sign up
                </a>
              </p>
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div class="flex space-x-4 justify-center mt-4">
                <!-- Social login buttons -->
                <button
                  type="button"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </button>
              </div>
            </div>
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