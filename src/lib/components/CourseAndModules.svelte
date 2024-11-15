<script>
  export let courseCompetencies;

  $: CourseAndModules  = courseCompetencies?.find(comp => comp.competency.shortname === 'Course Structure and Modules');

  function cleanDescription(html) {
    if (!html) return '';
    return html
      .replace(/dir="ltr"/g, '')  // Remove dir="ltr" attributes
      .replace(/>\s+(?=\w)/g, '') // Remove remaining > followed by whitespace before words
      .replace(/<p><\/p>/g, '');  // Remove empty paragraphs
  }
</script>

<div class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8" >
      <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <img 
        src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/award.svg" 
        alt="Course Structure and Modules icon" 
        class="w-8 h-8 text-indigo-600"
      >
    </div>
    <div class="flex-grow">
      <h3 class="text-xl font-semibold text-[#222222] mb-2">{CourseAndModules?.competency?.shortname || 'Course Structure and Modules'}</h3>
      <div class="text-gray-700">
        <!-- {#if CourseAndModules?.competency?.idnumber}
          <div class="text-sm font-medium text-indigo-600 mb-2">
            Course Structure and Modules Code: {CourseAndModules.competency.idnumber}
          </div>
        {/if} -->
        <div class="prose prose-sm max-w-none">
          {@html cleanDescription(CourseAndModules?.competency?.description)}
        </div>
      </div>
    </div>
  </div>
</div>