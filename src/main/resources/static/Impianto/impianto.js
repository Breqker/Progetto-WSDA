document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([38.1157, 13.3615], 13); // Imposta la vista della mappa con le nuove coordinate

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Esempio di dati sugli impianti (da sostituire con i dati reali dal database)
    var impianti = [
        { id: 1, lat: 38.1157, lng: 13.3615, attivo: true },
        { id: 2, lat: 38.1200, lng: 13.3600, attivo: false } // Esempio di un secondo impianto con diverse coordinate
    ];

    impianti.forEach(function(impianto) {
        var icon = L.icon({
            iconUrl: impianto.attivo ? '/Progetto-WSDA/src/main/resources/static/Impianto/Immagini/switch-on.png' : '/Progetto-WSDA/src/main/resources/static/Impianto/Immagini/switch-off.png',
            iconSize: [64, 64],
            iconAnchor: [32, 64],
            popupAnchor: [0, -32]
        });

        L.marker([impianto.lat, impianto.lng], { icon: icon }).addTo(map).bindPopup('Impianto ' + impianto.id);
    });
});
