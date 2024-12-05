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

            const params = {
                'id': courseId.toString()
            };

            const data = await this.fetchMoodle('core_competency_list_course_competencies', params);

            if (!data) {
                return [];
            }

            return Array.isArray(data) ? data : [];

        } catch (error) {
            console.error('Error fetching competencies:', {
                courseId,
                error: error.message,
                stack: error.stack
            });

            return [];
        }
    }

    async getCompetencyFramework(courseId) {
        const courseCompetencies = await this.getCourseCompetencies(courseId);
        if (courseCompetencies && courseCompetencies.length > 0) {
            const frameworkId = courseCompetencies[0].competency.competencyframeworkid;
            return this.fetchMoodle('core_competency_read_competency_framework', {
                id: frameworkId
            });
        }
        return null;
    }

    async createUser(userData) {
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

        if (userData.customfields) {
            user.customfields = userData.customfields;
        }

        if (userData.preferences) {
            user.preferences = userData.preferences;
        }

        console.log('User data being sent to Moodle:', user);

        return this.fetchMoodle('core_user_create_users', {
            users: [user]
        });
    }
    async login(username, password) {
        const url = `${this.baseUrl}/login/token.php`;
        const params = new URLSearchParams({
            username: username,
            password: password,
            service: 'customwebservice' // Use the short name of the service
        });

        try {
            const response = await fetch(url + '?' + params.toString(), {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to log in to MoodleCloud');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Store the token for future use
            this.token = data.token;

            // Handle successful login (e.g., store token or user data)
            console.log('MoodleCloud Login Successful:', data);

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Failed to login to MoodleCloud');
        }
    }

    async requestPasswordReset(username, email) {
        try {
            const params = {
                username: username,
                email: email
            };

            const response = await this.fetchMoodle('core_auth_request_password_reset', params);
            return response;
        } catch (error) {
            console.error('Password reset request error:', error);
            throw new Error('Failed to request password reset');
        }
    }
    async resendConfirmationEmail(username, password, redirect = '') {
        try {
            const params = {
                username: username,
                password: password,
                redirect: redirect
            };

            const response = await this.fetchMoodle('core_auth_resend_confirmation_email', params);
            return response;
        } catch (error) {
            console.error('Confirmation email resend error:', error);
            throw new Error('Failed to resend confirmation email');
        }
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
            const response = await this.fetchMoodle('core_block_get_course_blocks', {
                courseid: courseId
            });

            const visibleBlocks = response.blocks?.filter(block => {
                return block.visible &&
                    !block.region?.startsWith('hidden') &&
                    block.instanceid &&
                    block.configurable !== false;
            }) || [];

            const processedBlocks = visibleBlocks.map(block => ({
                id: block.instanceid,
                name: block.name,
                region: block.region,
                weight: block.weight,
                title: block.instance?.title || block.name,
                config: block.instance?.configdata || {},
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

    async getCourses() {
        return this.fetchMoodle('core_course_get_courses');
    }

    async getCourseContents(courseId) {
        return this.fetchMoodle('core_course_get_contents', { courseid: courseId });
    }
    async getCourseByField(field, value) {
        try {
            if (!field || !value) {
                throw new Error('Both field and value must be provided');
            }

            const params = {
                field: field,
                value: value
            };

            const data = await this.fetchMoodle('core_course_get_courses_by_field', params);

            if (!data || !data.courses || data.courses.length === 0) {
                return null;
            }

            const course = data.courses[0];
            return {
                id: course.id,
                fullname: course.fullname,
                displayname: course.displayname,
                shortname: course.shortname,
                courseimage: course.courseimage,
                categoryid: course.categoryid,
                categoryname: course.categoryname,
                sortorder: course.sortorder,
                summary: course.summary,
                summaryformat: course.summaryformat,
                summaryfiles: course.summaryfiles,
                overviewfiles: course.overviewfiles,
                showactivitydates: course.showactivitydates,
                showcompletionconditions: course.showcompletionconditions,
                contacts: course.contacts,
                enrollmentmethods: course.enrollmentmethods,
                format: course.format,
                showgrades: course.showgrades,
                newsitems: course.newsitems,
                startdate: course.startdate,
                enddate: course.enddate,
                maxbytes: course.maxbytes,
                showreports: course.showreports,
                visible: course.visible,
                groupmode: course.groupmode,
                groupmodeforce: course.groupmodeforce,
                defaultgroupingid: course.defaultgroupingid,
                enablecompletion: course.enablecompletion,
                completionnotify: course.completionnotify,
                lang: course.lang,
                theme: course.theme,
                marker: course.marker,
                filters: course.filters,
                courseformatoptions: course.courseformatoptions
            };

        } catch (error) {
            console.error('Error fetching course by field:', {
                field,
                value,
                error: error.message,
                stack: error.stack
            });

            return null;
        }
    }

    async getCourseModule(cmid) {
        return this.fetchMoodle('core_course_get_course_module', { cmid });
    }

    async getEnrolledUsers(courseId) {
        return this.fetchMoodle('core_enrol_get_enrolled_users', { courseid: courseId });
    }

    async enrollUserInCourse(userId, courseId, roleId = 5) {
        const enrollmentData = {
            enrolments: [
                {
                    roleid: roleId,
                    userid: userId,
                    courseid: courseId,
                    timestart: Math.floor(Date.now() / 1000),
                    timeend: 0,
                    suspend: 0
                }
            ]
        };

        try {
            const response = await this.fetchMoodle('enrol_manual_enrol_users', enrollmentData);
            return response !== null && response !== undefined;
        } catch (error) {
            console.error('Enrollment error:', error);

            if (error.message.includes('already enrolled')) {
                throw new Error('ALREADY_ENROLLED');
            }

            if (error.message.includes('invalid courseid')) {
                throw new Error('INVALID_COURSE');
            }

            if (error.message.includes('permissions')) {
                throw new Error('PERMISSION_DENIED');
            }

            throw error;
        }
    }

    async validateMoodleUserId(userId) {
        console.log('Validating user ID:', userId);
        try {
            const userDetails = await this.fetchMoodle('core_user_get_users', {
                criteria: [{
                    key: 'id',
                    value: userId.toString()
                }]
            });

            return userDetails.users && userDetails.users.length > 0;
        } catch (error) {
            console.error('User ID validation failed:', error);
            return false;
        }
    }

    async preEnrollmentValidation(userId, courseId) {
        try {
            const courseCheck = await this.fetchMoodle('core_course_get_courses', {
                options: {
                    ids: [courseId]
                }
            });

            const userCheck = await this.fetchMoodle('core_user_get_users', {
                criteria: [{
                    key: 'id',
                    value: userId.toString()
                }]
            });

            return (
                courseCheck &&
                courseCheck.courses &&
                courseCheck.courses.length > 0 &&
                userCheck &&
                userCheck.users &&
                userCheck.users.length > 0
            );
        } catch (error) {
            console.error('Pre-enrollment validation failed:', error);
            return false;
        }
    }
}