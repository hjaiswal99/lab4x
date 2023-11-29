function searchLocation() {
    const cityInput = document.getElementById('cityInput');
    const resultElement = document.getElementById('result');

    const city = cityInput.value.trim();

    if (city === '') {
        resultElement.textContent = 'Please enter a city.';
        return;
    }

    const apiUrl = `https://geocode.maps.co/search?city=${encodeURIComponent(city)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);

            if (data && data.length > 0) {
                const firstResult = data[0];
                if (firstResult.lat && firstResult.lon) {
                    const latitude = firstResult.lat;
                    const longitude = firstResult.lon;
                    const displayName = firstResult.display_name;
                    resultElement.textContent = `Location of ${displayName}: Latitude ${latitude}, Longitude ${longitude}`;
                } else {
                    resultElement.textContent = 'Latitude and Longitude information not available for the first result.';
                }
            } else {
                resultElement.textContent = 'Location not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultElement.textContent = 'An error occurred while fetching data.';
        });
}
