document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.video-background');
    const dots = document.querySelectorAll('.video-dot');
    let currentVideoIndex = 0;
    const videoCount = videos.length;
    let intervalId;

    // Function to switch videos
    function switchVideo(index) {
        videos.forEach(video => video.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        videos[index].classList.add('active');
        dots[index].classList.add('active');

        videos[index].play();
    }

    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoCount;
        switchVideo(currentVideoIndex);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentVideoIndex = index;
            switchVideo(currentVideoIndex);
            clearInterval(intervalId);
            intervalId = setInterval(nextVideo, 8000);
        });
    });

    intervalId = setInterval(nextVideo, 8000);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.input-icon');

    // Add event listener for pressing Enter key in search input
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const userQuestion = this.value.trim();
            if (userQuestion) {
                performGoogleSearch(userQuestion);
            }
        }
    });

    // Add event listener for clicking the search icon
    searchIcon.addEventListener('click', () => {
        const userQuestion = searchInput.value.trim();
        if (userQuestion) {
            performGoogleSearch(userQuestion);
        }
    });

    // Function to perform Google search
    function performGoogleSearch(query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, '_blank');
    }

    // Step 1: Get user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            document.getElementById('weather').textContent = "Geolocation is not supported by this browser.";
        }
    }

    // Step 2: Success callback for geolocation
    function successCallback(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
    }

    // Step 3: Error callback for geolocation
    function errorCallback(error) {
        document.getElementById('weather').textContent = `Error fetching location: ${error.message}`;
    }

    // Step 4: Fetch weather data using your proxy
    function fetchWeatherData(lat, lon) {
        const proxyUrl = `http://localhost:3000/weather?lat=${lat}&lon=${lon}`;
        fetch(proxyUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const temp = data.data[0].coordinates[0].dates[0].value;
                document.getElementById('weather').textContent = `Current Temperature: ${temp}°C`;
            })
            .catch(error => {
                document.getElementById('weather').textContent = `Error fetching weather data: ${error.message}`;
            });
    }

    window.onload = getUserLocation;

    async function fetchExperiments() {
        const response = await fetch('/experiments');
        const data = await response.json();
        const experimentsSelect = document.getElementById('experiments');
        data.experiments.forEach(experiment => {
            const option = document.createElement('option');
            option.value = experiment;
            option.textContent = experiment;
            experimentsSelect.appendChild(option);
        });
    }

    async function fetchCountryData(experiment, countryCode) {
        const response = await fetch(`/country_data?experiment=${experiment}&country_code=${countryCode}`);
        const data = await response.json();
        const countryDataDiv = document.getElementById('countryData');
        if (data.error) {
            alert(data.error);
        } else {
            countryDataDiv.textContent = JSON.stringify(data.country_data, null, 2);
            return data.country_data;
        }
    }

    const languageSelector = document.querySelector('.language-selector');
    let currentLanguage = 'en';

    languageSelector.addEventListener('change', (event) => {
        currentLanguage = event.target.value;
        updateLanguage();
    });

    function updateLanguage() {
        const textElements = document.querySelectorAll('[data-text-key]');
        textElements.forEach(element => {
            const key = element.getAttribute('data-text-key');
            element.textContent = text[currentLanguage][key];
        });
    }

    updateLanguage();

    fetchExperiments();
    // Function to display data with smooth transition
    window.displayData = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section.classList.contains('active')) {
            section.classList.remove('active');
            setTimeout(() => {
                section.style.display = 'none';
            }, 500); // Match the transition duration
        } else {
            section.style.display = 'block';
            setTimeout(() => {
                section.classList.add('active');
            }, 10); // Slight delay to trigger transition
        }
    };
});