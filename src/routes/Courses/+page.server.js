// src/routes/courses/+page.server.js
import { moodleClient } from '$lib/moodle';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';

export const prerender = false;
const cache = new Map();

export async function load() {
    try {
        const cacheKey = `moodle:courses`;
        let allCourses = cache.get(cacheKey); // Get cached courses

        if (!allCourses) {
            // Fetch courses from Moodle API if not cached
            allCourses = await moodleClient.getCourses();
            cache.set(cacheKey, allCourses); // Cache the courses
            setTimeout(() => cache.delete(cacheKey), 60 * 60 * 1000); // Clear cache after 1 hour
        }

        const courseImagesCacheKey = `firebase:courseImages`;
        let courseImagesData = cache.get(courseImagesCacheKey); // Get cached course images

        if (!courseImagesData) {
            // Fetch course images from Firestore if not cached
            const imageCollection = collection(db, "courses");
            const q = query(imageCollection);
            const imageSnapshot = await getDocs(q);
            courseImagesData = imageSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            cache.set(courseImagesCacheKey, courseImagesData); // Cache the course images
            setTimeout(() => cache.delete(courseImagesCacheKey), 60 * 60 * 1000); // Clear cache after 1 hour
        }

        // Combine courses with their images
        const coursesWithImages = allCourses.map(course => {
            const matchingImage = courseImagesData.find(
                image => image.title === course.displayname
            );
            return matchingImage
                ? { ...course, courseimage: matchingImage.imageUrl }
                : course;
        });

        return {
            courses: coursesWithImages,
            streamed: {
                courses: moodleClient.getCourses() // Stream fresh courses as a fallback
            }
        };
    } catch (error) {
        console.error('Failed to load courses:', error);
        return {
            courses: [],
            streamed: {
                courses: Promise.resolve([]) // Return empty array on error
            }
        };
    }
}