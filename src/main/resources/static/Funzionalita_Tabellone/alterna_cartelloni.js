let currentCartellone = '';  // Dichiarato come variabile globale

function caricaPalinsesto(palinsestoURl) {
    fetch(palinsestoURl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const eventi = xmlDoc.getElementsByTagName('evento');
            let index = 0;

            function mostraEvento() {
                const evento = eventi[index];
                const fileHTML = evento.textContent.trim();
                currentCartellone = fileHTML.split('/').pop().split('.')[0]; // Aggiornamento di currentCartellone
                const tempo = parseInt(evento.getAttribute('tempo'), 10);

                fetch(fileHTML)
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById('contenuto').innerHTML = html;
                        setTimeout(prossimoEvento, tempo * 1000);
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

function inviaSegnalazione(codImpianto,codPalinsesto) {
    const idSegnalazione = generaIdUnivoco();
    //const codImpianto = 'IMPIANTO2'; // Valori statici per l'esempio
    const durataVisual = 10; // Esempio di durata

    // Crea l'oggetto segnalazione
    const segnalazione = {
        idSegnalazione: idSegnalazione,
        codImpianto: codImpianto,
        codPalinsesto: codPalinsesto,
        codCartellone: currentCartellone, // Utilizzo di currentCartellone aggiornato
        durataVisual: durataVisual
    };

    // Effettua la richiesta fetch alla servlet
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

// Carica il palinsesto e avvia le segnalazioni
const codImpianto = 'IMPIANTO3';
const codPalinsesto = 'palinsesto3';
const palinsestoURL = `/Palinsesti/${codPalinsesto}.xml`;

caricaPalinsesto(palinsestoURL);

setInterval(() => {
    inviaSegnalazione(codImpianto,codPalinsesto);
}, 5000);
