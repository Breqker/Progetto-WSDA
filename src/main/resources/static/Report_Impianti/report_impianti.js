function validateForm(event) {
    var startDateTime = document.getElementById("startDateTime").value;
    var endDateTime = document.getElementById("endDateTime").value;

    if (!startDateTime || !endDateTime) {
        alert("Seleziona la data");
        event.preventDefault();
        return false;
    }

    if (startDateTime > endDateTime) {
        alert("La data di inizio non può essere successiva alla data di fine");
        event.preventDefault();
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    let barChartInstance = null;
    let pieChartInstance = null;
    let lineChartInstance = null;
    let radarChartInstance = null;

    function fetchReport() {
        const segnalazioni = /*[[${segnalazioni}]]*/ [];
        const labels = segnalazioni.map(seg => seg.codCartellone);
        const durations = segnalazioni.map(seg => seg.durataVisual);

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

        const barCtx = document.getElementById('barCtx').getContext('2d');
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

        const pieCtx = document.getElementById('pieCtx').getContext('2d');
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

        const lineCtx = document.getElementById('lineCtx').getContext('2d');
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

        const radarCtx = document.getElementById('radarCtx').getContext('2d');
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

        document.querySelector('.chart-container').style.display = 'grid';
    }

    fetchReport();
});
