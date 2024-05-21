document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([38.1157, 13.3615], 13); // Imposta la vista della mappa con le nuove coordinate

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Funzione per caricare i dati degli impianti dal server e mostrarli nel div inferiore
    function caricaDatiImpianti() {
        fetch('http://localhost:8000/Progetto_WSDA_EE_war_exploded/getImpianti')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Debug
                const impiantiDiv = document.getElementById('impiantiDiv');
                data.forEach(impianto => {
                    const p = document.createElement('p');
                    p.textContent = `ID Impianto: ${impianto.idImpianto}, ID Palinsesto: ${impianto.idPalinsesto}, Latitudine: ${impianto.latitudine}, Longitudine: ${impianto.longitudine}`;
                    impiantiDiv.appendChild(p);
                });
            })
            .catch(error => console.error('Errore:', error));
    }

    // Funzione per caricare lo stato degli impianti dal server e mostrarli nel div superiore
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
                const topDiv = document.getElementById('top-div');
                data.forEach(impianto_ws => {
                    const p = document.createElement('p');
                    p.textContent = `ID Impianto: ${impianto_ws.idImpianto}, ID Palinsesto: ${impianto_ws.idPalinsesto}, Latitudine: ${impianto_ws.latitudine}, Longitudine: ${impianto_ws.longitudine}, Attivo: ${impianto_ws.isActive}`;
                    topDiv.appendChild(p);

                    // Aggiungi un marker per ogni impianto_ws sulla mappa
                    var icon = L.icon({
                        iconUrl: impianto_ws.isActive ? '/Impianto/Immagini/switch-on.png' : '/Impianto/Immagini/switch-off.png',
                        iconSize: [64, 64],
                        iconAnchor: [32, 64],
                        popupAnchor: [0, -32]
                    });

                    L.marker([impianto_ws.latitudine, impianto_ws.longitudine], { icon: icon })
                        .addTo(map)
                        .bindPopup(impianto_ws.idImpianto);
                });
            })
            .catch(error => console.error('Errore:', error));
    }

    // Chiamate alle funzioni per caricare i dati e lo stato degli impianti
    caricaDatiImpianti();
    caricaStatusImpianti();
});