// Fonction pour lire le CSV
async function lireCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split('\n').filter(row => row.trim() !== '');
    const conseils = [];
    rows.forEach(row => {
        const [conseil, animationUrl] = row.split(',');
        conseils.push({ conseil: conseil.trim(), animationUrl: animationUrl.trim() });
    });
    return conseils;
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
    document.getElementById('conseil').innerText = conseil;
    document.getElementById('animation').src = animationUrl;
}
