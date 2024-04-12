const apiKey = 'GjaAejA1tRt6LBlIjqxll30YjqGgsKYI';
const latAndLong = '38.1157,13.3615';

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
            const minutes = timestamp.getMinutes();
            const formattedTime = `${hours}:${minutes}`;

            // Conversione da Fahrenheit a Celsius
            const temperatureCelsius = ((data.currently.temperature - 32) * 5 / 9).toFixed(1);

            const footer = document.getElementById('footer');
            footer.innerHTML = `
                <h2>Informazioni Meteo</h2>
                <p>Ora: <span id="current-time">${formattedTime}</span> </p>
                <p>Temperatura: ${temperatureCelsius} °C</p>
                <p>Descrizione Meteo: ${data.currently.summary}</p>
                <p>Umidità: ${data.currently.humidity * 100}%</p>
                <p>Velocità Vento: ${data.currently.windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Errore durante il recupero dei dati dall\'API:', error);
        })
        .finally(() => {
            // Richiama la funzione ogni secondo
            setTimeout(getWeather, 1000);
        });

    // Aggiorna l'orario ogni secondo
    setInterval(updateTime, 1000);
}

// Funzione per aggiornare l'orario nel footer
function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    document.getElementById('current-time').innerText = formattedTime;
}


// Richiedi il meteo al caricamento della pagina
window.onload = getWeather;
