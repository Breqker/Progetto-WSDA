const apiKey = 'GjaAejA1tRt6LBlIjqxll30YjqGgsKYI';
const latAndLong = '38.1157,13.3615';

// Mappa delle traduzioni delle icone del meteo
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
    const timestamp = Math.floor(Date.now() / 1000); // Timestamp attuale in secondi
    const apiUrl = `https://api.pirateweather.net/forecast/${apiKey}/${latAndLong}/${timestamp}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            return response.json();
        })
        .then(data => {
            const timestamp = new Date(data.currently.time * 1000); // Converti il timestamp in millisecondi in un oggetto Date
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            // Conversione da Fahrenheit a Celsius
            const temperatureCelsius = ((data.currently.temperature - 32) * 5 / 9).toFixed(1);

            // Traduzione dell'icona del meteo
            const weatherIconTranslation = weatherIconsTranslations[data.currently.icon] || data.currently.icon;

            // Limita l'umidità a due cifre decimali
            const humidity = (data.currently.humidity * 100).toFixed();

            const footer = document.getElementById('footer');
            footer.innerHTML = `
                <p>Ora: <span id="current-time">${formattedTime}</span> </p>
                <p>Temperatura: <span id="temperature">${temperatureCelsius} °C</span></p>
                <p>Descrizione Meteo: <span id="weather-description">${weatherIconTranslation}</span></p>
                <p>Umidità: <span id="humidity">${humidity}%</span></p>
                <p>Velocità Vento: <span id="wind-speed">${data.currently.windSpeed} m/s</span></p>
            `;
        })
        .catch(error => {
            console.error("Errore durante il recupero dei dati dall'API:", error);
        })
        .finally(() => {
            // Richiama la funzione ogni secondo
            setTimeout(getWeather, 1000);
        });
}

// Richiedi il meteo al caricamento della pagina
window.onload = getWeather;
