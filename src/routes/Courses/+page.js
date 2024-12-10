// // src/routes/Courses/+page.js
// import { moodleClient } from '$lib/moodle';


// export const prerender = false;

// export async function load() {
//     try {
//         const courses = await moodleClient.getCourses();

//         return {
//             courses: courses || [],
//             streamed: {
//                 courses: moodleClient.getCourses()
//             }
//         };
//     } catch (error) {
//         console.error('Failed to load courses:', error);
//         return {
//             courses: [],
//             streamed: {
//                 courses: Promise.resolve([])
//             }
//         };
//     }
// }