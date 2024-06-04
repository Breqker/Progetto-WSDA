
let selectedRow = null;
let addModal = document.getElementById("addModal");
let editModal = document.getElementById("editModal");
let span = document.getElementsByClassName("close");

//FUNZIONI PER LE RIGHE
function selectRow(row) {
    if (selectedRow) {
        selectedRow.classList.remove('selected');
    }
    selectedRow = row;
    row.classList.add('selected');
}
function deleteRow(event, element) {
    event.stopPropagation();
    let row = element.closest('tr');
    selectRow(row);
    const id = selectedRow.cells[0].textContent;
    if (confirm('Sei sicuro di volere eliminare l\'impianto?')) {
        window.location.href = `/delete/${id}`;
    }
}

//FUNZIONI PER APRIRE E CHIUDERE I CONTENITORI MODIFICA E AGGIUNTA
function openEditModal(event, element) {
    event.stopPropagation();
    let row = element.closest('tr');
    selectRow(row);
    const id = selectedRow.cells[0].textContent;
    const oldPalinsestoId = selectedRow.cells[1].textContent;
    const oldLat = parseFloat(selectedRow.cells[2].textContent);
    const oldLon = parseFloat(selectedRow.cells[3].textContent);

    document.getElementById('editIdImpianto').value = id;
    document.getElementById('editStato').checked = selectedRow.cells[4].textContent.trim() === 'Attivo';
    document.getElementById('editPalinsesto').value = oldPalinsestoId;
    document.getElementById('editLatitudine').value = oldLat;
    document.getElementById('editLongitudine').value = oldLon;

    markerEdit.setLatLng([oldLat, oldLon]);

    setTimeout(function() {
        mapEdit.invalidateSize();
    }, 100);

    editModal.style.display = "block";
}
function closeEditModal() {
    editModal.style.display = "none";
}

function openAddModal() {
    addModal.style.display = "block";
}
function closeAddModal() {
    addModal.style.display = "none";
}


//TOGGLE CHECKBOX
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

function toggleStatoField(checkbox) {
    const statoValue = document.getElementById('editStatoValue');
    statoValue.value = checkbox.checked ? 'true' : 'false';
}
document.getElementById('editStato').onchange = function() {
    toggleStatoField(this);
};


//VALIDAZIONI VARIE SUI FORM
document.getElementById('addForm').onsubmit = function(event) {
    if (!validateForm('add')) {
        event.preventDefault();
    } else {
        const id = document.getElementById('IdImpianto').value;
        if (isIdAlreadyExists(id)) {
            alert('Impossibile aggiungere l\'impianto. L\'ID specificato è già in uso.');
            event.preventDefault();
        }
    }
};

function isIdAlreadyExists(id) {
    const existingIds = Array.from(document.querySelectorAll('#impiantiTable tbody tr')).map(row => row.cells[0].textContent);
    return existingIds.includes(id);
}


document.getElementById('editForm').onsubmit = function(event) {
    if (!validateForm('edit')) {
        event.preventDefault();
    }
    const id = document.getElementById('editIdImpianto').value;
    const statoValue = document.getElementById('editStato').checked ? 'true' : 'false';
    document.getElementById('editStatoValue').value = statoValue;
    this.action = `/mod/${id}`;
};
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
    function isDouble(value) {
        return !isNaN(value) && parseFloat(value) == value;
    }
}


//MAPPE

//mappa di Add
function setupMapForEdit() {
    var mapEdit = L.map('mapEdit').setView([38.1156, 13.3612], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mapEdit);

    var markerEdit = L.marker([38.1156, 13.3612], { draggable: true }).addTo(mapEdit);

    markerEdit.on('dragend', function(event) {
        var latlng = markerEdit.getLatLng();
        document.getElementById('editLatitudine').value = latlng.lat;
        document.getElementById('editLongitudine').value = latlng.lng;

        setTimeout(function() {
            mapEdit.invalidateSize();
        }, 100);
    });

    return { mapEdit, markerEdit };
}
const { mapEdit, markerEdit } = setupMapForEdit();

//mappa di Mod
document.addEventListener('DOMContentLoaded', function() {
    var mapAdd = L.map('mapAdd').setView([38.1156, 13.3612], 13);
    const map = document.getElementById('mapAdd');
    map.style.display = 'block';

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mapAdd);

    var markerAdd = L.marker([38.1156, 13.3612], { draggable: true }).addTo(mapAdd);

    markerAdd.on('dragend', function(event) {
        var latlng = markerAdd.getLatLng();
        document.getElementById('latitudine').value = latlng.lat;
        document.getElementById('longitudine').value = latlng.lng;

        setTimeout(function() {
            mapAdd.invalidateSize();
        }, 100);
    });

    document.getElementById('latitudine').onchange = function() {
        updateMarkerFromInputs(markerAdd);
    };
    document.getElementById('longitudine').onchange = function() {
        updateMarkerFromInputs(markerAdd);
    };

    function updateMarkerFromInputs(marker) {
        var lat = parseFloat(document.getElementById('latitudine').value);
        var lng = parseFloat(document.getElementById('longitudine').value);
        if (!isNaN(lat) && !isNaN(lng)) {
            marker.setLatLng([lat, lng]);

            setTimeout(function() {
                mapAdd.invalidateSize();
            }, 100);
        }
    }
});

//Mappa principale
document.addEventListener('DOMContentLoaded', function(){
    var mymap = L.map('mapid').setView([38.1156, 13.3612], 13);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mymap);

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

        marker.on('click', function() {
            impianto.scrollIntoView({ behavior: 'smooth', block: 'center' });
            selectRow(impianto);
        });
    });
});




