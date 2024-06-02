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

function createCharts(segnalazioni) {
    const labels = segnalazioni.map(seg => seg.codCartellone);
    const durations = segnalazioni.map(seg => seg.durataVisual);

    // Bar Chart
    const barData = [{
        x: labels,
        y: durations,
        type: 'bar'
    }];
    Plotly.newPlot('barChart', barData);

    // Pie Chart
    const pieData = [{
        labels: labels,
        values: durations,
        type: 'pie'
    }];
    Plotly.newPlot('pieChart', pieData);

    // Line Chart
    const lineData = [{
        x: labels,
        y: durations,
        type: 'scatter'
    }];
    Plotly.newPlot('lineChart', lineData);

    // Radar Chart
    const radarData = [{
        type: 'scatterpolar',
        r: durations,
        theta: labels,
        fill: 'toself'
    }];
    const radarLayout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, Math.max(...durations)]
            }
        }
    };
    Plotly.newPlot('radarChart', radarData, radarLayout);
}

document.addEventListener("DOMContentLoaded", function () {
    let segnalazioni = [];
    document.querySelectorAll('#segnalazioniTable tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        segnalazioni.push({
            idSegnalazione: cells[0].innerText,
            codCartellone: cells[1].innerText,
            durataVisual: parseInt(cells[2].innerText),
            dataInserimento: cells[3].innerText
        });
    });

    createCharts(segnalazioni);
});
