
// Sélectionner tous les liens dans les sous-menus
const submenuLinks = document.querySelectorAll('.submenu a');

// Ajouter un événement de clic à chaque lien
submenuLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Réinitialiser l'état du sous-menu après le clic
    const dropdownMenu = link.closest('.dropdown');
    const submenu = dropdownMenu.querySelector('.submenu');
    submenu.style.display = 'none'; // Cacher le sous-menu lorsque l'utilisateur clique sur un lien
  });
});




// Array of developer data
const developers = [
    { name: "Jean Dupont", image: "dev9.jpg", price: 50, specialty: "automated" },
    { name: "Alice Moreau", image: "dev4.jpg", price: 80, specialty: "performance" },
    { name: "Marc Durand", image: "dev10.jpeg", price: 60, specialty: "security" },
    { name: "Sophie Martin", image: "dev3.jpg", price: 40, specialty: "automated" },
    { name: "Lucas Bernard", image: "dev8.jpg", price: 90, specialty: "manual" },
    { name: "Clara Lefevre", image: "dev5.jpg", price: 55, specialty: "performance" },
    { name: "David Tanguy", image: "dev7.jpg", price: 75, specialty: "security" },
    { name: "Marc Lefevre", image: "dev6.jpg", price: 65, specialty: "automated" },
    { name: "Julien Martin", image: "dev2.jpg", price: 85, specialty: "manual" },
    { name: "Claire Lefevre", image: "dev1.jpg", price: 95, specialty: "performance" }
  ];
  
  // Function to display developers
  function displayDevelopers(filteredDevelopers) {
    const container = document.getElementById('developerCards');
    container.innerHTML = '';
  
    filteredDevelopers.forEach(developer => {
      const card = document.createElement('div');
      card.classList.add('developer-card');
      card.innerHTML = `
        <img src="${developer.image}" alt="${developer.name}">
        <div class="developer-info">
          <h3>${developer.name}</h3>
          <p>Spécialité: ${developer.specialty}</p>
          <div class="developer-price">$${developer.price} / jour</div>
        </div>
        <div class="developer-hover">
          <span>Voir plus</span>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  // Handle price filter
  document.getElementById('priceFilter').addEventListener('change', function () {
    const filter = this.value;
    let sortedDevelopers = [...developers];
  
    if (filter === 'low') {
      sortedDevelopers.sort((a, b) => a.price - b.price);
    } else if (filter === 'high') {
      sortedDevelopers.sort((a, b) => b.price - a.price);
    }
  
    const specialtyFilter = document.getElementById('specialtyFilter').value;
    if (specialtyFilter !== 'all') {
      sortedDevelopers = sortedDevelopers.filter(developer => developer.specialty === specialtyFilter);
    }
  
    displayDevelopers(sortedDevelopers);
  });
  
  // Handle specialty filter
  document.getElementById('specialtyFilter').addEventListener('change', function () {
    const specialtyFilter = this.value;
    let filteredDevelopers = [...developers];
  
    if (specialtyFilter !== 'all') {
      filteredDevelopers = filteredDevelopers.filter(developer => developer.specialty === specialtyFilter);
    }
  
    displayDevelopers(filteredDevelopers);
  });
  
  // Initial display of developers
  displayDevelopers(developers);
  