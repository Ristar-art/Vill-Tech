<script>
  import { fade, fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  let formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
 

  let isSubmitting = false;
  let errors = {};
  let serverError = "";

  function validateForm() {
    errors = {};

    if (!formData.firstName?.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName?.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
        formData.password,
      )
    ) {
      errors.password =
        "Password must contain uppercase, lowercase, number and special character";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return Object.keys(errors).length === 0;
  }
</script>

<svelte:head>
  <title>Sign Up - Village Tech</title>
  <meta
    name="description"
    content="Create your account with Village Tech Training Solutions"
  />
</svelte:head>

<div
  class="min-h-screen bg-[#21409A] flex items-center justify-center px-4 py-24"
  in:fade={{ duration: 1000 }}
>
  <div
    class="w-full max-w-md bg-white rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl"
    in:fly={{ y: 50, duration: 800 }}
  >
    <div class="space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold">
          <span class="text-blue-600">Create</span>
          <span class="text-red-500">Account</span>
        </h1>
        <p class="text-gray-500">Sign up to start your journey with us</p>
      </div>

      <!-- Form -->
      <form class="space-y-4" method="POST" use:enhance={({ formData }) => {
          isSubmitting = true;
          serverError = '';

          return async ({ result, update }) => {
              isSubmitting = false;
              if (result.type === 'failure') {
                  serverError = result.data?.error || 'An unexpected error occurred';
                  update();
              } else if (result.status === 429) {
                  const retryAfter = result.data.retryAfter;
                  serverError = `Too many attempts. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`;
              } else if (result.type === 'success') {
                  alert('Account created successfully!');
                  goto('/');
              }
          };
      }} on:submit|preventDefault={(e) => {
          if (!validateForm()) {
              e.preventDefault();
              isSubmitting = false;
              return;
          }
      }}>

        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            bind:value={formData.firstName}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="John"
          />
          {#if errors.firstName}
            <p class="mt-1 text-sm text-red-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {errors.firstName}
            </p>
          {/if}
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            bind:value={formData.lastName}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Doe"
          />
          {#if errors.lastName}
            <p class="mt-1 text-sm text-red-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {errors.lastName}
            </p>
          {/if}
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
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
            name="password"
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
            name="confirmPassword"
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

        {#if serverError}
          <p class="mt-1 text-sm text-red-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {serverError}
          </p>
        {/if}

        <button
          type="submit"
          disabled={isSubmitting}
          class="w-full bg-red-500 text-white py-2 px-6 rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isSubmitting}
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            Signing up...
          {:else}
            Sign up
          {/if}
        </button>

        <p class="text-center text-sm text-gray-500">
          Already have an account?
          <a href="https://villagetech.moodlecloud.com/login/index.php?loginredirect=1
" class:active={$page.url.pathname === "https://villagetech.moodlecloud.com/login/index.php?loginredirect=1"} class="text-red-500 hover:text-red-600">
            Sign in
          </a>
        </p>
      </form>
    </div>
  </div>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>