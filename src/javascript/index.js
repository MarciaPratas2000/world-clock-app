// Function to update the time for a specific city element
function updateCityTime(cityElementID) {
    // Get the city element by ID
    let cityElement = document.getElementById(cityElementID);
    if (cityElement) {
        // Get the value attribute of the city element
        let cityElementValue = cityElement.querySelector(".city").getAttribute("value");

        // Get the current time in the specified time zone
        let now = moment().tz(cityElementValue);
        let timeString = now.format("h:mm:ss A");
        let dateString = now.format("MMMM Do YYYY");
        
        // Update the time and date in the city element
        cityElement.querySelector(".time").textContent = timeString;
        cityElement.querySelector(".date").textContent = dateString;
    } else {
        console.error(`City element with ID '${cityElementID}' not found.`);
    }
}

// Initial Timezone update Ofor specific cities
setInterval(function() {
    updateCityTime('Asia/Manila');
}, 1000);

setInterval(function() {
    updateCityTime('Europe/Stockholm');
}, 1000);

setInterval(function() {
    updateCityTime('Europe/Rome');
}, 1000);

