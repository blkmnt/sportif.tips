// Variable pour stocker les conseils
let conseils = [];

// Fonction pour charger les conseils depuis le fichier CSV
function chargerConseils() {
    const csvFilePath = 'liste_conseils.csv'; // Remplacez par le chemin correct vers votre fichier CSV

    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            // Convertir le texte CSV en un tableau de conseils
            conseils = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
            console.log(conseils);

            // Afficher un conseil après avoir chargé les données
            afficherConseil();
        })
        .catch(error => console.error('Il y a eu un problème avec la récupération du fichier CSV:', error));
}

// Fonction pour afficher un conseil aléatoire
function afficherConseil() {
    if (conseils.length === 0) {
        console.error('La liste des conseils est vide.');
        return;
    }

    const index = Math.floor(Math.random() * conseils.length);
    document.getElementById('conseil').innerText = conseils[index];
}

// Charger les conseils au chargement de la page
window.onload = chargerConseils;
