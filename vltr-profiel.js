// Haal volunteer data uit localStorage en vul de profiel in
document.addEventListener("DOMContentLoaded", () => {
  const volunteerData = JSON.parse(localStorage.getItem("selectedVolunteer"));

  if (volunteerData) {
    // Split de volledige naam in voornaam en achternaam
    const nameParts = volunteerData.name.split(' ');
    const firstName = nameParts[0] || volunteerData.name;
    const lastName = nameParts.slice(1).join(' ') || '';

    // Vul de profiel informatie in
    document.getElementById("volunteerName").textContent = volunteerData.name;
    document.getElementById("volunteerFirstName").textContent = firstName;
    document.getElementById("volunteerLastName").textContent = lastName;
    document.getElementById("volunteerID").textContent = volunteerData.idNumber;
    document.getElementById("volunteerGender").textContent = volunteerData.gender === "M" ? "Man" : "Vrouw";
    document.getElementById("volunteerBirthDate").textContent = volunteerData.birthDate;

    // QR Code genereren met link naar vrijwilliger profiel
    const profileUrl = `${window.location.origin}${window.location.pathname.replace('vltr-profiel.html', 'vltr-profiel.html')}?volunteer=${encodeURIComponent(volunteerData.idNumber)}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
    document.getElementById("volunteerQR").src = qrCodeUrl;

    // Haal code uit fullRecord of gebruik standaard waarde
    const volunteerCode = volunteerData.fullRecord?.code || volunteerData.idNumber;
    document.getElementById("volunteerBadgeID").textContent = `#${volunteerCode}`;
  }
});

// Terug knop functionaliteit
document.getElementById("backButton")?.addEventListener("click", () => {
  window.location.href = "Index.html";
});

// Card animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .badge-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
});



document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('section');

    cards.forEach((card, index) => {

        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);

    });

});