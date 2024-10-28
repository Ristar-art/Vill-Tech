<!-- src/lib/components/CourseCompetencies.svelte
<script>
    export let courseId;
    export let moodleClient;
    
    let competencies = [];
    let loading = true;
    let error = null;

    async function loadCompetencies() {
        try {
            loading = true;
            competencies = await moodleClient.getCourseCompetencies(courseId);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    $: if (courseId) {
        loadCompetencies();
    }
</script>

{#if loading}
    <div class="loading">Loading competencies...</div>
{:else if error}
    <div class="error">{error}</div>
{:else}
    <div class="competencies-container">
        <h3>Course Competencies</h3>
        {#if competencies.length > 0}
            <ul class="competency-list">
                {#each competencies as competency}
                    <li class="competency-item">
                        <h4>{competency.shortname}</h4>
                        <p>{competency.description}</p>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>No competencies defined for this course.</p>
        {/if}
    </div>
{/if}

<style>
    .competencies-container {
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 4px;
    }

    .competency-list {
        list-style: none;
        padding: 0;
    }

    .competency-item {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-left: 3px solid #007bff;
        background-color: #f8f9fa;
    }
</style> -->