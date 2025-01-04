document.getElementById("search").addEventListener("input", function() {
  let searchValue = this.value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    let cardTitle = card.querySelector("h4").textContent.toLowerCase();
    if (cardTitle.includes(searchValue)) {
      card.style.display = "block";  // Afficher la carte
    } else {
      card.style.display = "none";  // Cacher la carte
    }
  });
});

