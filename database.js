// Vrijwilligers Database Management System
// Loads volunteer data from vrijwilligers.json and manages adding new volunteers

(async function () {
    // Fetch initial volunteer data from vrijwilligers.json
    const data = await fetch("vrijwilligers.json");
    const res = await data.json();
    let volunteers = res;

    // DOM elements
    const addVolunteerBtn = document.querySelector(".btn-add-volunteer");
    const addVolunteerModal = document.querySelector(".modal-add-volunteer");
    const addVolunteerForm = document.querySelector(".form-add-volunteer");
    const volunteerTableBody = document.getElementById("volunteerTable");

    // Modal close button
    const closeModalBtn = document.querySelector(".btn-close-modal");

    // Show add volunteer modal
    if (addVolunteerBtn) {
        addVolunteerBtn.addEventListener("click", () => {
            addVolunteerModal.style.display = "flex";
        });
    }

    // Close modal when clicking outside form
    if (addVolunteerModal) {
        addVolunteerModal.addEventListener("click", (e) => {
            if (e.target === addVolunteerModal) {
                addVolunteerModal.style.display = "none";
            }
        });
    }

    // Close modal with button
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            addVolunteerModal.style.display = "none";
        });
    }

    // Handle add volunteer form submit
    if (addVolunteerForm) {
        addVolunteerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(addVolunteerForm);
            const newVolunteer = {
                "": `${new Date().getFullYear()}/V-${volunteers.length + 1}`,
                "Name": formData.get("surname") || "",
                "First name": formData.get("firstname") || "",
                "Gender": formData.get("gender") || "",
                "Birthdate": formData.get("birthdate") || "",
                "ID number": formData.get("idnumber") || "",
                "Afdeling": formData.get("department") || "Algemeen",
                "Status": "Actief"
            };

            // Add to volunteers array
            volunteers.push(newVolunteer);

            // Re-render table
            renderVolunteerTable();

            // Reset form + close modal
            addVolunteerForm.reset();
            addVolunteerModal.style.display = "none";
        });
    }

    // Render volunteer table from data
    const renderVolunteerTable = () => {
        volunteerTableBody.innerHTML = "";
        volunteers.forEach((volunteer) => {
            const row = document.createElement("tr");
            row.className = "hover:bg-surface-container-lowest transition-colors";

            const fullName = `${volunteer["First name"]} ${volunteer["Name"]}`;
            const idNumber = volunteer["ID number"] || "";
            const department = volunteer["Afdeling"] || "Onbekend";
            const status = volunteer["Status"] || "Actief";
            const statusColor = status === "Actief" ? "text-green-600" : "text-gray-500";

            row.innerHTML = `
                <td class="px-lg py-md">${fullName}</td>
                <td class="px-lg py-md">${idNumber}</td>
                <td class="px-lg py-md">${department}</td>
                <td class="px-lg py-md ${statusColor}">${status}</td>
            `;

            volunteerTableBody.appendChild(row);
        });
    };

    // Initial render
    renderVolunteerTable();

    // Expose renderVolunteerTable globally for use in script.js if needed
    window.renderVolunteerTable = renderVolunteerTable;
})();