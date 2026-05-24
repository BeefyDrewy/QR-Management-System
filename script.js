/**
 * Search Filter Module
 * 
 * Filters the volunteer table based on search input
 */

const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    document.querySelectorAll('#volunteerTable tr').forEach((row) => {
      const text = row.innerText.toLowerCase();

      // Show or hide row based on search query
      row.style.display = text.includes(query) ? 'table-row' : 'none';
    });
  });
}

console.log('Search filter module loaded');