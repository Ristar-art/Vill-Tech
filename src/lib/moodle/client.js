export class MoodleClient {
    constructor(config) {
        this.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.token = config.token;
    }

    getEndpointUrl(wsfunction) {
        return `${this.baseUrl}/webservice/rest/server.php?wstoken=${this.token}&moodlewsrestformat=json&wsfunction=${wsfunction}`;
    }

    async fetchMoodle(wsfunction, params = {}) {
        const url = new URL(this.getEndpointUrl(wsfunction));
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        try {
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw error(response.status, `Moodle API error: ${response.statusText}`);
            }

            const data = await response.json();

            // Check for Moodle exception
            if (data.exception) {
                if (data.message.includes('Site policy not agreed')) {
                    return {
                        error: 'site_policy_not_agreed',
                        policyUrl: data.message.match(/href="([^"]*)"/)[1]
                    };
                }
                throw error(400, `Moodle error: ${data.message}`);
            }

            return data;
        } catch (e) {
            if (e instanceof Error) {
                throw error(500, `Failed to fetch from Moodle: ${e.message}`);
            }
            throw e;
        }
    }

    async getSiteInfo() {
        return this.fetchMoodle('core_webservice_get_site_info');
    }

    async getCourses() {
        return this.fetchMoodle('core_course_get_courses');
    }

    async getCourseContents(courseId) {
        return this.fetchMoodle('core_course_get_contents', { courseid: courseId });
    }

    async getCourseModule(cmid) {
        return this.fetchMoodle('core_course_get_course_module', { cmid });
    }
}