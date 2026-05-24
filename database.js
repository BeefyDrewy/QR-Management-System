// Vrijwilligers Database Management System
// Loads volunteer data from Supabase and manages adding new volunteers

import { supabase } from './supabaseClient.js';

(async function () {
    
    // Check if Supabase client is available
    if (!supabase) {
        console.error('Supabase client not initialized');
        document.getElementById("volunteerTable").innerHTML = 
            '<tr><td colspan="4" class="px-lg py-md text-red-600">Error: Supabase connection failed</td></tr>';
        return;
    }

    // DOM elements
    const addVolunteerBtn = document.querySelector(".btn-add-volunteer");
    const addVolunteerModal = document.querySelector(".modal-add-volunteer");
    const addVolunteerForm = document.querySelector(".form-add-volunteer");
    const volunteerTableBody = document.getElementById("volunteerTable");
    const closeModalBtn = document.querySelector(".btn-close-modal");

    let volunteers = [];
    let isLoading = false;

    // Show loading state in table
    const showLoadingState = () => {
        volunteerTableBody.innerHTML = '<tr><td colspan="4" class="px-lg py-md">Loading...</td></tr>';
    };

    // Show error state in table
    const showErrorState = (message) => {
        volunteerTableBody.innerHTML = 
            `<tr><td colspan="4" class="px-lg py-md text-red-600">Error: ${message}</td></tr>`;
    };

    // Fetch volunteers from Supabase
    const fetchVolunteers = async () => {
        try {
            showLoadingState();
            isLoading = true;

            const { data, error } = await supabase
                .from('volunteers')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                showErrorState(`Failed to load volunteers: ${error.message}`);
                return false;
            }

            if (!data) {
                console.warn('No data returned from Supabase');
                volunteers = [];
                showErrorState('No volunteers found');
                return false;
            }

            volunteers = data;
            renderVolunteerTable();
            isLoading = false;
            return true;
        } catch (err) {
            console.error('Fetch error:', err);
            showErrorState(`Network error: ${err.message}`);
            isLoading = false;
            return false;
        }
    };

    // Show add volunteer modal
    if (addVolunteerBtn) {
        addVolunteerBtn.addEventListener("click", () => {
            if (addVolunteerModal) {
                addVolunteerModal.style.display = "flex";
            }
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
            if (addVolunteerModal) {
                addVolunteerModal.style.display = "none";
            }
        });
    }

    // Handle add volunteer form submit
    if (addVolunteerForm) {
        addVolunteerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
                if (isLoading) {
                    alert('Please wait, operation in progress...');
                    return;
                }

                // Collect form data
                const formData = new FormData(addVolunteerForm);
                const newVolunteer = {
                    "first name": formData.get("firstname")?.trim() || "",
                    "name": formData.get("surname")?.trim() || "",
                    "ID number": formData.get("idnumber")?.trim() || "",
                    "gender": formData.get("gender") || "",
                    "birthdate": formData.get("birthdate") || ""
                };

                // Validate required fields
                if (!newVolunteer["first name"] || !newVolunteer["name"] || !newVolunteer["ID number"]) {
                    alert('Please fill in all required fields');
                    return;
                }

                isLoading = true;

                // Insert into Supabase
                const { data, error } = await supabase
                    .from('volunteers')
                    .insert([newVolunteer]);

                if (error) {
                    console.error('Error adding volunteer:', error);
                    alert(`Error: ${error.message}`);
                    isLoading = false;
                    return;
                }

                // Re-fetch and re-render table
                await fetchVolunteers();

                // Reset form + close modal
                addVolunteerForm.reset();
                if (addVolunteerModal) {
                    addVolunteerModal.style.display = "none";
                }
                alert('Vrijwilliger succesvol toegevoegd!');
            } catch (err) {
                console.error('Submit error:', err);
                alert(`Error: ${err.message || 'Failed to add volunteer'}`);
                isLoading = false;
            }
        });
    }

    // Render volunteer table from data
    const renderVolunteerTable = () => {
        volunteerTableBody.innerHTML = "";

        if (volunteers.length === 0) {
            volunteerTableBody.innerHTML = '<tr><td colspan="4" class="px-lg py-md text-gray-500">No volunteers found</td></tr>';
            return;
        }

        volunteers.forEach((volunteer) => {
            try {
                const row = document.createElement("tr");
                row.className = "hover:bg-surface-container-lowest transition-colors cursor-pointer";

                const fullName = `${volunteer["first name"] || ''} ${volunteer["name"] || ''}`.trim();
                const idNumber = volunteer["ID number"] || "-";
                const gender = volunteer["gender"] || "-";
                const birthdate = volunteer["birthdate"] || "-";

                const nameTd = document.createElement("td");
                nameTd.className = "px-lg py-md";
                nameTd.textContent = fullName || 'Unknown';

                const idTd = document.createElement("td");
                idTd.className = "px-lg py-md";
                idTd.textContent = idNumber;

                const genderTd = document.createElement("td");
                genderTd.className = "px-lg py-md";
                genderTd.textContent = gender;

                const birthdateTd = document.createElement("td");
                birthdateTd.className = "px-lg py-md";
                birthdateTd.textContent = birthdate;

                row.appendChild(nameTd);
                row.appendChild(idTd);
                row.appendChild(genderTd);
                row.appendChild(birthdateTd);

                // Add click event listener
                row.addEventListener("click", () => {
                    const volunteerData = {
                        name: fullName,
                        idNumber: idNumber,
                        gender: gender,
                        birthDate: birthdate,
                        fullRecord: volunteer
                    };
                    localStorage.setItem("selectedVolunteer", JSON.stringify(volunteerData));
                    window.location.href = "vltr-profiel.html";
                });

                volunteerTableBody.appendChild(row);
            } catch (err) {
                console.error('Error rendering row:', err);
            }
        });
    };

    // Initial fetch and render
    await fetchVolunteers();

    // Expose functions globally for use in script.js if needed
    window.renderVolunteerTable = renderVolunteerTable;
    window.fetchVolunteers = fetchVolunteers;

    console.log('Volunteers module initialized successfully');
})();