
function caricaPalinsesto() {
    fetch('/Progetto-WSDA/src/main/resources/static/Palinsesto5/palinsesto5.xml')
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

caricaPalinsesto();