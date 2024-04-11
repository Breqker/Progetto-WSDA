const teslaAd = document.getElementById('teslaAd');
const appleAd = document.getElementById('appleAd');

let currentAd = 'tesla';

function switchAd() {
    if (currentAd === 'tesla') {
        teslaAd.classList.add('hidden');
        appleAd.classList.remove('hidden');
        currentAd = 'apple';
    } else {
        appleAd.classList.add('hidden');
        teslaAd.classList.remove('hidden');
        currentAd = 'tesla';
    }
}

// Cambio pubblicità ogni 10 secondi
setInterval(switchAd, 10000);
