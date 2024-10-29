//src/lib/moodle/index.js
import { MoodleClient } from './client';



const MOODLE_URL = import.meta.env.VITE_MOODLE_URL;
const MOODLE_TOKEN = import.meta.env.VITE_MOODLE_WBTOKEN;


if (!MOODLE_URL || !MOODLE_TOKEN) {
    throw new Error('Moodle configuration is missing. Please check your environment variables.');
}

export const moodleClient = new MoodleClient({
    baseUrl: MOODLE_URL,
    token: MOODLE_TOKEN
});