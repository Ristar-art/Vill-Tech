<script>
    import { fade, fly } from 'svelte/transition';
    import { moodleClient } from '$lib/moodle'; // Import the Moodle client

    let visible = false;
    let formData = {
        username: '',
        email: ''
    };
    let loading = false;
    let error = null;
    let isSubmitting = false;
    let submitStatus = null;
    let errors = {};

    function validateForm() {
        errors = {};
        
        if (!formData.username) {
            errors.username = 'Username is required';
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
        try {
            loading = true;
            error = '';

            // Request password reset
            const response = await moodleClient.requestPasswordReset(formData.username, formData.email);
            if (response.status === 'emailpasswordconfirmmaybesent') {
                submitStatus = 'success';
                formData = { username: '', email: '' }; // Clear form data
            } else {
                error = response.notice || 'Failed to request password reset';
            }
        } catch (err) {
            console.error(err);
            error = err instanceof Error ? err.message : 'An error occurred during password reset request';
        } finally {
            loading = false;
            isSubmitting = false;
        }
    };

    import { onMount } from 'svelte';
    onMount(() => {
        visible = true;
    });
</script>

<svelte:head>
    <title>Reset Password - Village Tech</title>
    <meta name="description" content="Reset your Village Tech Training Solutions account password" />
</svelte:head>

{#if visible}
    <div class="min-h-screen bg-[#21409A] flex items-center justify-center px-4 py-12" in:fade={{ duration: 1000 }}>
        <div class="w-full max-w-md bg-white rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl" in:fly={{ y: 50, duration: 800 }}>
            <div class="space-y-6">
                <!-- Header -->
                <div class="text-center space-y-2">
                    <h1 class="text-3xl font-bold">
                        <span class="text-blue-600">Reset</span>
                        <span class="text-red-500">Password</span>
                    </h1>
                    <p class="text-gray-500">
                        Enter your username and email to reset your password
                    </p>
                </div>

                <!-- Form -->
                <form on:submit={handleSubmit} class="space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            bind:value={formData.username}
                            required
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent {errors.username ? 'border-red-500' : 'border-gray-300'}"
                            placeholder="Username"
                        />
                        {#if errors.username}
                            <p class="mt-1 text-sm text-red-500 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                                {errors.username}
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        class="w-full bg-red-500 text-white py-2 px-6 rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {#if isSubmitting}
                            Resetting...
                        {:else}
                            Reset Password
                        {/if}
                    </button>

                    {#if submitStatus === 'success'}
                        <div class="text-green-600 text-center flex items-center justify-center" in:fade>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            Password reset request successful! Check your email.
                        </div>
                    {/if}

                    {#if error}
                        <div class="text-red-600 text-center flex items-center justify-center" in:fade>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    {/if}

                    <div class="text-center space-y-2">
                        <p class="text-sm text-gray-500">
                            Remember your password?
                            <a href="/Login" class="text-red-500 hover:text-red-600">
                                Login
                            </a>
                        </p>
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