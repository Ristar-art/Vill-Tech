<script>
  export let courseCompetencies;

  $: module3 = courseCompetencies?.find(comp => comp.competency.shortname === 'MODULE 3');
//   $: console.log('module1 is ', module1);

  // Enhanced cleaning function for better formatting
  function cleanDescription(html) {
  if (!html) return '';
  
  // Remove all HTML tags and extra whitespace
  const cleanedText = html
    .replace(/<[^>]*>/g, '')  // Remove all HTML tags
    .replace(/\r\n|\r|\n/g, ' ')  // Replace new lines with spaces for readability
    .replace(/\s\s+/g, ' ')  // Replace multiple spaces with a single space
    .trim();

  // Split the content into sections by overview and items if necessary
  const [overview, ...items] = cleanedText.split(/\d+\.\s/).filter(Boolean);

  return { overview, items };
}

</script>

<div class="bg-white bg-opacity-90 rounded-tl-[40px] rounded-br-[40px] p-8 shadow-xl mb-8" >
      <h3 class="text-xl font-semibold text-gray-800 mb-4">
    {module3?.competency?.shortname || 'MODULE 3'}
  </h3>

  {#if module3?.competency?.description}
    {@const content = cleanDescription(module3.competency.description)}

    <!-- Display Overview -->
    <div class="prose prose-sm max-w-none mb-4">
      <p class="text-gray-700">{content.overview}</p>
    </div>

    <!-- Display Items as List -->
    <ul class="list-disc pl-5 space-y-2">
      {#each content.items as item}
        <li class="text-gray-700">{item.trim()}</li>
      {/each}
    </ul>
  {/if}
</div>

