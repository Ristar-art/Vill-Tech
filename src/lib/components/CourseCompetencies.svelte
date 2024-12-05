<script>
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
  
</script>

{#each sections as { shortname, icon }}
  {#if courseCompetencies?.find(comp => comp.competency.shortname === shortname)}
    <div class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <img 
            src={`https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/${icon}.svg`} 
            alt={`${shortname} icon`} 
            class="w-8 h-8 text-indigo-600"
          >
        </div>
        <div class="flex-grow">
          <h3 class="text-xl font-semibold text-[#222222] mb-2">{shortname}</h3>
          <div class="text-gray-700">
            {#if shortname === 'Accreditation'}
              {#if courseCompetencies?.find(comp => comp.competency.shortname === shortname)?.competency?.idnumber}
                <div class="text-sm font-medium text-indigo-600 mb-2">
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
    <div class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">
        {module}
      </h3>
      {#if courseCompetencies?.find(comp => comp.competency.shortname === module)?.competency?.description}
        {@const content = cleanModuleDescription(courseCompetencies.find(comp => comp.competency.shortname === module).competency.description)}
        <!-- Display Overview -->
        <div class="prose prose-sm max-w-none mb-4">
          <p class="text-gray-700">{content.overview}</p>
        </div>
        <!-- Display Table -->
        {#if content.table}
          <div class="prose prose-sm max-w-none mb-4">
            {@html content.table}
          </div>
        {/if}
      {/if}
    </div>
  {/if}
{/each}