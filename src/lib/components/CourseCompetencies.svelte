<script>
  import { fade } from "svelte/transition";
  export let courseCompetencies;
  
  function cleanDescription(html) {
  if (!html) return '';
  return html
    .replace(/dir="ltr"/g, '')                   // Remove dir="ltr" attributes
    .replace(/>\s+(?=\w)/g, '')                  // Remove remaining > followed by whitespace before words
    .replace(/<p><\/p>/g, '')                    // Remove empty paragraphs
    .replace(/<style>[^<]*<\/style>/g, '')        // Remove any inline style tags
    .replace(/\s+style="[^"]*"/g, '')            // Remove inline style attributes
    .replace(/<a\s+[^>]*>/g, '')                 // Remove anchor tags but keep content
    .replace(/<\/a>/g, '')
    .replace(/<li/g, '<li class="flex items-start"><img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/person-check.svg" alt="target person" class="w-5 h-5 mr-2 text-indigo-600 mt-1" />');
}

function cleanModuleDescription(html) {
  if (!html) return { overview: '', items: [], table: '' };
  
  // Check if we are in a browser environment
  if (typeof window !== 'undefined') {
    // Use DOMParser to handle complex HTML parsing
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract and remove table content
    const table = doc.querySelector('table');
    const tableText = table ? table.textContent || '' : '';
    
    // Remove table from the document
    if (table) {
      table.remove();
    }
    
    // Extract plain text from the remaining document body
    const text = doc.body.textContent || '';
    
    // Clean and split text
    const cleanedText = text
      .replace(/\r\n|\r|\n/g, ' ')       // Replace new lines with spaces
      .replace(/\s\s+/g, ' ')             // Replace multiple spaces with a single space
      .replace(/^\s+|\s+$/g, '')          // Trim leading and trailing whitespace
      .replace(/\s*\d+\.\s*/g, '|')       // Replace numbered sections with pipe
      .split('|')
      .filter(item => item.trim() !== '');
    
    // First item is overview, rest are list items
    const overview = cleanedText[0] || '';
    const items = cleanedText.slice(1);
    
    // Extract table HTML if present
    const tableHtml = table ? table.outerHTML : '';
    
    return { 
      overview: overview.trim(), 
      items, 
      table: tableHtml 
    };
  } else {
    // Fallback for non-browser environments
    return { overview: '', items: [], table: '' };
  }
}

  const sections = [
    { shortname: 'Accreditation', icon: 'award' },
    { shortname: 'Programme Overview', icon: 'clock' },
    { shortname: 'Duration', icon: 'clock' },
    { shortname: 'Target Audience', icon: 'people' },
    { shortname: 'Entry Requirements', icon: 'people' },
    { shortname: 'Course Structure and Modules', icon: 'award' },
    { shortname: 'Training Methodology', icon: 'award' },
    { shortname: 'Career Opportunities', icon: 'people' },
  ];

  const modules = [
    'MODULE 1', 'MODULE 2', 'MODULE 3', 'MODULE 4', 'MODULE 5', 'MODULE 6', 'MODULE 7', 'MODULE 8'
  ];
  
  let isOpen = false;
  let openStates = {};
  $: {
    if (sections) {
      sections.forEach(({ shortname }) => {
        if (!(shortname in openStates)) {
          openStates[shortname] = false;
        }
      });
    }
  }
</script>
<!-- bg-[#21409A] -->
<div class="relative  min-h-screen ">
  <div class="mx-auto py-16 ">
    <!-- Section Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-codec-pro text-white mb-4">Course Details</h1>
      <p class="text-white font-codec-pro text-lg">
        Explore detailed information about the course, including its structure, modules, and opportunities it provides.
      </p>
    </div>

    <!-- Scrollable Sections -->
   
      

      <!-- Right Column (Modules) -->
      <div class="col-span-2 bg-white shadow-lg rounded-2xl p-6  overflow-auto">
        <h2 class="text-2xl font-codec-pro text-gray-800 mb-6">Course Highlights</h2>
        {#each sections as { shortname, icon }}
  {#if courseCompetencies?.find(comp => comp.competency.shortname === shortname)}
    <div class="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm">
      <div class="flex items-start gap-4">
        <div>
          <img 
            src={`https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/${icon}.svg`} 
            alt={`${shortname} icon`} 
            class="w-6 h-6 text-indigo-600"
          >
        </div>
        <div class="w-full">
          <button 
            class="flex justify-between items-center w-full py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 px-4 rounded-lg transition"
            on:click={() => openStates[shortname] = !openStates[shortname]}
          >
            {shortname}
            <span 
              class="transform transition-transform" 
              class:rotate-180={openStates[shortname]}
            >
              ▼
            </span>
          </button>     
          {#if openStates[shortname]}
            <p class="text-sm text-gray-600 mt-2 px-4">
              {@html cleanDescription(courseCompetencies?.find(comp => 
                comp.competency.shortname === shortname
              )?.competency?.description)}
            </p>
          {/if}
        </div>
      </div>
    </div>
  {/if}
{/each}
        <h2 class="text-2xl font-codec-pro text-gray-800 mb-6">Modules</h2>
        {#each modules as module}
          {#if courseCompetencies?.find(comp => comp.competency.shortname === module)}
            <div class="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
              <h3 class="text-lg font-codec-pro text-gray-900">{module}</h3>
              {#if courseCompetencies?.find(comp => comp.competency.shortname === module)?.competency?.description}
                {@const content = cleanModuleDescription(courseCompetencies.find(comp => comp.competency.shortname === module).competency.description)}
                <!-- Overview -->
                <div class="prose prose-sm max-w-none mb-4">
                  <p class="text-gray-700 font-codec-pro">{content.overview}</p>
                </div>
                <!-- Table -->
                {#if content.table}
                  <div class="prose prose-sm max-w-none mb-4 font-codec-pro overflow-x-auto">
                    {@html content.table}
                  </div>
                {/if}
                <!-- List Items -->
                {#if content.items.length > 0}
                  <ul class="list-disc list-inside text-gray-700">
                    {#each content.items as item}
                      <li>{item}</li>
                    {/each}
                  </ul>
                {/if}
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    
  </div>
</div>
