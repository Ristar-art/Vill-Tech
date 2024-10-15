import { moodleClient } from '$lib/moodle';

export async function load() {
    try {
        const courses = await moodleClient.getCourses();
        
        // Ensure courses is an array
        if (!Array.isArray(courses)) {
            console.error('Unexpected response format:', courses);
            return {
                courses: []
            };
        }
        
        return {
            courses
        };
    } catch (e) {
        console.error('Failed to fetch Moodle courses:', e);
        return {
            courses: []
        };
    }
}