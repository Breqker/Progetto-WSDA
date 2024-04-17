const apiKey = 'GjaAejA1tRt6LBlIjqxll30YjqGgsKYI';
const latAndLong = '38.1157,13.3615'; // coordinate generiche del centro di Palermo

const weatherIconsTranslations = {
    'clear-day': 'Sereno',
    'clear-night': 'Sereno di notte',
    'rain': 'Pioggia',
    'snow': 'Neve',
    'sleet': 'Nevischio',
    'wind': 'Vento',
    'fog': 'Nebbia',
    'cloudy': 'Nuvoloso',
    'partly-cloudy-day': 'Parzialmente nuvoloso',
    'partly-cloudy-night': 'Parzialmente nuvoloso di notte'
};

function getWeather() {
    const timestamp = Math.floor(Date.now() / 1000);
    const apiUrl = `https://api.pirateweather.net/forecast/${apiKey}/${latAndLong}/${timestamp}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            return response.json();
        })
        .then(data => {
            const timestamp = new Date(data.currently.time * 1000);
            const ore = timestamp.getHours();
            const minuti = timestamp.getMinutes().toString().padStart(2, '0');
            const orario = `${ore}:${minuti}`;
            const giorno = timestamp.toLocaleDateString('it-IT', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

            const temperaturaCelsius = ((data.currently.temperature - 32) * 5 / 9).toFixed(1);

            const condizioni_meteo = weatherIconsTranslations[data.currently.icon] || data.currently.icon;

            const umidita = (data.currently.humidity * 100).toFixed();

            const footer = document.getElementById('footer');
            footer.innerHTML = `
                <p>Condizioni Meteo: <span id="weather-description">${condizioni_meteo}</span></p>
                <p>Temperatura: <span id="temperature">${temperaturaCelsius} °C</span></p>
                <p><span id="current-date-time">${giorno} - ${orario}</span></p>
                <p>Umidità: <span id="humidity">${umidita}%</span></p>
                <p>Velocità Vento: <span id="wind-speed">${data.currently.windSpeed} m/s</span></p>
            `;
        })
        .catch(error => {
            console.error("Errore durante il recupero dei dati dall'API:", error);
        })
        .finally(() => {
            setTimeout(getWeather, 1000);
        });
}

window.onload = getWeather;
