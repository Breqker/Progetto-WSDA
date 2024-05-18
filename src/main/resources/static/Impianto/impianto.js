document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([38.1157, 13.3615], 13); // Imposta la vista della mappa con le nuove coordinate

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Funzione per caricare i dati degli impianti dal server
    function caricaImpianti() {
        fetch('http://localhost:8000/getImpianti')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero degli impianti dal server');
                }
                return response.json(); // Converti la risposta in formato JSON
            })
            .then(impianti => {
                // Per ogni impianto ottenuto, aggiungi un marker sulla mappa
                impianti.forEach(impianto => {
                    var icon = L.icon({
                        iconUrl: impianto.attivo ? '/Impianto/Immagini/switch-on.png' : '/Impianto/Immagini/switch-off.png',
                        iconSize: [64, 64],
                        iconAnchor: [32, 64],
                        popupAnchor: [0, -32]
                    });

                    L.marker([impianto.latitudine, impianto.longitudine], { icon: icon })
                        .addTo(map)
                        .bindPopup('Impianto ' + impianto.id).on('popupopen', function() {
                        caricaPalinsesto(impianto.palinsesto);
                        inviaDatiImpianto(impianto.id, impianto.attivo, impianto.latitudine, impianto.longitudine);
                    });
                });
            })
            .catch(error => {
                console.error('Errore durante il recupero degli impianti dal server:', error);
            });
    }


    // Chiamata alla funzione per caricare gli impianti sulla mappa
    caricaImpianti();

    // Funzione che invia una segnalazione al server ogni 2 minuti
    function inviaSegnalazionePeriodica() {
        setInterval(function() {
            // Recupera i dati dall'ultimo impianto aggiunto
            var ultimoImpianto = impianti[impianti.length - 1];
            // Invia una segnalazione con i dati dell'ultimo impianto
            sendData(ultimoImpianto.id, ultimoImpianto.id, ultimoImpianto.id, 60); // Durata di 60 secondi per esempio
        }, 120000); // Invia una segnalazione ogni 2 minuti (120000 millisecondi)
    }

    // Chiamata alla funzione per inviare segnalazioni periodiche
    inviaSegnalazionePeriodica();

    // Funzione per ricevere segnalazioni dal server
    function riceviSegnalazione() {
        setInterval(function() {
            fetch('http://localhost:8000/receiveSignal')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Errore durante il recupero delle segnalazioni dal server');
                    }
                    return response.json(); // Converti la risposta in formato JSON
                })
                .then(segnalazione => {
                    // Elabora la segnalazione ricevuta
                    console.log('Segnalazione ricevuta:', segnalazione);
                    // Esempio: Aggiungi un marker sulla mappa per la segnalazione ricevuta
                    var icon = L.icon({
                        iconUrl: '/Segnalazione/Immagini/marker.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -16]
                    });
                    L.marker([segnalazione.latitudine, segnalazione.longitudine], { icon: icon })
                        .addTo(map)
                        .bindPopup('Segnalazione: ' + segnalazione.descrizione);
                })
                .catch(error => {
                    console.error('Errore durante il recupero delle segnalazioni dal server:', error);
                });
        }, 60000); // Controlla le segnalazioni ogni minuto (60000 millisecondi)
    }

    // Chiamata alla funzione per ricevere segnalazioni dal server
    riceviSegnalazione();
});

// Funzione che invia i dati dell'impianto al server
function inviaDatiImpianto(idimpianto, descrizione, latitudine, longitudine) {
    const datiImpianto = {
        id: idimpianto,
        descrizione: descrizione,
        latitudine: latitudine,
        longitudine: longitudine
    };

    fetch('http://localhost:8000/monitoraggio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiImpianto),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante l\'invio dei dati dell\'impianto');
            }
            console.log('Dati dell\'impianto inviati con successo');
        })
        .catch(error => {
            console.error('Errore durante l\'invio dei dati dell\'impianto:', error);
        });
}

// Funzione che invia i dati della segnalazione al server
function sendData(idImpianto, idPalinsesto, idCartellone, durata) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/receiveSignal", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send("idimpianto=" + idImpianto + "&idpalinsesto=" + idPalinsesto + "&idcartellone=" + idCartellone + "&durata=" + durata);
}
