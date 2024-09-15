// Fonction pour lire le CSV
async function lireCSV(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.text();
        const rows = data.split('\n').filter(row => row.trim() !== '');
        const conseils = [];
        rows.forEach(row => {
            // Diviser chaque ligne en colonnes avec point-virgule comme séparateur
            const columns = row.split(';').map(column => column.trim().replace(/^"|"$/g, ''));
            // Vérifier que la ligne contient bien deux colonnes
            if (columns.length >= 2) {
                // Extraire le conseil et l'URL de l'animation
                const conseil = columns[0];
                const animationUrl = columns[1];
                if (conseil && animationUrl) {
                    conseils.push({ conseil, animationUrl });
                }
            }
        });
        return conseils;
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier CSV :', error);
        return [];
    }
}

// Fonction pour générer une rotation aléatoire pour l'arrière-plan
function rotationAleatoire() {
    // Liste des angles possibles en degrés
    const angles = [45, 90, 135];
    
    // Choisir aléatoirement un angle parmi la liste
    const angle = angles[Math.floor(Math.random() * angles.length)];
    
    // Choisir aléatoirement le sens de rotation (1 pour horaire, -1 pour antihoraire)
    const sens = Math.random() < 0.5 ? 1 : -1;
    
    // Calculer l'angle final
    const angleFinal = angle * sens;
    
    // Appliquer la rotation à l'arrière-plan
    const background = document.querySelector('.background-blur');
    background.style.transform = `rotate(${angleFinal}deg)`;
}

// Fonction pour afficher un conseil aléatoire avec animation
function afficherConseil() {
    if (conseils.length === 0) {
        document.getElementById('conseil').innerText = 'Aucun conseil disponible.';
        document.getElementById('animation').src = '';
        return;
    }
    
    // Sélectionner un conseil aléatoire
    const index = Math.floor(Math.random() * conseils.length);
    const conseil = conseils[index].conseil;
    const animationUrl = conseils[index].animationUrl;

    // Mettre à jour le texte du conseil
    document.getElementById('conseil').innerText = conseil;
    
    // Mettre à jour l'URL de l'animation
    document.getElementById('animation').src = animationUrl;

    // Appliquer la rotation aléatoire à l'arrière-plan
    rotationAleatoire();
}

// Charger les conseils depuis le CSV
let conseils = [];
lireCSV('liste_conseils.csv').then(data => {
    conseils = data;
    afficherConseil();
});

// Événement pour afficher un conseil et tourner l'arrière-plan lors du clic sur le bouton
document.querySelector('.refresh-btn').addEventListener('click', afficherConseil);
