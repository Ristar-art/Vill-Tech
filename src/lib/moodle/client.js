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
        const url = new URL(this.getEndpointUrl(wsfunction));
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
       
        const options = {
            method: 'GET',
            timeout: 30000, // 30-second timeout
        };
        try {
            // const response = await fetch(url, );
            const response = await fetch(url.toString(), options);

            if (!response.ok) {
                throw new Error(`Moodle API error: ${response.status} ${response.statusText}`);
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
                throw new Error(`Moodle error: ${data.message}`);
            }

            return data;
        } catch (e) {
            console.error(`Error in ${wsfunction}:`, e);
            throw new Error(`Failed to fetch from Moodle (${wsfunction}): ${e.message}`);

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
        // console.log('courseId is ', courseId)
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