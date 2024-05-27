document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('impiantiTable').getElementsByTagName('tbody')[0];
    const addBtn = document.getElementById('addImpiantoBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelBtn');
    const impiantoForm = document.getElementById('impiantoForm');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const sortByNameBtn = document.getElementById('sortByNameBtn');
    const sortByStatusBtn = document.getElementById('sortByStatusBtn');
    const sortIcon = document.getElementById('sortIcon');
    const sortMenu = document.getElementById('sortMenu');

    const confirmModal = document.getElementById('confirmModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    let rowToDelete = null;

    let isEditing = false;
    let currentRow;

    sortIcon.addEventListener('click', function() {
        sortMenu.style.display = sortMenu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('#sortIcon') && !event.target.closest('#sortMenu')) {
            sortMenu.style.display = 'none';
        }
    });

    table.addEventListener('change', function(e) {
        if (e.target.classList.contains('toggle-switch')) {
            const row = e.target.closest('tr');
            const statoCell = row.cells[3];
            if (e.target.checked) {
                statoCell.querySelector('.slider').classList.add('active');
            } else {
                statoCell.querySelector('.slider').classList.remove('active');
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
            document.getElementById('nome').value = currentRow.cells[1].textContent;
            document.getElementById('palinsesto').value = currentRow.cells[2].textContent;
            document.getElementById('latitudine').value = currentRow.cells[4].textContent;
            document.getElementById('longitudine').value = currentRow.cells[5].textContent;
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
                currentRow.cells[1].textContent = nome;
                currentRow.cells[2].textContent = palinsesto;
                currentRow.cells[4].textContent = latitudine;
                currentRow.cells[5].textContent = longitudine;
            } else {
                const newRow = table.insertRow();
                const dragHandleCell = newRow.insertCell(0);
                const nomeCell = newRow.insertCell(1);
                const palinsestoCell = newRow.insertCell(2);
                const statoCell = newRow.insertCell(3);
                const latCell = newRow.insertCell(4);
                const longCell = newRow.insertCell(5);
                const actionCell = newRow.insertCell(6);

                dragHandleCell.innerHTML = '<span class="drag-handle">☰</span>';
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

    // Abilita il drag-and-drop con SortableJS
    const tbody = document.querySelector('#impiantiTable tbody');
    new Sortable(tbody, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        handle: '.drag-handle',
        onEnd: function (evt) {
            console.log('Riga spostata da', evt.oldIndex, 'a', evt.newIndex);
        }
    });

    // Funzione di ordinamento per Nome Impianto
    sortByNameBtn.addEventListener('click', function() {
        const rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const nameA = a.cells[1].textContent.toUpperCase();
            const nameB = b.cells[1].textContent.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        rows.forEach(row => table.appendChild(row));
        sortMenu.style.display = 'none'; // Nascondi il menu dopo l'ordinamento
    });

    // Funzione di ordinamento per Stato (toggle switch)
    sortByStatusBtn.addEventListener('click', function() {
        const rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const statusA = a.cells[3].querySelector('input').checked;
            const statusB = b.cells[3].querySelector('input').checked;
            return statusB - statusA;
        });
        rows.forEach(row => table.appendChild(row));
        sortMenu.style.display = 'none'; // Nascondi il menu dopo l'ordinamento
    });
});
