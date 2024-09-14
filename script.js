// Liste de conseils sportifs
const conseils = [
    "Faites 30 minutes de marche chaque jour.",
    "Hydratez-vous régulièrement avant et après l'entraînement.",
    "Échauffez-vous toujours avant une séance intense.",
    "Variez vos exercices pour travailler tous vos muscles.",
    "Dormez au moins 7 à 8 heures par nuit pour une meilleure récupération.",
    "Mangez des protéines après l'entraînement pour renforcer vos muscles.",
    "Étirez-vous pour améliorer votre souplesse.",
    "Fixez-vous des objectifs clairs pour rester motivé."
];

// Fonction pour afficher un conseil aléatoire
function afficherConseil() {
    const index = Math.floor(Math.random() * conseils.length);
    document.getElementById('conseil').innerText = conseils[index];
}

// Afficher un conseil au chargement de la page
window.onload = afficherConseil;
