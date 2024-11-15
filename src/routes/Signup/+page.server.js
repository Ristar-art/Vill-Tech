import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '$lib/firebase/firebase';
import { fail } from '@sveltejs/kit';
import { rateLimit } from '$lib/server/rateLimit';
import { moodleClient } from '$lib/moodle';

export const actions = {
    default: async ({ request, getClientAddress }) => {
        const ip = getClientAddress();

        const rateLimitResult = await rateLimit({
            ip,
            limit: 3,
            windowMs: 2 * 60 * 1000
        });

        if (rateLimitResult.isLimited) {
            return fail(429, {
                error: 'Too many signup attempts. Please try again later.',
                retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
            });
        }

        try {
            const data = await request.formData();
            const firstName = data.get('firstName')?.trim();
            const lastName = data.get('lastName')?.trim();
            const email = data.get('email')?.trim();
            const password = data.get('password');

            // Input validation
            if (!firstName || !lastName || !email || !password) {
                return fail(400, {
                    error: 'All fields are required'
                });
            }

            try {
                // Create user in Firebase first
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

                // Then create in Moodle with proper structure
                const moodleResponse = await moodleClient.createUser({
                    username: username,
                    password: password,
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    auth: 'manual',
                    idnumber: user.uid, // Firebase UID
                    preferences: [
                        {
                            type: 'auth_forcepasswordchange',
                            value: '0'
                        }
                    ]
                });

                console.log("moodleResponse", moodleResponse);
                
                if (moodleResponse.exception) {
                    throw new Error(moodleResponse.message);
                }

                // If successful, store the Moodle user ID in Firebase
                if (moodleResponse?.[0]?.id) {
                    await setDoc(doc(db, "users", user.uid), {
                        firstName,
                        lastName,
                        email,
                        moodleId: moodleResponse[0].id,
                        createdAt: new Date().toISOString(),
                        moodleUsername: username
                    });
                }

                return { success: true };

            } catch (error) {
                console.error("Error creating user:", error);
                return fail(400, { error: error.message });
            }

        } catch (error) {
            console.error("Error signing up:", error);

            // Handle Firebase-specific errors
            const errorMessage = (() => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        return 'Email address is already registered';
                    case 'auth/invalid-email':
                        return 'Invalid email address';
                    case 'auth/operation-not-allowed':
                        return 'Email/password accounts are not enabled';
                    case 'auth/weak-password':
                        return 'Password is too weak';
                    default:
                        return 'An error occurred during registration';
                }
            })();

            return fail(400, {
                error: errorMessage
            });
        }
    }
};