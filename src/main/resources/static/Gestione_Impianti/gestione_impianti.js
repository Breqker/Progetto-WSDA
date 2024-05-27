document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('impiantiTable').getElementsByTagName('tbody')[0];
    const addBtn = document.getElementById('addImpiantoBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelBtn');
    const impiantoForm = document.getElementById('impiantoForm');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');

    const confirmModal = document.getElementById('confirmModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    let rowToDelete = null;

    let isEditing = false;
    let currentRow;

    table.addEventListener('change', function(e) {
        if (e.target.classList.contains('toggle-switch')) {
            const row = e.target.closest('tr');
            const statoCell = row.querySelector('.stato-cell');
            if (e.target.checked) {
                statoCell.textContent = 'Attivo';
            } else {
                statoCell.textContent = 'Disattivo';
            }
        }
    });

    table.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            rowToDelete = e.target.closest('tr');
            confirmModal.style.display = 'block';
        } else if (e.target.classList.contains('edit-btn')) {
            isEditing = true;
            currentRow = e.target.closest('tr');
            modalTitle.textContent = 'Modifica Impianto';
            submitBtn.textContent = 'Modifica';
            document.getElementById('nome').value = currentRow.cells[0].textContent;
            document.getElementById('palinsesto').value = currentRow.cells[1].textContent;
            document.getElementById('latitudine').value = currentRow.cells[3].textContent;
            document.getElementById('longitudine').value = currentRow.cells[4].textContent;
            modal.style.display = 'block';
        }
    });

    addBtn.addEventListener('click', function() {
        isEditing = false;
        impiantoForm.reset();
        modalTitle.textContent = 'Aggiungi Nuovo Impianto';
        submitBtn.textContent = 'Aggiungi';
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        } else if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    });

    confirmDeleteBtn.addEventListener('click', function() {
        if (rowToDelete) {
            table.deleteRow(rowToDelete.rowIndex - 1);
            rowToDelete = null;
            confirmModal.style.display = 'none';
        }
    });

    cancelDeleteBtn.addEventListener('click', function() {
        rowToDelete = null;
        confirmModal.style.display = 'none';
    });

    impiantoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const palinsesto = document.getElementById('palinsesto').value;
        const latitudine = document.getElementById('latitudine').value;
        const longitudine = document.getElementById('longitudine').value;

        if (nome && palinsesto && latitudine && longitudine) {
            if (isEditing) {
                currentRow.cells[0].textContent = nome;
                currentRow.cells[1].textContent = palinsesto;
                currentRow.cells[3].textContent = latitudine;
                currentRow.cells[4].textContent = longitudine;
            } else {
                const newRow = table.insertRow();
                const nomeCell = newRow.insertCell(0);
                const palinsestoCell = newRow.insertCell(1);
                const statoCell = newRow.insertCell(2);
                const latCell = newRow.insertCell(3);
                const longCell = newRow.insertCell(4);
                const actionCell = newRow.insertCell(5);

                nomeCell.textContent = nome;
                palinsestoCell.textContent = palinsesto;

                // Stato
                const toggleLabel = document.createElement('label');
                toggleLabel.classList.add('switch');
                const toggleInput = document.createElement('input');
                toggleInput.type = 'checkbox';
                toggleInput.classList.add('toggle-switch');
                toggleInput.checked = true;
                const slider = document.createElement('span');
                slider.classList.add('slider');
                toggleLabel.appendChild(toggleInput);
                toggleLabel.appendChild(slider);
                statoCell.classList.add('stato-cell');
                statoCell.appendChild(toggleLabel);
                statoCell.textContent = 'Attivo';

                latCell.textContent = latitudine;
                longCell.textContent = longitudine;

                const editBtn = document.createElement('img');
                editBtn.src = 'Immagini/edit.png';
                editBtn.alt = 'Modifica';
                editBtn.classList.add('edit-btn');
                actionCell.appendChild(editBtn);

                const deleteBtn = document.createElement('img');
                deleteBtn.src = 'Immagini/trash.png';
                deleteBtn.alt = 'Elimina';
                deleteBtn.classList.add('delete-btn');
                actionCell.appendChild(deleteBtn);
            }
            modal.style.display = 'none';
            impiantoForm.reset();
        } else {
            alert('Tutti i campi sono obbligatori.');
        }
    });
});