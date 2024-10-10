// src/routes/courses/[details]/+page.server.js
import { error } from '@sveltejs/kit';
import { moodleClient } from '$lib/moodle';

export async function load({ params }) {
    try {
        const courseId = parseInt(params.details); // Changed from params.id to params.details

        if (isNaN(courseId)) {
            throw error(400, 'Invalid course ID');
        }

        // First, fetch all courses to verify the ID exists
        const allCourses = await moodleClient.getCourses();
        
        // Find the course in the list
        const course = allCourses.find(c => c.id === courseId);
        
        if (!course) {
            throw error(404, `Course with ID ${courseId} not found`);
        }

        // Fetch course contents
        const courseContents = await moodleClient.getCourseContents(courseId);
        
        return {
            course,
            courseContents
        };
    } catch (e) {
        console.error('Failed to fetch course data:', e);
        
        // If it's already a SvelteKit error, re-throw it
        if (e.status) throw e;
        
        // Otherwise, throw a generic error
        throw error(500, 'Failed to load course data');
    }
}