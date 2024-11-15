// src/lib/moodle/client.js
export class MoodleClient {
    constructor(config) {
        this.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.token = config.token;
    }

    getEndpointUrl(wsfunction) {
        return `${this.baseUrl}/webservice/rest/server.php?wstoken=${this.token}&moodlewsrestformat=json&wsfunction=${wsfunction}`;
    }

    async fetchMoodle(wsfunction, params = {}) {
        const url = this.getEndpointUrl(wsfunction);

        // Create form data with the required parameters
        const formData = new URLSearchParams();
        formData.append('wstoken', this.token);
        formData.append('moodlewsrestformat', 'json');
        formData.append('wsfunction', wsfunction);

        // For MoodleCloud, we need to format the users parameter carefully
        if (wsfunction === 'core_user_create_users') {
            const users = params.users || [];
            users.forEach((user, index) => {
                Object.entries(user).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((item, i) => {
                            Object.entries(item).forEach(([subKey, subValue]) => {
                                formData.append(`users[${index}][${key}][${i}][${subKey}]`, subValue);
                            });
                        });
                    } else {
                        formData.append(`users[${index}][${key}]`, value);
                    }
                });
            });
        } else {
            // Handle other API calls normally
            Object.entries(params).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Moodle API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.exception) {
                throw new Error(`Moodle error: ${data.message}`);
            }

            return data;
        } catch (e) {
            console.error(`Error in ${wsfunction}:`, e);
            throw new Error(`Failed to fetch from Moodle (${wsfunction}): ${e.message}`);
        }
    }

    async getCourseCompetencies(courseId) {
        try {
            if (!courseId || typeof courseId !== 'number') {
                throw new Error('courseId must be a valid number');
            }

            // Use 'id' parameter instead of 'courseid' as per Moodle documentation
            const params = {
                'id': courseId.toString()
            };

            const data = await this.fetchMoodle('core_competency_list_course_competencies', params);

            if (!data) {
                return [];
            }

            // Check if data is an array and has content
            return Array.isArray(data) ? data : [];

        } catch (error) {
            console.error('Error fetching competencies:', {
                courseId,
                error: error.message,
                stack: error.stack
            });

            // Return empty array if no competencies exist
            return [];
        }
    }
   

    async getCompetencyFramework(courseId) {
        const courseCompetencies = await this.getCourseCompetencies(courseId);
        if (courseCompetencies && courseCompetencies.length > 0) {
            // The framework ID is typically available in the competency data
            const frameworkId = courseCompetencies[0].competency.competencyframeworkid;
            return this.fetchMoodle('core_competency_read_competency_framework', {
                id: frameworkId
            });
        }
        return null;
    }

    async createUser(userData) {
        // Format user data according to Moodle's structure
        const user = {
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: userData.password,
            auth: userData.auth || 'manual',
            idnumber: userData.idnumber || '',
            lang: userData.lang || 'en',
            calendartype: userData.calendartype || 'gregorian',
            theme: userData.theme || '',
            timezone: userData.timezone || '99',
            mailformat: userData.mailformat || 1,
            description: userData.description || '',
            city: userData.city || '',
            country: userData.country || '',
            maildisplay: userData.maildisplay || 2,
            interests: userData.interests || '',
            institution: userData.institution || '',
            department: userData.department || '',
            phone1: userData.phone1 || '',
            phone2: userData.phone2 || '',
            address: userData.address || '',
            firstnamephonetic: userData.firstnamephonetic || '',
            lastnamephonetic: userData.lastnamephonetic || '',
            middlename: userData.middlename || '',
            alternatename: userData.alternatename || ''
        };

        // Add customfields if provided
        if (userData.customfields) {
            user.customfields = userData.customfields;
        }

        // Add preferences if provided
        if (userData.preferences) {
            user.preferences = userData.preferences;
        }

        // Log the user data being sent to Moodle
        console.log('User data being sent to Moodle:', user);

        // Send the request with the properly structured users array
        return this.fetchMoodle('core_user_create_users', {
            users: [user]
        });
    }

   
    async getBlockContent(instanceId) {
        return this.fetchMoodle('core_block_get_dashboard_blocks', {
            returncontents: 1,
            includeinvisible: false,
            instanceid: instanceId
        });
    }

    async getCourseBlocks(courseId) {
        try {
            // Get blocks using the core function
            const response = await this.fetchMoodle('core_block_get_course_blocks', {
                courseid: courseId
            });

            // Filter visible blocks
            const visibleBlocks = response.blocks?.filter(block => {
                return block.visible &&
                    !block.region?.startsWith('hidden') &&
                    block.instanceid &&
                    block.configurable !== false;
            }) || [];

            // Map blocks to a simpler structure
            const processedBlocks = visibleBlocks.map(block => ({
                id: block.instanceid,
                name: block.name,
                region: block.region,
                weight: block.weight,
                title: block.instance?.title || block.name,
                // Include any additional block-specific data from the instance
                config: block.instance?.configdata || {},
                // For now, we're not trying to fetch additional content
                hasContent: false
            }));

            return {
                blocks: processedBlocks,
                totalBlocks: response.blocks?.length || 0,
                visibleBlocksCount: processedBlocks.length
            };
        } catch (error) {
            console.error('Failed to fetch course blocks:', error);
            return {
                blocks: [],
                totalBlocks: 0,
                visibleBlocksCount: 0,
                error: error.message
            };
        }
    }
  
    // async createUser(user) {
    //     return this.fetchMoodle('core_user_create_users', {
    //         users: JSON.stringify([user])
    //     });
    // }
    async getCourses() {
        return this.fetchMoodle('core_course_get_courses');
    }

    async getCourseContents(courseId) {
        return this.fetchMoodle('core_course_get_contents', { courseid: courseId });
    }

    async getCourseModule(cmid) {
        return this.fetchMoodle('core_course_get_course_module', { cmid });
    }
    async getEnrolledUsers(courseId) {
        return this.fetchMoodle('core_enrol_get_enrolled_users', { courseid: courseId });
    }
}