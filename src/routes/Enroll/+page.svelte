<script>
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import * as Select from "$lib/components/ui/select";
	import * as Card from "$lib/components/ui/card";

	const courses = [
		{ id: 1, name: "AI & Machine Learning Fundamentals", price: 599 },
		{ id: 2, name: "Full-Stack Web Development", price: 699 },
		{ id: 3, name: "Data Science Bootcamp", price: 799 },
		{ id: 4, name: "Cybersecurity Essentials", price: 549 },
	];

	const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

	let isSubmitting = false;
	let formErrors = {};

	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	async function handleSubmit(event) {
		formErrors = {};
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		
		// Validation
		if (!data.firstName?.trim()) formErrors.firstName = "First name is required";
		if (!data.lastName?.trim()) formErrors.lastName = "Last name is required";
		if (!data.email?.trim()) {
			formErrors.email = "Email is required";
		} else if (!validateEmail(data.email)) {
			formErrors.email = "Please enter a valid email";
		}
		if (!data.course) formErrors.course = "Please select a course";
		if (!data.experienceLevel) formErrors.experienceLevel = "Please select your experience level";

		if (Object.keys(formErrors).length > 0) {
			return;
		}

		isSubmitting = true;
		
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			alert("Form submitted successfully!");
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("An error occurred while submitting the form. Please try again.");
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl font-bold">Enroll in a Tech Course</Card.Title>
			<Card.Description>
				Take the next step in your tech career. Fill out the form below to enroll in one of our premier courses.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
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
							<p class="text-red-500 text-sm flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="8" x2="12" y2="12"></line>
									<line x1="12" y1="16" x2="12.01" y2="16"></line>
								</svg>
								{formErrors.firstName}
							</p>
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
							<p class="text-red-500 text-sm flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="8" x2="12" y2="12"></line>
									<line x1="12" y1="16" x2="12.01" y2="16"></line>
								</svg>
								{formErrors.lastName}
							</p>
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
						<p class="text-red-500 text-sm flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							{formErrors.email}
						</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label>Select Course</Label>
					<Select.Root name="course">
						<Select.Trigger class={formErrors.course ? 'border-red-500' : ''}>
							<Select.Value placeholder="Choose a course" />
						</Select.Trigger>
						<Select.Content>
							{#each courses as course}
								<Select.Item value={course.id.toString()}>
									{course.name} - ${course.price}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					{#if formErrors.course}
						<p class="text-red-500 text-sm flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							{formErrors.course}
						</p>
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
						<p class="text-red-500 text-sm flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							{formErrors.experienceLevel}
						</p>
					{/if}
				</div>

				<div class="flex items-center space-x-2">
					<Checkbox id="marketing" name="marketing" />
					<Label for="marketing">
						I agree to receive marketing emails about course updates and promotions
					</Label>
				</div>

				<div class="pt-4">
					<Button type="submit" class="w-full" disabled={isSubmitting}>
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
		</Card.Content>
		<Card.Footer>
			<p class="text-sm text-gray-500">
				By enrolling, you agree to our Terms of Service and Privacy Policy.
			</p>
		</Card.Footer>
	</Card.Root>
</div>