const developers = [
    { name: "Alex Dupont", image: "dev1.jpg", price: 60, specialty: "Backend" },
    { name: "Marie Lefevre", image: "dev2.jpg", price: 75, specialty: "UI/UX" },
    { name: "Lucas Durand", image: "dev3.jpg", price: 90, specialty: "Fullstack" },
    { name: "Claire Bernard", image: "dev4.jpg", price: 85, specialty: "Performance" },
    { name: "Julien Morel", image: "dev5.jpg", price: 50, specialty: "Security" },
  ];
  
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
      `;
      container.appendChild(card);
    });
  }
  
  document.getElementById('priceFilter').addEventListener('change', function () {
    const filter = this.value;
    let sortedDevelopers = [...developers];
  
    if (filter === 'low') {
      sortedDevelopers.sort((a, b) => a.price - b.price);
    } else if (filter === 'high') {
      sortedDevelopers.sort((a, b) => b.price - a.price);
    }
  
    displayDevelopers(sortedDevelopers);
  });
  
  displayDevelopers(developers);