// src/hooks.server.js
import { moodleClient } from '$lib/moodle';

export async function handle({ event, resolve }) {
    const userInfo = await moodleClient.getSiteInfo();
    event.locals.user = {
        id: userInfo.userid,
        username: userInfo.username
    };
    return resolve(event);
}