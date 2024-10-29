<script>
  export let courseCompetencies;

  $: targetAudience = courseCompetencies?.find(comp => comp.competency.shortname === 'Recommended Courses Fee');

  function cleanDescription(html) {
    if (!html) return '';
    return html
      .replace(/dir="ltr"/g, '')  // Remove dir="ltr" attributes
      .replace(/>\s+(?=\w)/g, '') // Remove remaining > followed by whitespace before words
      .replace(/<p><\/p>/g, '')   // Remove empty paragraphs
      .replace(/<li>\s*<p>/g, '<li><p>') // Clean up extra whitespace
      .replace(/<li/g, '<li class="flex items-start"><img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/person-check.svg" alt="target person" class="w-5 h-5 mr-2 text-indigo-600 mt-1" />');
  }
</script>

<div class="bg-white mt-6 p-6 rounded-lg shadow-md border border-gray-200">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <img 
        src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/people.svg" 
        alt="Target Audience icon" 
        class="w-8 h-8 text-indigo-600"
      >
    </div>
    <div class="flex-grow">
      <h3 class="text-xl font-semibold text-[#222222] mb-2">{targetAudience?.competency?.shortname || 'Recommended Courses Fee'}</h3>
      <div class="text-gray-700">
        <div 
          class="prose prose-sm max-w-none [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_p]:m-0"
        >
          {@html cleanDescription(targetAudience?.competency?.description)}
        </div>
      </div>
    </div>
  </div>
</div>