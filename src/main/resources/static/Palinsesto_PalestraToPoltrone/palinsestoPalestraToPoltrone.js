// Funzione per caricare e eseguire il palinsesto XML
function caricaPalinsesto() {
    fetch('palinsestoPalestraToPoltrone.xml') // Assicurarsi che il nome del file XML sia corretto
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const eventi = xmlDoc.getElementsByTagName('evento');
            let index = 0;

            function mostraEvento() {
                const evento = eventi[index];
                const fileHTML = evento.textContent.trim();
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

// Chiamata alla funzione per avviare il palinsesto
caricaPalinsesto();