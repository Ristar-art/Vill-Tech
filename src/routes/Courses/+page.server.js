import { moodleClient } from '$lib/moodle';

export const ssr = true;
export const csr = true;
export const prerender = false;

export async function load() {
    try {
        // First get all courses
        const courses = await moodleClient.getCourses();
        
        // Map through courses to get their IDs and fetch details for each
        const courseDetails = await Promise.all(
            courses.map(async course => {
                const details = await moodleClient.getCourseByField('id', course.id.toString());
                return {
                    ...course,
                    ...details
                };
            })
        );

        console.log('courseDetails is ', courseDetails);
        return {
            courses: courses || [],
            courseDetails: courseDetails || [],
            streamed: {
                courses: moodleClient.getCourses()
            }
        };
    } catch (error) {
        console.error('Failed to load courses:', error);
        return {
            courses: [],
            courseDetails: [],
            streamed: {
                courses: Promise.resolve([])
            }
        };
    }
}