/**
 * UI Layer - All DOM Rendering and Manipulation
 * 
 * This module handles ALL DOM updates and rendering.
 * NO Supabase calls allowed here.
 * 
 * Exported functions:
 * - renderLoadingState(tableBody)
 * - renderErrorState(tableBody, message)
 * - renderEmptyState(tableBody)
 * - renderVolunteerTable(tableBody, volunteersArray)
 * - getFormData(formElement)
 * - clearForm(formElement)
 * - openModal(modalElement)
 * - closeModal(modalElement)
 */

/**
 * Display loading state in the volunteer table
 * @param {HTMLElement} tableBody - The tbody element to update
 */
export function renderLoadingState(tableBody) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.className = 'px-lg py-md';
  cell.colSpan = 4;
  cell.textContent = 'Loading...';
  row.appendChild(cell);
  tableBody.innerHTML = '';
  tableBody.appendChild(row);
}

/**
 * Display error state in the volunteer table
 * @param {HTMLElement} tableBody - The tbody element to update
 * @param {string} message - The error message to display
 */
export function renderErrorState(tableBody, message) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.className = 'px-lg py-md text-red-600';
  cell.colSpan = 4;
  cell.textContent = `Error: ${message}`;
  row.appendChild(cell);
  tableBody.innerHTML = '';
  tableBody.appendChild(row);
}

/**
 * Display empty state in the volunteer table
 * @param {HTMLElement} tableBody - The tbody element to update
 */
export function renderEmptyState(tableBody) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.className = 'px-lg py-md text-gray-500';
  cell.colSpan = 4;
  cell.textContent = 'No volunteers found';
  row.appendChild(cell);
  tableBody.innerHTML = '';
  tableBody.appendChild(row);
}

/**
 * Render the complete volunteer table
 * @param {HTMLElement} tableBody - The tbody element to update
 * @param {Array} volunteersArray - Array of volunteer objects
 * @param {Function} onRowClick - Callback function when a row is clicked
 */
export function renderVolunteerTable(tableBody, volunteersArray, onRowClick) {
  tableBody.innerHTML = '';

  if (!volunteersArray || volunteersArray.length === 0) {
    renderEmptyState(tableBody);
    return;
  }

  volunteersArray.forEach((volunteer) => {
    try {
      const row = document.createElement('tr');
      row.className = 'hover:bg-surface-container-lowest transition-colors cursor-pointer';

      // Format volunteer data
      const fullName = `${volunteer['first name'] || ''} ${volunteer['name'] || ''}`.trim();
      const idNumber = volunteer['ID number'] || '-';
      const gender = volunteer['gender'] || '-';
      const birthdate = volunteer['birthdate'] || '-';

      // Create table cells
      const cells = [
        { text: fullName || 'Unknown', className: 'px-lg py-md' },
        { text: idNumber, className: 'px-lg py-md' },
        { text: gender, className: 'px-lg py-md' },
        { text: birthdate, className: 'px-lg py-md' }
      ];

      cells.forEach(({ text, className }) => {
        const td = document.createElement('td');
        td.className = className;
        td.textContent = text;
        row.appendChild(td);
      });

      // Add click handler
      row.addEventListener('click', () => {
        onRowClick({
          name: fullName,
          idNumber: idNumber,
          gender: gender,
          birthDate: birthdate,
          fullRecord: volunteer
        });
      });

      tableBody.appendChild(row);
    } catch (err) {
      console.error('Error rendering volunteer row:', err);
    }
  });
}

/**
 * Extract form data from the add volunteer form
 * @param {HTMLFormElement} formElement - The form element
 * @returns {Object} The form data as an object
 */
export function getFormData(formElement) {
  const formData = new FormData(formElement);
  return {
    'first name': formData.get('firstname')?.trim() || '',
    'name': formData.get('surname')?.trim() || '',
    'ID number': formData.get('idnumber')?.trim() || '',
    'gender': formData.get('gender') || '',
    'birthdate': formData.get('birthdate') || ''
  };
}

/**
 * Clear form inputs
 * @param {HTMLFormElement} formElement - The form element to clear
 */
export function clearForm(formElement) {
  formElement.reset();
}

/**
 * Open a modal
 * @param {HTMLElement} modalElement - The modal element to open
 */
export function openModal(modalElement) {
  if (modalElement) {
    modalElement.style.display = 'flex';
  }
}

/**
 * Close a modal
 * @param {HTMLElement} modalElement - The modal element to close
 */
export function closeModal(modalElement) {
  if (modalElement) {
    modalElement.style.display = 'none';
  }
}

console.log('UI module loaded');
