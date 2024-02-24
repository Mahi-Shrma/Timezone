const btn=document.querySelector("button");
const input=document.querySelector("add");

// btn.addEventListener("click", myFunction);

// function myFunction() {
//     if(input===""){

//     }
//   document.getElementById("demo").innerHTML = "Hello World";
// }

const button = document.getElementById("submitButton");
const timezoneDisplay = document.getElementById("timezoneDisplay");

// Event listener for button click
button.addEventListener("click", () => {
    const address = input.value.trim();

    // Validate address (you can add more validation logic here)

    // Use geocoding API to get latitude and longitude
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const { lat, lon } = data.features[0].geometry;

                // Fetch timezone using latitude and longitude
                fetch(`https://api.geoapify.com/v1/timezone?lat=${lat}&lon=${lon}&apiKey=YOUR_API_KEY`)
                    .then(response => response.json())
                    .then(timezoneData => {
                        const timezone = timezoneData.timezone;
                        timezoneDisplay.textContent = `Timezone: ${timezone}`;
                    })
                    .catch(error => {
                        console.error("Error fetching timezone:", error);
                    });
            } else {
                console.error("Invalid address or no coordinates found.");
            }
        })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
        });
    });