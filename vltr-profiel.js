// Haal volunteer data uit localStorage en vul de profiel in
document.addEventListener("DOMContentLoaded", () => {
  const volunteerData = JSON.parse(localStorage.getItem("selectedVolunteer"));

  if (volunteerData) {
    // Vul de profiel informatie in
    document.getElementById("volunteerName").textContent = volunteerData.name;
    document.getElementById("volunteerID").textContent = volunteerData.idNumber;
    document.getElementById("volunteerGender").textContent = volunteerData.gender === "M" ? "Man" : "Vrouw";
    document.getElementById("volunteerBirthDate").textContent = volunteerData.birthDate;
  }
});

// Terug knop functionaliteit
document.getElementById("backButton")?.addEventListener("click", () => {
  window.location.href = "Index.html";
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