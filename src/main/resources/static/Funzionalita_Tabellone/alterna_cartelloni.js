let currentCartellone = '';
let currentDurataVisual = 1;

const scriptElement = document.querySelector('script[src="/Funzionalita_Tabellone/alterna_cartelloni.js"]');
const codImpianto = scriptElement.getAttribute('data-cod-impianto');
const codPalinsesto = scriptElement.getAttribute('data-cod-palinsesto');
const palinsestoPath = scriptElement.getAttribute('data-palinsesto-path');

if (palinsestoPath) {
    caricaPalinsesto(palinsestoPath);
} else {
    console.error('Errore: palinsestoPath non definito');
}

function caricaPalinsesto(palinsestoURL) {
    fetch(palinsestoURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const eventi = xmlDoc.getElementsByTagName('evento');
            let index = 0;

            function mostraEvento() {
                if (eventi.length === 0) {
                    console.error('Errore: nessun evento trovato nel palinsesto');
                    return;
                }
                const evento = eventi[index];
                const fileHTML = evento.textContent.trim();
                currentCartellone = fileHTML.split('/').pop().split('.')[0];

                // Estrazione dell'attributo tempo dell'evento corrente
                const tempoCorrente = parseInt(evento.getAttribute('tempo'), 10);
                // Estrazione dell'attributo tempo dell'evento successivo
                const tempoSuccessivo = parseInt(eventi[(index + 1) % eventi.length].getAttribute('tempo'), 10);
                // Calcolo della durata visuale come differenza tra il tempo successivo e il tempo corrente
                currentDurataVisual = tempoSuccessivo - tempoCorrente;

                fetch(fileHTML)
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById('contenuto').innerHTML = html;
                        setTimeout(prossimoEvento, currentDurataVisual * 1000);
                    });

                index = (index + 1) % eventi.length;
            }

            function prossimoEvento() {
                mostraEvento();
            }

            mostraEvento();
        })
        .catch(error => console.error('Errore nel caricamento del palinsesto:', error));
}




let segnalazioneCounter = 0;

function generaIdUnivoco() {
    segnalazioneCounter += 1;
    return 'segnalazione_' + segnalazioneCounter + '_' + Date.now();
}

function inviaSegnalazione(codImpianto, codPalinsesto) {
    const idSegnalazione = generaIdUnivoco();


    const segnalazione = {
        idSegnalazione: idSegnalazione,
        codImpianto: codImpianto,
        codPalinsesto: codPalinsesto,
        codCartellone: currentCartellone,
        durataVisual: currentDurataVisual
    };


    fetch('http://localhost:8000/Progetto_WSDA_EE_war_exploded/monitoraggio_servlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(segnalazione)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante l\'invio della segnalazione');
            }
            console.log('Segnalazione inviata con successo');
            return response.text(); // Ritorna il testo della risposta
        })
        .then(data => {
            const rispostaServerElem = document.getElementById("rispostaServer");
            if (rispostaServerElem) {
                rispostaServerElem.innerText = data;
            }
        })
        .catch(error => {
            const rispostaServerElem = document.getElementById("rispostaServer");
            if (rispostaServerElem) {
                rispostaServerElem.innerText = 'Errore: ' + error.message;
            }
            console.error('Errore durante l\'invio della segnalazione:', error);
        });
}




caricaPalinsesto(palinsestoURL);


setInterval(() => {
    inviaSegnalazione(codImpianto, codPalinsesto);
}, 5000);
