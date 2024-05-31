// Variabili globali
let selectedRow = null;
let addModal = document.getElementById("addModal");
let editModal = document.getElementById("editModal");
let span = document.getElementsByClassName("close");

// Funzione per selezionare una riga della tabella
function selectRow(row) {
    if (selectedRow) {
        selectedRow.classList.remove('selected');
    }
    selectedRow = row;
    row.classList.add('selected');
}

// Funzione per aprire il modal di aggiunta
function openAddModal() {
    addModal.style.display = "block";
}

// Funzione per mostrare/nascondere i campi di latitudine e longitudine
function toggleLatLongFields(checkbox) {
    const map = document.getElementById('mapEdit');
    const latField = document.getElementById('latitudineField');
    const longField = document.getElementById('longitudineField');

    if (checkbox.checked) {
        map.style.display = 'block';
        latField.style.display = 'block';
        longField.style.display = 'block';
    } else {
        map.style.display = 'none';
        latField.style.display = 'none';
        longField.style.display = 'none';
    }
}

// Inizializza la mappa nel modal di modifica
function setupMapForEdit() {
    // Inizializzazione mappa Leaflet
    var mapEdit = L.map('mapEdit').setView([38.1156, 13.3612], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mapEdit);

    var markerEdit = L.marker([38.1156, 13.3612], { draggable: true }).addTo(mapEdit);

    // Evento per aggiornare i campi latitudine e longitudine quando il marker viene trascinato
    markerEdit.on('dragend', function(event) {
        var latlng = markerEdit.getLatLng();
        document.getElementById('editLatitudine').value = latlng.lat;
        document.getElementById('editLongitudine').value = latlng.lng;

        // Aggiorna la mappa per renderla visibile completamente dopo aver spostato il marker
        setTimeout(function() {
            mapEdit.invalidateSize();
        }, 100);
    });

    return { mapEdit, markerEdit };
}

const { mapEdit, markerEdit } = setupMapForEdit();

// Funzione per aprire il modal di modifica
function openEditModal(event, element) {
    event.stopPropagation();
    let row = element.closest('tr');
    selectRow(row);
    const id = selectedRow.cells[0].textContent;
    const oldLat = parseFloat(selectedRow.cells[2].textContent);
    const oldLon = parseFloat(selectedRow.cells[3].textContent);

    document.getElementById('editIdImpianto').value = id;
    document.getElementById('editStato').checked = selectedRow.cells[4].textContent.trim() === 'Attivo';

    // Riempie i campi di latitudine e longitudine con i valori iniziali
    document.getElementById('editLatitudine').value = oldLat;
    document.getElementById('editLongitudine').value = oldLon;

    // Mostra i campi di latitudine e longitudine
    toggleLatLongFields(document.getElementById('editStato'));

    // Sposta il marker nella posizione iniziale
    markerEdit.setLatLng([oldLat, oldLon]);

    // Aggiorna la mappa per renderla visibile completamente
    setTimeout(function() {
        mapEdit.invalidateSize();
    }, 100);

    editModal.style.display = "block";
}

// Funzione per gestire il checkbox stato in modalità di modifica
function toggleStatoField(checkbox) {
    const statoValue = document.getElementById('editStatoValue');
    statoValue.value = checkbox.checked ? 'true' : 'false';
}

// Event listener per il cambiamento di stato
document.getElementById('editStato').onchange = function() {
    toggleStatoField(this);
    toggleLatLongFields(this);
};

// Funzione per chiudere il modal di modifica
function closeEditModal() {
    editModal.style.display = "none";
}

// Funzione per eliminare una riga dalla tabella
function deleteRow(event, element) {
    event.stopPropagation();
    let row = element.closest('tr');
    selectRow(row);
    const id = selectedRow.cells[0].textContent;
    if (confirm('Sei sicuro di volere eliminare l\'impianto?')) {
        window.location.href = `/dbaccess/delete/${id}`;
    }
}

// Event listener per i pulsanti di chiusura dei modal
for (let i = 0; i < span.length; i++) {
    span[i].onclick = function() {
        addModal.style.display = "none";
        editModal.style.display = "none";
    }
}

// Event listener per chiudere i modal cliccando fuori
window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    } else if (event.target == editModal) {
        editModal.style.display = "none";
    }
}

