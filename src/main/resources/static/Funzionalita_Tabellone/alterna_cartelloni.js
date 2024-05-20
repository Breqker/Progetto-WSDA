
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


//carico palinsesto
caricaPalinsesto('/Palinsesti/palinsesto2.xml');
// Chiamare questa funzione quando si desidera inviare una segnalazione al sistema di monitoraggio

