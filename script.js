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

// Charger les conseils depuis le CSV
let conseils = [];
lireCSV('liste_conseils.csv').then(data => {
    conseils = data;
    afficherConseil();
});

// Fonction pour afficher un conseil aléatoire avec animation
function afficherConseil() {
    if (conseils.length === 0) {
        document.getElementById('conseil').innerText = 'Aucun conseil disponible.';
        document.getElementById('animation').src = '';
        return;
    }

    const index = Math.floor(Math.random() * conseils.length);
    const conseil = conseils[index].conseil;
    const animationUrl = conseils[index].animationUrl;

    // Mettre à jour le texte du conseil
    document.getElementById('conseil').innerText = conseil;

    // Mettre à jour l'URL de l'animation
    document.getElementById('animation').src = animationUrl;
}

// Écouter l'événement keydown pour changer le conseil avec la barre d'espace
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') { // Vérifie si la touche est la barre d'espace
        event.preventDefault(); // Empêche le comportement par défaut de la barre d'espace (scrolling)
        afficherConseil();
    }
});
