// src/routes/courses/+page.server.js
import { moodleClient } from '$lib/moodle';
import { getCachedData, setCachedData } from '$lib/server/redis';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';

export const prerender = false;

export async function load() {
    try {
        const cacheKey = `moodle:courses`;
        let allCourses = await getCachedData(cacheKey);

        if (!allCourses) {
            allCourses = await moodleClient.getCourses();
            await setCachedData(cacheKey, JSON.stringify(allCourses), { ex: 60 * 60 }); // Cache for 1 hour
        } else {
            allCourses = JSON.parse(allCourses);
        }

        const courseImagesCacheKey = `firebase:courseImages`;
        let courseImagesData = await getCachedData(courseImagesCacheKey);

        if (!courseImagesData) {
            const imageCollection = collection(db, "courses");
            const q = query(imageCollection);
            const imageSnapshot = await getDocs(q);
            courseImagesData = imageSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            await setCachedData(courseImagesCacheKey, JSON.stringify(courseImagesData), { ex: 60 * 60 }); // Cache for 1 hour
        } else {
            courseImagesData = JSON.parse(courseImagesData);
        }

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
                courses: moodleClient.getCourses()
            }
        };
    } catch (error) {
        console.error('Failed to load courses:', error);
        return {
            courses: [],
            streamed: {
                courses: Promise.resolve([])
            }
        };
    }
}