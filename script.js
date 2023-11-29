function searchLocation() {
    const cityInput = document.getElementById('cityInput');
    const resultElement = document.getElementById('result');

    const city = cityInput.value.trim();

    if (city === '') {
        resultElement.textContent = 'Please enter a city.';
        return;
    }

    // Replace 'YOUR_API_KEY' with your actual API key
    const api_key = "YOUR_API_KEY";
    const apiUrl = `https://geocode.maps.co/search?city=${encodeURIComponent(city)}&key=${api_key}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && "results" in data && data["results"]) {
                const location = data["results"][0]["location"];
                const latitude = location["lat"];
                const longitude = location["lng"];
                resultElement.textContent = `Location of ${city}: Latitude ${latitude}, Longitude ${longitude}`;
            } else {
                resultElement.textContent = 'Location not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultElement.textContent = 'An error occurred while fetching data.';
        });
}
