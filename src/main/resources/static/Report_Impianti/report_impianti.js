document.getElementById('applyFilter').addEventListener('click', function() {
    const selectedFilter = document.getElementById('filterSelect').value;
    const filterSections = document.querySelectorAll('.filter-section');

    filterSections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(selectedFilter).style.display = 'block';
});
