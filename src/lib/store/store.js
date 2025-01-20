// src/lib/store/authStore.js
import { writable } from "svelte/store";
import { auth } from "$lib/firebase/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const authStore = writable({
    user: null,
    loading: true,
    data: {},
    error: null
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is logged in:', user);
        authStore.set({ user, loading: false, data: {}, error: null });
    } else {
        console.log('No user is signed in.');
        authStore.set({ user: null, loading: false, data: {}, error: null });
    }
});

export const authHandles = {
    signup: async (email, password) => {
        try {
            console.log("Signup attempt with email:", email);
            authStore.update(curr => ({ ...curr, loading: true, error: null }));
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signup successful:", userCredential.user);
            authStore.update(curr => ({ ...curr, user: userCredential.user, loading: false }));
        } catch (error) {
            console.error("Signup error:", error);
            authStore.update(curr => ({ ...curr, error: error.message, loading: false }));
            throw error;
        }
    },
    login: async (email, password) => {
        try {
            console.log("Login attempt with email:", email);
            if (!email) {
                throw new Error("Email is required");
            }
            if (!password) {
                throw new Error("Password is required");
            }
            authStore.update(curr => ({ ...curr, loading: true, error: null }));
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful:", userCredential.user);
            authStore.update(curr => ({ ...curr, user: userCredential.user, loading: false }));
        } catch (error) {
            console.error("Login error:", error);
            let errorMessage = error.message;
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address format.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email address.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            }
            authStore.update(curr => ({ ...curr, error: errorMessage, loading: false }));
            throw error;
        }
    },
    logout: async () => {
        try {
            await signOut(auth);
            authStore.update(curr => ({ ...curr, user: null, data: {}, loading: false }));
        } catch (error) {
            console.error("Logout error:", error);
            authStore.update(curr => ({ ...curr, error: error.message }));
            throw error;
        }
    }
};
