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

    function openModal(modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length) focusableElements[0].focus();
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

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
            openModal(confirmModal);
        } else if (e.target.classList.contains('edit-btn')) {
            isEditing = true;
            currentRow = e.target.closest('tr');
            modalTitle.textContent = 'Modifica Impianto';
            submitBtn.textContent = 'Modifica';
            document.getElementById('nome').value = currentRow.cells[0].textContent;
            document.getElementById('palinsesto').value = currentRow.cells[1].textContent;
            document.getElementById('latitudine').value = currentRow.cells[3].textContent;
            document.getElementById('longitudine').value = currentRow.cells[4].textContent;
            openModal(modal);
        }
    });

    addBtn.addEventListener('click', function() {
        isEditing = false;
        impiantoForm.reset();
        modalTitle.textContent = 'Aggiungi Nuovo Impianto';
        submitBtn.textContent = 'Aggiungi';
        openModal(modal);
    });

    closeModalBtn.addEventListener('click', function() {
        closeModal(modal);
    });

    cancelBtn.addEventListener('click', function() {
        closeModal(modal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        } else if (event.target === confirmModal) {
            closeModal(confirmModal);
        }
    });

    confirmDeleteBtn.addEventListener('click', function() {
        if (rowToDelete) {
            table.deleteRow(rowToDelete.rowIndex - 1);
            rowToDelete = null;
            closeModal(confirmModal);
        }
    });

    cancelDeleteBtn.addEventListener('click', function() {
        rowToDelete = null;
        closeModal(confirmModal);
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
                toggleInput.checked = false;
                const toggleSlider = document.createElement('span');
                toggleSlider.classList.add('slider');
                toggleLabel.appendChild(toggleInput);
                toggleLabel.appendChild(toggleSlider);

                statoCell.appendChild(toggleLabel);
                statoCell.classList.add('stato-cell');
                statoCell.textContent = 'Disattivo';

                latCell.textContent = latitudine;
                longCell.textContent = longitudine;

                // Azioni
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-btn');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                actionCell.appendChild(editBtn);
                actionCell.appendChild(deleteBtn);
            }
            closeModal(modal);
        }
    });
});
