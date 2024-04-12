
const apiKey = 'GjaAejA1tRt6LBlIjqxll30YjqGgsKYI';
const latAndLong = '38.1157,13.3615';
const apiUrl = `https://api.pirateweather.net/forecast/${apiKey}/${latAndLong}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta API');
        }
        return response.json();
    })
    .then(data => {

        const temperature = data.currently.temperature;
        const weatherDescription = data.currently.summary;
        const humidity = data.currently.humidity;
        const windSpeed = data.currently.windSpeed;


        const footer = document.getElementById('footer');
        footer.innerHTML = `
            <h2>Informazioni Meteo</h2>
            <p>Temperatura: ${temperature} °F</p>
            <p>Descrizione Meteo: ${weatherDescription}</p>
            <p>Umidità: ${humidity * 100}%</p>
            <p>Velocità Vento: ${windSpeed} m/s</p>
        `;
    })
    .catch(error => {
        console.error('Errore durante il recupero dei dati dall\'API:', error);
    });
