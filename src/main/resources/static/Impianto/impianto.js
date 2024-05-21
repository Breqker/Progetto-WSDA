document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([38.1157, 13.3615], 13); // Imposta la vista della mappa con le nuove coordinate

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Funzione per caricare lo stato degli impianti dal server e mostrarli nel div superiore e sulla mappa
    function caricaStatusImpianti() {
        fetch('http://localhost:8000/Progetto_WSDA_EE_war_exploded/getStatusImpianti')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debug
                data.forEach(impianto_ws => {
                    // Aggiungi un marker per ogni impianto_ws sulla mappa
                    var icon = L.icon({
                        iconUrl: impianto_ws.isActive ? '/Impianto/Immagini/switch-on.png' : '/Impianto/Immagini/switch-off.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -16]
                    });

                    L.marker([impianto_ws.latitudine, impianto_ws.longitudine], { icon: icon })
                        .addTo(map)
                        .bindPopup(`ID Impianto: ${impianto_ws.idImpianto}<br>ID Palinsesto: ${impianto_ws.idPalinsesto}<br>Latitudine: ${impianto_ws.latitudine}<br>Longitudine: ${impianto_ws.longitudine}<br>Attivo: ${impianto_ws.isActive}`);
                });
            })
            .catch(error => console.error('Errore:', error));
    }

    // Chiamata alla funzione per caricare lo stato degli impianti
    caricaStatusImpianti();
});
