document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([38.1157, 13.3615], 13); // Imposta la vista della mappa con le nuove coordinate

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Esempio di dati sugli impianti (da sostituire con i dati reali dal database)
    var impianti = [
        { id: 1, latitudine: 38.1157, longitudine: 13.3615, attivo: true, palinsesto: '/Progetto-WSDA/src/main/resources/static/Palinsesti/palinsesto1.xml' },
        { id: 2, latitudine: 38.1200, longitudine: 13.3600, attivo: false, palinsesto: '/Progetto-WSDA/src/main/resources/static/Palinsesti/palinsesto2.xml' } // Esempio di un secondo impianto con diverse coordinate
    ];

    impianti.forEach(function(impianto) {
        var icon = L.icon({
            iconUrl: impianto.attivo ? '/Progetto-WSDA/src/main/resources/static/Impianto/Immagini/switch-on.png' : '/Progetto-WSDA/src/main/resources/static/Impianto/Immagini/switch-off.png',
            iconSize: [64, 64],
            iconAnchor: [32, 64],
            popupAnchor: [0, -32]
        });

        L.marker([impianto.latitudine, impianto.longitudine], { icon: icon }).addTo(map).bindPopup('Impianto ' + impianto.id).on('popupopen', function() {
            caricaPalinsesto(impianto.palinsesto);
            inviaDatiImpianto(impianto.id, impianto.attivo, impianto.latitudine, impianto.longitudine);
        });
    });
});

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
