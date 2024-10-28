<script>
  export let competencyDescription;

  function cleanDescription(html) {
    return html
      .replace(/dir="ltr"/g, '')  // Remove dir="ltr" attributes
      .replace(/<li>\s*<p>\s*>/g, '<li><p>')  // Remove trailing > and clean whitespace
      .replace(/>\s+(?=\w)/g, '') // Remove remaining > followed by whitespace before words
      .replace(/<li/g, '<li class="flex items-start"><img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/icons/patch-check-fill.svg" alt="icon" class="w-5 h-5 mr-2 text-indigo-600 mt-1" />'); // Keep the icon
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
  <h3 class="text-xl font-semibold text-[#222222] mb-4">This course includes</h3>
  <div 
    class="text-gray-700 [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_p]:m-0"
  >
    {@html cleanDescription(competencyDescription)}
  </div>
</div>