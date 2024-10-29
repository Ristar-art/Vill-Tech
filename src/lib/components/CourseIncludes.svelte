<script>
  export let courseCompetencies;
  $: console.log('courseCompetencies is ', courseCompetencies);
  $: overview = courseCompetencies?.find(comp => comp.competency.shortname === 'Programme Overview');
  $: console.log('Overview is ', overview);
  function cleanDescription(html) {
    if (!html) return '';
    return html
      .replace(/dir="ltr"/g, '')  // Remove dir="ltr" attributes
      .replace(/>\s+(?=\w)/g, '') // Remove remaining > followed by whitespace before words
      .replace(/<p><\/p>/g, '');  // Remove empty paragraphs
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <img 
        src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/clock.svg" 
        alt="Duration icon" 
        class="w-8 h-8 text-indigo-600"
      >
    </div>
    <div class="flex-grow">
      <h3 class="text-xl font-semibold text-[#222222] mb-2">{overview?.competency?.shortname || 'Overview'}</h3>
      <div class="text-gray-700">
        <div class="prose prose-sm max-w-none">
          {@html cleanDescription(overview?.competency?.description)}
        </div>
      </div>
    </div>
  </div>
</div>