<!-- // src/lib/components/CourseBlocks.svelte -->
<script>
    export let blocks = [];
    
    // Filter blocks to show only relevant information
    $: courseIncludes = blocks
        .filter(block => block.name === 'html' || block.name === 'Objectives')
        .map(block => ({
            ...block,
            content: parseBlockContent(block.contents)
        }));

    function parseBlockContent(content) {
        console.log('contene : ', content)
        // You might need to adjust this based on your Moodle block content structure
        try {
            if (typeof content === 'string') {
                return JSON.parse(content);
            }
            return content;

        } catch (e) {
            return content;
        }
    }
</script>

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 class="text-xl font-semibold text-[#222222] mb-4">This course includes</h3>
    {#if courseIncludes.length > 0}
        <ul class="space-y-3 text-gray-700">
            {#each courseIncludes as block}
                {#if block.content}
                    {#each Object.entries(block.content) as [key, value]}
                        <li class="flex items-center">
                            <img 
                                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" 
                                alt="icon" 
                                class="w-5 h-5 mr-2 text-indigo-600"
                            >
                            {value}
                        </li>
                    {/each}
                {/if}
            {/each}
        </ul>
    {:else}
        <ul class="space-y-3 text-gray-700">
            <li class="flex items-center">
                <img 
                    src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" 
                    alt="icon" 
                    class="w-5 h-5 mr-2 text-indigo-600"
                >
                Default course features
            </li>
        </ul>
    {/if}
</div>