// Function to update the time for a specific city element
function updateCityTime(cityElementID) {
    let cityElement = document.getElementById(cityElementID);
    if (cityElement) {
        let cityTimeZone = cityElement.querySelector(".city").getAttribute("value");
        let currentTime = moment().tz(cityTimeZone);
        let timeString = currentTime.format("h:mm:ss A");
        let dateString = currentTime.format("MMMM Do YYYY");
        
        cityElement.querySelector(".time").textContent = timeString;
        cityElement.querySelector(".date").textContent = dateString;
    } else {
        console.error(`City element with ID '${cityElementID}' not found.`);
    }
}

// Initial time zone update for specific cities
setInterval(function() {
    updateCityTime('asia-manila');
}, 1000);

setInterval(function() {
    updateCityTime('europe-stockholm');
}, 1000);

setInterval(function() {
    updateCityTime('europe-rome');
}, 1000);

// Function to create HTML content for the selected city
function createSelectedCityHTML(timezone) {
    let cityName = timezone.replace("_", "").split("/")[1];
    const cityHTML = `
        <div class="city-details" id="${timezone}">
            <div>
                <h2 class="city" value="${timezone}">${cityName}</h2>
                <span class="date"></span>
            </div>
            <div class="time"><small></small></div>
        </div>
        <a class="return" href="">All Cities</a>
    `;
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = cityHTML;
    updateCityTime(timezone);
    console.log(mainElement);
}

// Function to set the guessed time zone as the current location
function setCurrentTimezone() {
    let guessedTimezone = moment.tz.guess();
    let myLocationElement = document.getElementById("current-location");
    myLocationElement.value = guessedTimezone;
    myLocationElement.innerHTML = guessedTimezone.replace("_", " ").split("/")[1];
}

// Function to handle the change event of the cities select element
function handleCityChange(event) {
    if (event.target.value.length > 0) {
        setCurrentTimezone();
        console.log(event.target.value);
        createSelectedCityHTML(event.target.value);
        // Update the time for the selected city every second
        setInterval(function() {
            updateCityTime(event.target.value);
        }, 1000);
    }
}

// Event listener for the change event of the cities select element
let citiesSelectElement = document.querySelector("#cities");
citiesSelectElement.addEventListener("change", handleCityChange);

