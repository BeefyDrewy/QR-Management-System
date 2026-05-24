/**
 * Application Controller - Main Orchestrator
 * 
 * This module coordinates the data flow between the database and UI layers.
 * Handles all event listeners and application initialization.
 * 
 * Responsibilities:
 * - Load initial data
 * - Manage event listeners
 * - Coordinate between database.js and ui.js
 * - Handle application state
 */

import { fetchAllVolunteers, addNewVolunteer } from './database.js';
import {
  renderLoadingState,
  renderErrorState,
  renderVolunteerTable,
  renderEmptyState,
  getFormData,
  clearForm,
  openModal,
  closeModal
} from './ui.js';

// Application state
const appState = {
  volunteers: [],
  isLoading: false,
  supabaseReady: false
};

// Cache DOM elements
const domElements = {
  addVolunteerBtn: document.querySelector('.btn-add-volunteer'),
  addVolunteerModal: document.querySelector('.modal-add-volunteer'),
  addVolunteerForm: document.querySelector('.form-add-volunteer'),
  volunteerTableBody: document.getElementById('volunteerTable'),
  closeModalBtn: document.querySelector('.btn-close-modal')
};

/**
 * Initialize the application
 */
async function initializeApp() {
  console.log('Initializing application...');

  // Check if Supabase client is available
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase client not initialized');
    renderErrorState(domElements.volunteerTableBody, 'Supabase connection failed');
    return;
  }

  appState.supabaseReady = true;

  // Load initial data
  await loadVolunteers();

  // Setup event listeners
  setupEventListeners();

  console.log('Application initialized successfully');
}

/**
 * Fetch and display volunteers
 */
async function loadVolunteers() {
  try {
    appState.isLoading = true;
    renderLoadingState(domElements.volunteerTableBody);

    const result = await fetchAllVolunteers();

    if (!result.success) {
      renderErrorState(domElements.volunteerTableBody, result.error);
      appState.isLoading = false;
      return;
    }

    appState.volunteers = result.data;
    renderVolunteerTable(
      domElements.volunteerTableBody,
      appState.volunteers,
      handleVolunteerRowClick
    );

    appState.isLoading = false;
  } catch (err) {
    console.error('Error loading volunteers:', err);
    renderErrorState(domElements.volunteerTableBody, 'Failed to load volunteers');
    appState.isLoading = false;
  }
}

/**
 * Handle volunteer row click - navigate to profile
 */
function handleVolunteerRowClick(volunteerData) {
  localStorage.setItem('selectedVolunteer', JSON.stringify(volunteerData));
  window.location.href = 'vltr-profiel.html';
}

/**
 * Handle add volunteer form submission
 */
async function handleAddVolunteerSubmit(e) {
  e.preventDefault();

  try {
    if (appState.isLoading) {
      alert('Please wait, operation in progress...');
      return;
    }

    // Get form data
    const newVolunteer = getFormData(domElements.addVolunteerForm);

    // Validate data
    if (!newVolunteer['first name'] || !newVolunteer.name || !newVolunteer['ID number']) {
      alert('Please fill in all required fields');
      return;
    }

    appState.isLoading = true;

    // Add to database
    const result = await addNewVolunteer(newVolunteer);

    if (!result.success) {
      alert(`Error: ${result.error}`);
      appState.isLoading = false;
      return;
    }

    // Reload table and close modal
    await loadVolunteers();
    clearForm(domElements.addVolunteerForm);
    closeModal(domElements.addVolunteerModal);
    alert('Vrijwilliger succesvol toegevoegd!');
  } catch (err) {
    console.error('Error submitting form:', err);
    alert(`Error: ${err.message || 'Failed to add volunteer'}`);
    appState.isLoading = false;
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Add volunteer button
  if (domElements.addVolunteerBtn) {
    domElements.addVolunteerBtn.addEventListener('click', () => {
      openModal(domElements.addVolunteerModal);
    });
  }

  // Close modal - click outside
  if (domElements.addVolunteerModal) {
    domElements.addVolunteerModal.addEventListener('click', (e) => {
      if (e.target === domElements.addVolunteerModal) {
        closeModal(domElements.addVolunteerModal);
      }
    });
  }

  // Close modal - close button
  if (domElements.closeModalBtn) {
    domElements.closeModalBtn.addEventListener('click', () => {
      closeModal(domElements.addVolunteerModal);
    });
  }

  // Form submission
  if (domElements.addVolunteerForm) {
    domElements.addVolunteerForm.addEventListener('submit', handleAddVolunteerSubmit);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Expose for debugging if needed
window.app = {
  state: appState,
  reloadVolunteers: loadVolunteers
};

console.log('App controller loaded');
