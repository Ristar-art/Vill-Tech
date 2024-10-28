<!-- scr/routes/[Enroll]/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import * as Select from "$lib/components/ui/select";
	import * as Card from "$lib/components/ui/card";
    import page from '$app/stores'
	
	const courseid = $page.params.Enroll;
	export let data;

	const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

	let isSubmitting = false;
	let formErrors = {};
	let enrollmentResult = null;

	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function validateForm(data) {
        const errors = {};

        if (!data.firstName?.trim()) errors.firstName = "First name is required";
        if (!data.lastName?.trim()) errors.lastName = "Last name is required";
        if (!data.email?.trim()) {
            errors.email = "Email is required";
        } else if (!validateEmail(data.email)) {
            errors.email = "Please enter a valid email";
        }
        if (!data.experienceLevel || !experienceLevels.includes(data.experienceLevel)) {
            errors.experienceLevel = "Please select a valid experience level";
        }

        return errors;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const formErrors = validateForm(data);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        // Submit the form
    }
</script>

<div class="max-w-2xl mx-auto p-4 pt-24">
	<Card.Root class="bg-white bg-opacity-70 pt-6">
		<Card.Header>
			<Card.Title class="text-2xl font-bold">Enroll in {data.courseInfo.name}</Card.Title>
			<Card.Description>
				Take the next step in your tech career. Fill out the form below to enroll in this course.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance={() => {
				return async ({ result }) => {
					isSubmitting = false;
					enrollmentResult = result;
				};
			}} on:submit|preventDefault={handleSubmit} class="space-y-6">
				<input type="hidden" name="courseId" value={data.courseId} />
				<input type="hidden" name="userId" value="1" /> <!-- Replace with actual user ID when available -->

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<Label for="firstName">First Name</Label>
						<Input 
							id="firstName" 
							name="firstName" 
							placeholder="John"
							class={formErrors.firstName ? 'border-red-500' : ''}
						/>
						{#if formErrors.firstName}
							<p class="text-red-500 text-sm">{formErrors.firstName}</p>
						{/if}
					</div>
					<div class="space-y-2">
						<Label for="lastName">Last Name</Label>
						<Input 
							id="lastName" 
							name="lastName" 
							placeholder="Doe"
							class={formErrors.lastName ? 'border-red-500' : ''}
						/>
						{#if formErrors.lastName}
							<p class="text-red-500 text-sm">{formErrors.lastName}</p>
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
						class={formErrors.email ? 'border-red-500' : ''}
					/>
					{#if formErrors.email}
						<p class="text-red-500 text-sm">{formErrors.email}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label>Experience Level</Label>
					<RadioGroup.Root name="experienceLevel">
						{#each experienceLevels as level}
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value={level} id={level} />
								<Label for={level}>{level}</Label>
							</div>
						{/each}
					</RadioGroup.Root>
					{#if formErrors.experienceLevel}
						<p class="text-red-500 text-sm">{formErrors.experienceLevel}</p>
					{/if}
				</div>

				<div class="flex items-center space-x-2">
					<Checkbox id="marketing" name="marketing" />
					<Label for="marketing">
						I agree to receive marketing emails about course updates and promotions
					</Label>
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

			{#if enrollmentResult}
				<div class="mt-4 p-4 rounded-md {enrollmentResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
					{enrollmentResult.success ? enrollmentResult.message : enrollmentResult.error}
				</div>
			{/if}
		</Card.Content>
		<Card.Footer>
			<p class="text-sm text-gray-500">
				By enrolling, you agree to our Terms of Service and Privacy Policy.
			</p>
		</Card.Footer>
	</Card.Root>
</div>