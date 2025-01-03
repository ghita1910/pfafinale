document.addEventListener("DOMContentLoaded", function() {
  // Tableau des suggestions d'auto-complétion
  const suggestionsData = [
    "Dev Web", "M.Learning", "Data Science", "Cybersécurité", "Administration System",
    "Gestion Projet", "Dev mobile", "React", "Vue.js", "Angular", "Bootstrap", "Tailwind CSS",
    "Android", "Java", "Kotlin", "Firebase", "Material Design"
  ];

  // Fonction d'auto-complétion qui se déclenche à chaque frappe dans l'input
  function autoComplete() {
    const input = document.getElementById('searchInput').value;
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = ''; // Vider les suggestions précédentes

    // Si le champ de recherche est vide, ne rien afficher
    if (input === '') {
      return;
    }

    // Filtrer les suggestions qui commencent par l'entrée de l'utilisateur
    const filteredSuggestions = suggestionsData.filter(item => 
      item.toLowerCase().startsWith(input.toLowerCase())
    );

    // Ajouter les suggestions filtrées à la liste
    filteredSuggestions.forEach(suggestion => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = suggestion;
      suggestionItem.onclick = () => selectSuggestion(suggestion); // Sélectionner une suggestion
      suggestionsBox.appendChild(suggestionItem);
    });
  }

  // Fonction qui remplit l'input avec la suggestion sélectionnée
  function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    document.getElementById('suggestions').innerHTML = ''; // Vider les suggestions après sélection
  }

  // Attacher la fonction à l'événement keyup de l'input
  document.getElementById('searchInput').addEventListener('keyup', autoComplete);
});