// Validazione del form di aggiunta
document.getElementById('addForm').onsubmit = function(event) {
    if (!validateForm('add')) {
        event.preventDefault();
    }
};

// Validazione del form di modifica
document.getElementById('editForm').onsubmit = function(event) {
    if (!validateForm('edit')) {
        event.preventDefault();
    }
    const id = document.getElementById('editIdImpianto').value;
    const statoValue = document.getElementById('editStato').checked ? 'true' : 'false';
    document.getElementById('editStatoValue').value = statoValue;
    this.action = `/dbaccess/mod/${id}`;
};

// Funzione per validare i campi di latitudine e longitudine
function validateForm(type) {
    let idField = type === 'add' ? document.getElementById('IdImpianto') : document.getElementById('editIdImpianto');
    let latField = type === 'add' ? document.getElementById('latitudine') : document.getElementById('editLatitudine');
    let longField = type === 'add' ? document.getElementById('longitudine') : document.getElementById('editLongitudine');

    idField.value = idField.value.toUpperCase().replace(/\s+/g, '');
    if (!isDouble(latField.value)) {
        alert('Latitudine deve essere un numero.');
        return false;
    }
    if (!isDouble(longField.value)) {
        alert('Longitudine deve essere un numero.');
        return false;
    }
    return true;
}

// Funzione per verificare se un valore è un numero double valido
function isDouble(value) {
    return !isNaN(value) && parseFloat(value) == value;
}


/// Inizializzazione della mappa nel modal di aggiunta
// Inizializzazione della mappa nel modal di aggiunta
document.addEventListener('DOMContentLoaded', function() {
    var mapAdd = L.map('mapAdd').setView([38.1156, 13.3612], 13);
    const map = document.getElementById('mapAdd');
    map.style.display = 'block';

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mapAdd);

    var markerAdd = L.marker([38.1156, 13.3612], { draggable: true }).addTo(mapAdd);

    // Evento per aggiornare i campi latitudine e longitudine quando il marker viene trascinato
    markerAdd.on('dragend', function(event) {
        var latlng = markerAdd.getLatLng();
        document.getElementById('latitudine').value = latlng.lat;
        document.getElementById('longitudine').value = latlng.lng;

        // Aggiorna la mappa per renderla visibile completamente dopo aver spostato il marker
        setTimeout(function() {
            mapAdd.invalidateSize();
        }, 100);
    });
});

// Funzione per chiudere il modal di aggiunta
function closeAddModal() {
    addModal.style.display = "none";
}



// Event listener per mostrare o nascondere il pulsante "Torna alla pagina principale"
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    if (path.includes('add') || path.includes('edit') || path.includes('delete')) {
        btnBackToMain.style.display = 'block';
    } else {
        btnBackToMain.style.display = 'none';
    }

    // Inizializza i campi visibilità alla pagina caricata
    toggleLatLongFields(document.getElementById('stato'));
    toggleLatLongFields(document.getElementById('editStato'));
});

// Inizializzazione della mappa principale
document.addEventListener('DOMContentLoaded', function() {
    var mymap = L.map('mapid').setView([38.1156, 13.3612], 13);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mymap);

    // Aggiungi i marker per ogni impianto
    var impianti = document.querySelectorAll('#impiantiTable tbody tr');

    impianti.forEach(function(impianto) {
        var lat = parseFloat(impianto.cells[2].textContent);
        var lon = parseFloat(impianto.cells[3].textContent);
        var nomePalinsesto = impianto.cells[1].textContent;

        var stato = impianto.cells[4].textContent.trim() === 'Attivo' ? 'Attivo' : 'Non attivo';

        var marker = L.marker([lat, lon]).addTo(mymap)
            .bindPopup(`<b>ID Impianto:</b> ${impianto.cells[0].textContent}<br>
                        <b>Palinsesto:</b> ${nomePalinsesto}<br>
                        <b>Latitudine:</b> ${lat}<br>
                        <b>Longitudine:</b> ${lon}<br>
                        <b>Stato:</b> ${stato}`);

        // Aggiungi evento per la selezione della riga cliccando sul marker
        marker.on('click', function() {
            impianto.scrollIntoView({ behavior: 'smooth', block: 'center' });
            selectRow(impianto);
        });
    });
});
