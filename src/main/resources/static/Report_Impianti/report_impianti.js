document.getElementById('applyFilter').addEventListener('click', function() {
    const selectedFilter = document.getElementById('filterSelect').value;
    const filterSections = document.querySelectorAll('.filter-section');
    const durationMessage = document.getElementById('durataVisualMessage');

    filterSections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(selectedFilter).style.display = 'block';

    if (durationMessage) {
        durationMessage.style.display = 'none';
    }
});


document.getElementById('applyFilter').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('Eugenio').style.display = 'none';
});


document.getElementById('Pizza').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('Eugenio').style.display = 'none';
    document.getElementById('durataVisualResult').style.display = 'block';
});

