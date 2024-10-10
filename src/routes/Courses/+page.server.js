//src/routes/Courses/+page.server.js
import { moodleClient } from '$lib/moodle';

export async function load() {
    try {
    const courses = await moodleClient.getCourses();
    return {
        courses
        };
         } catch (e) {
        console.error('Failed to fetch Moodle courses:', e);
        // Return null instead of throwing an error to handle it gracefully in the component
        return {
            courses: null
        };
    }
}