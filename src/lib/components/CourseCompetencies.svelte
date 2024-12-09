<script>
  export let courseCompetencies;
  import { fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
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
      .replace(/<li/g, '<li class="flex items-start group"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-indigo-600 mt-1 group-hover:text-indigo-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>');
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
    { shortname: 'Accreditation', icon: 'award', svgIcon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.48-.634-2.032M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.231-1.48.634-2.032m0 0a5.002 5.002 0 019.536 0' },
    { shortname: 'Programme Overview', icon: 'clock', svgIcon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { shortname: 'Duration', icon: 'clock', svgIcon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { shortname: 'Target Audience', icon: 'people', svgIcon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { shortname: 'Entry Requirements', icon: 'people', svgIcon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { shortname: 'Course Structure and Modules', icon: 'award', svgIcon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { shortname: 'Training Methodology', icon: 'award', svgIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { shortname: 'Career Opportunities', icon: 'people', svgIcon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];
  
  const modules = [
    'MODULE 1', 'MODULE 2', 'MODULE 3', 'MODULE 4', 'MODULE 5', 'MODULE 6', 'MODULE 7', 'MODULE 8'
  ];
</script>

{#each sections as { shortname, icon, svgIcon }}
  {#if courseCompetencies?.find(comp => comp.competency.shortname === shortname)}
    <div 
      transition:fade="{{ duration: 300, easing: quintOut }}"
      class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
    >
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="w-8 h-8 text-indigo-600 hover:text-indigo-700 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d={svgIcon} 
            />
          </svg>
        </div>
        <div class="flex-grow">
          <h3 class="text-xl font-semibold text-[#222222] mb-2 group">
            <span class="group-hover:text-indigo-600 transition-colors">{shortname}</span>
          </h3>
          <div class="text-gray-700">
            {#if shortname === 'Accreditation'}
              {#if courseCompetencies?.find(comp => comp.competency.shortname === shortname)?.competency?.idnumber}
                <div 
                  transition:slide="{{ duration: 300 }}"
                  class="text-sm font-medium text-indigo-600 mb-2 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Certification Code: {courseCompetencies.find(comp => comp.competency.shortname === shortname).competency.idnumber}
                </div>
              {/if}
            {/if}
            <div class="prose prose-sm max-w-none">
              {@html cleanDescription(courseCompetencies?.find(comp => comp.competency.shortname === shortname)?.competency?.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/each}

{#each modules as module}
  {#if courseCompetencies?.find(comp => comp.competency.shortname === module)}
    <div 
      transition:fade="{{ duration: 300, easing: quintOut }}"
      class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
    >
      <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        {module}
      </h3>
      {#if courseCompetencies?.find(comp => comp.competency.shortname === module)?.competency?.description}
        {@const content = cleanModuleDescription(courseCompetencies.find(comp => comp.competency.shortname === module).competency.description)}
        <!-- Display Overview -->
        <div class="prose prose-sm max-w-none mb-4">
          <p class="text-gray-700 relative pl-6 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:bg-indigo-600 before:rounded-full">
            {content.overview}
          </p>
        </div>
        <!-- Display Table -->
        {#if content.table}
          <div class="prose prose-sm max-w-none mb-4 overflow-x-auto">
            {@html content.table}
          </div>
        {/if}
      {/if}
    </div>
  {/if}
{/each}