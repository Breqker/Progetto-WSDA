let selectedRow = null;
let addModal = document.getElementById("addModal");
let editModal = document.getElementById("editModal");
let btnAggiungi = document.getElementById("aggiungi");
let btnModifica = document.getElementById("modifica");
let span = document.getElementsByClassName("close");

function selectRow(row) {
    if (selectedRow) {
        selectedRow.classList.remove('selected');
    }
    selectedRow = row;
    row.classList.add('selected');
}

btnAggiungi.onclick = function() {
    addModal.style.display = "block";
}

btnModifica.onclick = function() {
    if (selectedRow) {
        const id = selectedRow.cells[0].textContent;
        document.getElementById('editIdImpianto').value = id;
        document.getElementById('editLatitudine').value = selectedRow.cells[2].textContent;
        document.getElementById('editLongitudine').value = selectedRow.cells[3].textContent;
        document.getElementById('editStato').checked = selectedRow.cells[4].textContent === 'Attivo';
        editModal.style.display = "block";
    } else {
        alert('Seleziona una riga prima.');
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

document.getElementById('elimina').addEventListener('click', function() {
    if (selectedRow) {
        const id = selectedRow.cells[0].textContent;
        if (confirm('Sei sicuro di volere eliminare l\'impianto?')) {
            window.location.href = `/dbaccess/delete/${id}`;
        }
    } else {
        alert('Seleziona una riga prima.');
    }
});

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
