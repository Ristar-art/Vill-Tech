// import { moodleClient } from '$lib/moodle';
// import { error, fail } from '@sveltejs/kit';
// import { getDoc, doc } from 'firebase/firestore';
// import { db } from '$lib/firebase/firebase';
// import * as crypto from 'crypto';

// function stringToIntegerSumWithSalt(str, salt) {
//   let sum = 0;
//   for (let i = 0; i < str.length; i++) {
//     sum += str.charCodeAt(i);
//   }
//   for (let i = 0; i < salt.length; i++) {
//     sum += salt.charCodeAt(i);
//   }
//   return sum;
// }

// function hashToInteger(hash) {
//   const first8Chars = hash.slice(0, 8);
//   return parseInt(first8Chars, 16);
// }

// export async function load({ params }) {
//   const courseId = parseInt(params.Enroll, 10);

//   if (!courseId) {
//     throw error(400, {
//       message: 'Course ID is required',
//       code: 'INVALID_COURSE_ID'
//     });
//   }

//   try {
//     const allCourses = await moodleClient.getCourses();
//     const courseInfo = allCourses.find(c => c.id === courseId);

//     if (!courseInfo) {
//       throw error(404, {
//         message: 'Course not found',
//         code: 'COURSE_NOT_FOUND'
//       });
//     }

//     return {
//       courseId,
//       courseInfo
//     };
//   } catch (e) {
//     console.error('Error fetching course data:', e);

//     if (e instanceof Response) throw e;

//     if (e.message?.includes('permissions')) {
//       throw error(403, {
//         message: 'You do not have permission to view this course',
//         code: 'PERMISSION_DENIED'
//       });
//     }

//     throw error(500, {
//       message: 'Failed to fetch course data',
//       code: 'FETCH_ERROR'
//     });
//   }
// }

// async function fetchUserDoc(userId) {
//   const maxRetries = 3;
//   let attempts = 0;

//   while (attempts < maxRetries) {
//     try {
//       const userDoc = await getDoc(doc(db, "users", userId));
//       if (!userDoc.exists()) {
//         throw new Error('User not found');
//       }
//       return userDoc;
//     } catch (e) {
//       attempts++;
//       console.error(`Attempt ${attempts} failed:`, e.message);
//       if (attempts >= maxRetries) throw e;
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }
//   }
// }

// export const actions = {
//   default: async ({ request }) => {
//     const formData = await request.formData();
//     const data = {
//       courseId: formData.get('courseId'),
//       userId: formData.get('userId'),
//       firstName: formData.get('firstName')?.trim(),
//       lastName: formData.get('lastName')?.trim(),
//       email: formData.get('email')?.trim()
//     };

//     const errors = {};
//     if (!data.firstName) errors.firstName = "First name is required";
//     if (!data.lastName) errors.lastName = "Last name is required";
//     if (!data.email) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//       errors.email = "Please enter a valid email";
//     }

//     if (Object.keys(errors).length > 0) {
//       return fail(400, {
//         errors,
//         data,
//         code: 'VALIDATION_ERROR'
//       });
//     }

//     try {
//       console.log('Fetching user document for userId:', data.userId);
//       const userDoc = await fetchUserDoc(data.userId);
//       if (!userDoc.exists()) {
//         return fail(404, {
//           error: 'User not found',
//           code: 'USER_NOT_FOUND',
//           data
//         });
//       }
//       console.log('User document:', userDoc.data());
//       const uniqueSalt = userDoc.data().uniqueSalt;
//       // const moodleUserId = stringToIntegerSumWithSalt(data.userId, uniqueSalt);
//       const moodleUserId = stringToIntegerSumWithSalt(data.userId, uniqueSalt);
//       console.log('Moodle user ID:', moodleUserId);
//       const hashedMoodleUserId = crypto.createHash('sha256').update(moodleUserId.toString()).digest('hex');
//       console.log('Hashed Moodle user ID:', hashedMoodleUserId);
//       const normalizedMoodleUserId = hashToInteger(hashedMoodleUserId);

//       console.log('Normalized Moodle user ID:', normalizedMoodleUserId);

//       // Validate user and course before enrollment
//       // const isValidUser = await moodleClient.validateMoodleUserId(normalizedMoodleUserId);
//       // const isValidCourse = await moodleClient.preEnrollmentValidation(normalizedMoodleUserId, data.courseId);

//       // if (!isValidUser || !isValidCourse) {
//       //   return fail(400, {
//       //     error: 'User or course validation failed',
//       //     code: 'VALIDATION_FAILED',
//       //     data
//       //   });
//       // }
// console.log ("data.courseId ",data.courseId)
//       // Enroll user in the course
//       await moodleClient.enrollUserInCourse(normalizedMoodleUserId, data.courseId);

//       return {
//         success: true,
//         message: 'Enrollment successful! You can now access the course.',
//         data: {
//           ...data,
//           enrollmentDate: new Date().toISOString()
//         }
//       };

//     } catch (e) {
//       switch (e.message) {
//         case 'ALREADY_ENROLLED':
//           return fail(400, {
//             error: 'You are already enrolled in this course',
//             code: 'ALREADY_ENROLLED',
//             data
//           });
//         case 'INVALID_COURSE':
//           return fail(400, {
//             error: 'Invalid course selected',
//             code: 'INVALID_COURSE',
//             data
//           });
//         case 'PERMISSION_DENIED':
//           return fail(403, {
//             error: 'You do not have permission to enroll in this course',
//             code: 'PERMISSION_DENIED',
//             data
//           });
//         default:
//           return fail(500, {
//             error: 'Failed to complete enrollment. Please try again later.',
//             code: 'ENROLLMENT_FAILED',
//             data
//           });
//       }
//     }
//   }
// };