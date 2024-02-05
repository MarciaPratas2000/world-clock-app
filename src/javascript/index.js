let intervalId; // Variable to store the interval ID

// Function to update the time for a specific city element
function formatCityTime(cityElementID) {
    console.log(cityElementID);
    if (cityElementID != null) {
        let cityElement = document.getElementById(cityElementID);
        let cityTimeZone = cityElement.querySelector(".city").getAttribute("value");
        let currentTime = moment().tz(cityTimeZone);
        let timeString = currentTime.format("hh:mm:ss A");
        let dateString = currentTime.format("MMMM Do YYYY");

        cityElement.querySelector(".time").textContent = timeString;
        cityElement.querySelector(".date").textContent = dateString;
    }
}

function updateHomepage() {
    formatCityTime('asia-manila');
    formatCityTime('europe-stockholm');
    formatCityTime('europe-rome');
}

// Initial time zone update for specific cities
intervalId = setInterval(updateHomepage, 1000);

// Function to create HTML content for the selected city
function createSelectedCity(timezone) {
    // Clear the previous interval
    clearInterval(intervalId);

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
    formatCityTime(timezone);
    intervalId = setInterval(function () {
        formatCityTime(timezone);
    }, 1000);
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
        if (event.target.value === "current-location") {
            setCurrentTimezone();
        }
        createSelectedCity(event.target.value);
    }
}

// Event listener for the change event of the cities select element
let citiesSelectElement = document.querySelector("#cities");
citiesSelectElement.addEventListener("change", handleCityChange);

// Function to undo the selection and restore the original HTML content
function undoSelection() {
    // Clear the interval before restoring the original HTML content
    clearInterval(intervalId);

    let originalHTML = ""; // Original HTML content can be stored here if needed
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = originalHTML;
}

// Event listener for the "All Cities" link to undo the selection
let allCitiesLink = document.querySelector(".return");
allCitiesLink.addEventListener("click", undoSelection);
