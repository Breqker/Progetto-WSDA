// Funzione per ottenere il meteo da Open Meteo API
function getWeather() {
    const apiKey = 'YOUR_API_KEY'; // Inserisci la tua chiave API qui
    const city = 'CITY_NAME'; // Inserisci il nome della città qui
    const apiUrl = https://api.open-meteo.com/weather?location=${city}&key=${apiKey};

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML =
                <h2>${city}</h2>
            <p>Temperature: ${data.temperature}</p>
            <p>Weather Description: ${data.weather}</p>
            <p>Humidity: ${data.humidity}%</p>
            <p>Wind Speed: ${data.wind_speed} m/s</p>
            ;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerText = 'Error fetching weather data';
        });
}

// Richiedi il meteo al caricamento della pagina
window.onload = getWeather;