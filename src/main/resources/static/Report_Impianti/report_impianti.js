let selectedImpianto = '';
let barChartInstance = null;
let pieChartInstance = null;
let lineChartInstance = null;
let radarChartInstance = null;

function selectImpianto(impianto) {
    selectedImpianto = impianto;
    document.getElementById('date-selection').style.display = 'block';
    document.querySelector('.charts-grid').style.display = 'none';
}

function closeModal() {
    document.getElementById('date-selection').style.display = 'none';
    document.querySelector('.charts-grid').style.display = 'none';
}

async function fetchReport() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    // Simulate fetching data from a backend
    const data = [
        { codCartellone: 'C1', durataVisual: 10 },
        { codCartellone: 'C2', durataVisual: 15 },
        { codCartellone: 'C3', durataVisual: 20 },
        { codCartellone: 'C4', durataVisual: 25 }
    ];

    // Process the data
    const labels = data.map(segnalazione => segnalazione.codCartellone);
    const durations = data.map(segnalazione => segnalazione.durataVisual);

    // Destroy previous chart instances if they exist
    if (barChartInstance) {
        barChartInstance.destroy();
    }
    if (pieChartInstance) {
        pieChartInstance.destroy();
    }
    if (lineChartInstance) {
        lineChartInstance.destroy();
    }
    if (radarChartInstance) {
        radarChartInstance.destroy();
    }

    const barCtx = document.getElementById('barChart').getContext('2d');
    barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Durata Visualizzazioni',
                data: durations,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    pieChartInstance = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Durata Visualizzazioni',
                data: durations,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    const lineCtx = document.getElementById('lineChart').getContext('2d');
    lineChartInstance = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Durata Visualizzazioni',
                data: durations,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const radarCtx = document.getElementById('radarChart').getContext('2d');
    radarChartInstance = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Durata Visualizzazioni',
                data: durations,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });

    document.querySelector('.charts-grid').style.display = 'grid';
}
