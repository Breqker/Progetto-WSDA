document.addEventListener("DOMContentLoaded", function () {
    const filterSelect = document.getElementById("filterSelect");
    const filterSections = document.querySelectorAll(".filter-section");
    const durataVisualResult = document.getElementById("durataVisualResult");
    const eugenioSection = document.getElementById("Eugenio");

    function clearOutputs() {
        // Nasconde il risultato della durata visuale
        if (durataVisualResult) {
            durataVisualResult.style.display = "none";
        }

        // Ripristina il contenuto dei campi nei form
        document.querySelectorAll(".filter-section form").forEach(form => form.reset());
    }

    function showSelectedSection() {
        // Nasconde tutte le sezioni di filtro
        filterSections.forEach(section => section.style.display = "none");

        // Mostra la sezione selezionata
        const selectedFilter = filterSelect.value;
        const selectedSection = document.getElementById(selectedFilter);
        if (selectedSection) {
            selectedSection.style.display = "block";
        }

        // Rende sempre visibile la tabella "Eugenio"
        if (eugenioSection) {
            eugenioSection.style.display = "block";
        }
    }

    filterSelect.addEventListener("change", function() {
        clearOutputs();
        showSelectedSection();
    });

    // Mostra la sezione selezionata all'inizializzazione della pagina
    showSelectedSection();

    // Mostra il risultato della durata visuale se presente
    if (durataVisualResult) {
        const durataVisualMessage = document.getElementById("durataVisualMessage");
        if (durataVisualMessage) {
            durataVisualResult.style.display = "block";
        }
    }
});
