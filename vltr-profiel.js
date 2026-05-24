/**
 * Volunteer Profile Page
 * 
 * Displays volunteer profile information and generates QR code.
 * Separates data retrieval, UI rendering, and animations.
 */

/**
 * Load volunteer data from localStorage
 * @returns {Object|null} The volunteer data or null if not found
 */
function loadVolunteerData() {
  const stored = localStorage.getItem('selectedVolunteer');
  
  if (!stored) {
    console.warn('No volunteer data found in localStorage');
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error parsing volunteer data:', err);
    return null;
  }
}

/**
 * Split full name into first and last name
 * @param {string} fullName - The full name string
 * @returns {Object} Object with firstName and lastName properties
 */
function splitName(fullName) {
  const parts = fullName.split(' ');
  return {
    firstName: parts[0] || fullName,
    lastName: parts.slice(1).join(' ') || ''
  };
}

/**
 * Update the profile UI with volunteer data
 * @param {Object} volunteerData - The volunteer data object
 */
function renderProfileData(volunteerData) {
  const { firstName, lastName } = splitName(volunteerData.name);

  // Update text content (safe DOM method)
  const nameEl = document.getElementById('volunteerName');
  const firstNameEl = document.getElementById('volunteerFirstName');
  const lastNameEl = document.getElementById('volunteerLastName');
  const idEl = document.getElementById('volunteerID');
  const genderEl = document.getElementById('volunteerGender');
  const birthDateEl = document.getElementById('volunteerBirthDate');
  const badgeIdEl = document.getElementById('volunteerBadgeID');

  if (nameEl) nameEl.textContent = volunteerData.name;
  if (firstNameEl) firstNameEl.textContent = firstName;
  if (lastNameEl) lastNameEl.textContent = lastName;
  if (idEl) idEl.textContent = volunteerData.idNumber;
  if (genderEl) genderEl.textContent = volunteerData.gender === 'M' ? 'Man' : 'Vrouw';
  if (birthDateEl) birthDateEl.textContent = volunteerData.birthDate;

  // Update badge ID
  const volunteerCode = volunteerData.fullRecord?.code || volunteerData.idNumber;
  if (badgeIdEl) badgeIdEl.textContent = `#${volunteerCode}`;

  // Generate and set QR code
  generateQRCode(volunteerData.idNumber);
}

/**
 * Generate and display QR code
 * @param {string} volunteerId - The volunteer ID number
 */
function generateQRCode(volunteerId) {
  const qrImg = document.getElementById('volunteerQR');
  if (!qrImg) return;

  const profileUrl = `${window.location.origin}${window.location.pathname.replace('vltr-profiel.html', 'vltr-profiel.html')}?volunteer=${encodeURIComponent(volunteerId)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
  
  qrImg.src = qrCodeUrl;
  qrImg.alt = `QR code for volunteer ${volunteerId}`;
}

/**
 * Animate cards on page load
 */
function animatePageElements() {
  const cards = document.querySelectorAll('.card, .badge-card, section');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });
}

/**
 * Setup back button handler
 */
function setupBackButton() {
  const backButton = document.getElementById('backButton');
  
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = 'Index.html';
    });
  }
}

/**
 * Initialize the profile page
 */
function initializeProfilePage() {
  console.log('Initializing volunteer profile page...');

  // Load volunteer data
  const volunteerData = loadVolunteerData();

  if (!volunteerData) {
    console.error('No volunteer data available - redirecting to main page');
    window.location.href = 'Index.html';
    return;
  }

  // Render profile data to UI
  renderProfileData(volunteerData);

  // Setup back button
  setupBackButton();

  // Animate page elements
  animatePageElements();

  console.log('Profile page initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfilePage);
} else {
  initializeProfilePage();
}

console.log('Volunteer profile module loaded');