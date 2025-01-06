document.addEventListener("DOMContentLoaded", function() {
  // Tableau des suggestions d'auto-complétion
  const suggestionsData = [
    "Développement Web","Analogique et Numérique","Electronique Intelligente IoT","Video & Animation,"Telecomunication",
 "Bon commande","Graphims & Design", "Logo & Brand Identity", "Logo Design", "Graphic Charts", "Business Card & Stationery",
    "Digital Graphics", "Website Design", "Social Media Graphics", "Banner & AD Design", "Advanced & Specialized Graphics",
    "Motion Graphics & Specialized", "3D Design & Modeling", "Photo Editing & Retouching", "Accessibilité Web",
    "Responsive Design", "Design Adaptatif", "Mobile-First", "Grilles CSS", "Frameworks et Bibliothèques",
    "React", "Vue.js", "Angular", "Bootstrap", "Tailwind CSS", "Electronique", "Serveurs", "Bases de Données",
    "Sécurité Électronique", "Électronique Intelligent & IoT", "Support & Cybersécurité", "Firewall", "Cryptographie",
    "Consultation en cyber", "Gestion et management", "Test d'intrusion", "Services de conformité",
    "Dev Mobile", "Testing","Devops", "Android", "Java", "Kotlin", "Android SDK", "Firebase", "Material Design", "UI Designing"
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









//resoudre probleme survol
document.querySelectorAll('.navmenu ul li').forEach(item => {
  item.addEventListener('click', () => {
      document.querySelectorAll('.navmenu ul li').forEach(link => link.classList.remove('active'));
      item.classList.add('active');
  });
});


