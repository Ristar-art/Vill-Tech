<!-- src/routes/[Enroll]/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { page } from '$app/stores';
	import { auth } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';

	export let data;
	export let form;
	let isSubmitting = false;
	let user = null;
	$: console.log("user is", user);

	onMount(() => {
		// Fetch the current user from Firebase
		auth.onAuthStateChanged(currentUser => {
			if (currentUser) {
				user = currentUser;			
			}
		});
	});
</script>

<div class="max-w-2xl mx-auto p-4 pt-24">
	{#if data}
	<Card.Root class="bg-white bg-opacity-70 pt-6">
		<Card.Header>
			<Card.Title class="text-2xl font-bold">Enroll in {data.courseInfo.fullname}</Card.Title>
			<Card.Description>
				Take the next step in your tech career. Fill out the form below to enroll in this course.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form 
				method="POST" 
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						await update();
						isSubmitting = false;
					};
				}} 
				class="space-y-6"
			>
				<input type="hidden" name="courseId" value={data.courseId} />
				<input type="hidden" name="userId" value={user?.uid} />

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<Label for="firstName">First Name</Label>
						<Input 
							id="firstName" 
							name="firstName" 
							placeholder="John"
							class={form?.errors?.firstName ? 'border-red-500' : ''}
							value={form?.data?.firstName ?? ''}
						/>
						{#if form?.errors?.firstName}
							<p class="text-red-500 text-sm">{form.errors.firstName}</p>
						{/if}
					</div>
					<div class="space-y-2">
						<Label for="lastName">Last Name</Label>
						<Input 
							id="lastName" 
							name="lastName" 
							placeholder="Doe"
							class={form?.errors?.lastName ? 'border-red-500' : ''}
							value={form?.data?.lastName ?? ''}
						/>
						{#if form?.errors?.lastName}
							<p class="text-red-500 text-sm">{form.errors.lastName}</p>
						{/if}
					</div>
				</div>

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input 
						id="email" 
						name="email" 
						type="email" 
						placeholder="john.doe@example.com"
						class={form?.errors?.email ? 'border-red-500' : ''}
						value={form?.data?.email ?? ''}
					/>
					{#if form?.errors?.email}
						<p class="text-red-500 text-sm">{form.errors.email}</p>
					{/if}
				</div>

				<div class="pt-4">
					<Button type="submit" class="w-full bg-[#21409a]" disabled={isSubmitting}>
						{#if isSubmitting}
							<svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
							</svg>
							Enrolling...
						{:else}
							Enroll Now
						{/if}
					</Button>
				</div>
			</form>

			{#if form?.success}
				<div class="mt-4 p-4 rounded-md bg-green-100 text-green-700">
					{form.message}
				</div>
			{:else if form?.error}
				<div class="mt-4 p-4 rounded-md bg-red-100 text-red-700">
					{form.error}
				</div>
			{/if}
		</Card.Content>
		<Card.Footer>
			<p class="text-sm text-gray-500">
				By enrolling, you agree to our Terms of Service and Privacy Policy.
			</p>
		</Card.Footer>
	</Card.Root>
	{:else}
		<h1 class="text-2xl font-bold">Loading...</h1>
    {/if}
</div>