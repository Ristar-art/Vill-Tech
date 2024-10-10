// src/routes/moodle/+page.server.js
import { moodleClient } from '$lib/moodle';

export async function load() {
    const siteInfo = await moodleClient.getSiteInfo();
    return {
        siteInfo
    };
}