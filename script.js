// Row click interaction
document.querySelectorAll("tbody tr").forEach(row => {
  row.addEventListener("click", (e) => {
    console.log("Opening volunteer details...");
  });
});

// Search filter
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  document.querySelectorAll("#volunteerTable tr").forEach(row => {
    const text = row.innerText.toLowerCase();

    if (text.includes(query)) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});