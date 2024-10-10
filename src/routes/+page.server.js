import { moodleClient } from '$lib/moodle';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const siteInfo = await moodleClient.getSiteInfo();
        return {
            siteInfo
        };
    } catch (e) {
        console.error('Failed to fetch Moodle site info:', e);
        // Return null instead of throwing an error to handle it gracefully in the component
        return {
            siteInfo: null
        };
    }
}