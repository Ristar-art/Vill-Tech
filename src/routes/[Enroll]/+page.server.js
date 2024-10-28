// src/routes/[Enroll]/+page.server
import { moodleClient } from '$lib/moodle';
import { error, redirect } from '@sveltejs/kit';

export async function load({params}) {
  const courseId = parseInt(params.Enroll);;

  if (!courseId) {
    throw error(400, 'Course ID is required');
  }

  try {
    const enrolledUsers = await moodleClient.getEnrolledUsers(courseId);
    const courseInfo = await moodleClient.getCourseModule(courseId);
    
    return {
      courseId,
      enrolledUsers,
      courseInfo
    };
  } catch (e) {
    console.error('Error fetching course data:', e);
    throw error(500, 'Failed to fetch course data');
  }
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const courseId = formData.get('courseId');
    const userId = formData.get('userId');

    if (!courseId || !userId) {
      return { success: false, error: 'Course ID and User ID are required' };
    }

    try {
      // Here you would typically call a Moodle API to enroll the user
      // For this example, we'll simulate the enrollment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true, message: 'Enrollment successful' };
    } catch (e) {
      console.error('Error enrolling user:', e);
      return { success: false, error: 'Failed to enroll user' };
    }
  }
};