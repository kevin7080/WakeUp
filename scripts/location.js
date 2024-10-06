// Check if geolocation is supported
/*
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display location (Nominatim API)
    const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || "";
            const state = data.address.state || "";
            const country = data.address.country || "";

            const locationParts = [];
            if (city) locationParts.push(city);
            if (state) locationParts.push(state);
            if (country) locationParts.push(country);

            const formattedLocation = locationParts.join(", ");
            document.getElementById("location").innerText = formattedLocation || "Location not available";

            // Now fetch weather data using Meteomatics API
            getWeather(latitude, longitude);
        })
        .catch(() => {
            document.getElementById("location").innerText = "Unable to retrieve location details.";
        });
}

// Function to fetch weather data from Meteomatics API
function getWeather(latitude, longitude) {
    const username = 'chimdindu_james';  // Replace with your Meteomatics username
    const password = '2z9Lw9O5Oq';  // Replace with your Meteomatics password
    const weatherUrl = `https://api.meteomatics.com/now/t_2m:C/${latitude},${longitude}/json`;

    fetch(weatherUrl, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)  // Basic Auth for Meteomatics
        }
    })
        .then(response => response.json())
        .then(data => {
            const temperature = data.data[0].coordinates[0].dates[0].value;
            document.getElementById("weather").innerText = `Temperature: ${temperature}°C`;
        })
        .catch(() => {
            document.getElementById("weather").innerText = "Unable to retrieve weather data.";
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerText = "An unknown error occurred.";
            break;
    }
    document.getElementById("weather").innerText = "Weather data unavailable due to location error.";
}
*/

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display location (Nominatim API)
    const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || "";
            const state = data.address.state || "";
            const country = data.address.country || "";

            const locationParts = [];
            if (city) locationParts.push(city);
            if (state) locationParts.push(state);
            if (country) locationParts.push(country);

            const formattedLocation = locationParts.join(", ");
            document.getElementById("location").innerText = formattedLocation || "Location not available";

            // Now fetch weather data using Meteomatics API
            getWeather(latitude, longitude);
        })
        .catch(() => {
            document.getElementById("location").innerText = "Unable to retrieve location details.";
        });
}

// Function to fetch weather data from Meteomatics API
function getWeather(latitude, longitude) {
    const username = 'chimdindu_james';  // Replace with your Meteomatics username
    const password = '2z9Lw9O5Oq';  // Replace with your Meteomatics password
    const weatherUrl = `https://api.meteomatics.com/now/t_2m:C,weather_symbol_1h:idx,precip_1h:mm/${latitude},${longitude}/json`;

    fetch(weatherUrl, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)  // Basic Auth for Meteomatics
        }
    })
        .then(response => response.json())
        .then(data => {
            const temperature = data.data[0].coordinates[0].dates[0].value;
            const weatherSymbol = data.data[1].coordinates[0].dates[0].value;
            const precipitation = data.data[2].coordinates[0].dates[0].value;

            // Convert weather symbol to readable text
            const weatherDescription = getWeatherDescription(weatherSymbol);

            // Calculate precipitation chance (if 0 mm, it's 0%)
            const precipitationChance = (precipitation > 0) ? `${Math.round(precipitation * 100)}%` : "1%";

            // Format the weather info string
            const weatherInfo = `${temperature}°C, ${weatherDescription}, Slight chance of rain (${precipitationChance})`;
            document.getElementById("weather").innerText = weatherInfo;
        })
        .catch(() => {
            document.getElementById("weather").innerText = "Unable to retrieve weather data.";
        });
}

// Function to convert weather symbol to description
function getWeatherDescription(symbol) {
    const weatherDescriptions = {
        1: 'Clear sky',
        2: 'Partly cloudy',
        3: 'Cloudy',
        4: 'Overcast',
        5: 'Fog',
        6: 'Light rain showers',
        7: 'Rain showers',
        8: 'Heavy rain showers',
        9: 'Light rain',
        10: 'Rain',
        11: 'Heavy rain',
        12: 'Light snow showers',
        13: 'Snow showers',
        14: 'Heavy snow showers',
        15: 'Light snow',
        16: 'Snow',
        17: 'Heavy snow',
        18: 'Thunderstorms',
        // Add more as necessary for your API setup
    };

    return weatherDescriptions[symbol] || 'Unknown weather';
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerText = "An unknown error occurred.";
            break;
    }
    document.getElementById("weather").innerText = "Weather data unavailable due to location error.";
}