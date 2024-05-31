let selectedRow = null;
let addModal = document.getElementById("addModal");
let editModal = document.getElementById("editModal");
let btnBackToMain = document.getElementById("backToMain");
let span = document.getElementsByClassName("close");

function selectRow(row) {
    if (selectedRow) {
        selectedRow.classList.remove('selected');
    }
    selectedRow = row;
    row.classList.add('selected');
}

function openAddModal() {
    addModal.style.display = "block";
}

function openEditModal(event, element) {
    event.stopPropagation();
    let row = element.closest('tr');
    selectRow(row);
    const id = selectedRow.cells[0].textContent;
    document.getElementById('editIdImpianto').value = id;
    document.getElementById('editLatitudine').value = selectedRow.cells[2].textContent;
    document.getElementById('editLongitudine').value = selectedRow.cells[3].textContent;
    document.getElementById('editStato').checked = selectedRow.cells[4].textContent === 'Attivo';
    editModal.style.display = "block";
}

function closeEditModal() {
    editModal.style.display = "none";
}
function deleteRow(event, element) {
    event.stopPropagation();
    let row = element.closest('tr');
    selectRow(row);
    const id = selectedRow.cells[0].textContent;
    if (confirm('Sei sicuro di volere eliminare l\'impianto?')) {
        window.location.href = `/dbaccess/delete/${id}`;
    }
}

for (let i = 0; i < span.length; i++) {
    span[i].onclick = function() {
        addModal.style.display = "none";
        editModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    } else if (event.target == editModal) {
        editModal.style.display = "none";
    }
}

document.getElementById('addForm').onsubmit = function(event) {
    if (!validateForm('add')) {
        event.preventDefault();
    }
};

document.getElementById('editForm').onsubmit = function(event) {
    if (!validateForm('edit')) {
        event.preventDefault();
    }
    const id = document.getElementById('editIdImpianto').value;
    this.action = `/dbaccess/mod/${id}`;
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
}

function isDouble(value) {
    return !isNaN(value) && parseFloat(value) == value;
}

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    if (path.includes('add') || path.includes('edit') || path.includes('delete')) {
        btnBackToMain.style.display = 'block';
    } else {
        btnBackToMain.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione mappa
    var mymap = L.map('mapid').setView([45.4642, 9.1900], 13); // Coordinate di Milano

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
                        <b>Stato:</b> ${stato}`);

        // Aggiungi un click listener per aprire il modale di modifica
        marker.on('click', function(event) {
            openEditModal(event, impianto.querySelector('img[action="edit"]'));
        });
    });
});




