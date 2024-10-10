// src/routes/api/courses.js
export async function get() {
    const response = await fetch('https://villagetech.moodlecloud.com/webservice/rest/server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            wstoken: import.meta.env.VITE_MOODLE_WBTOKEN,
            wsfunction: 'core_course_get_courses',
            moodlewsrestformat: 'json'
        })
    });

    const data = await response.json();
    return {
        body: data
    };
}
