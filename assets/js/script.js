var today = $("#today");
var fiveday = $("#5day");
var search = $("#city");

var history = [];

$("#form").on("submit", function (event) {
  event.preventDefault();

  // call the storeText function to store the form text in local storage
  storeText();
});

function storeText() {
  const formText = $("#city").val();
  localStorage.setItem(formText, formText);
  console.log(formText);
  $("#searched").append("<li>" + formText + "</li>");
}

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "eceeec2fb91796f6d65128e7d90aad46";

// define a function to get the weather for a city
function getWeather(city) {
  // construct the API endpoint URL with the city name and API key
  const url = `${apiUrl}?q=${city}&appid=${apiKey}`;

  // use the fetch API to make a GET request to the API endpoint URL
  fetch(url)
    .then((response) => {
      // if the response is successful, parse the JSON data and log it to the console
      if (response.ok) {
        return response.json();
      }
      // if there is an error, throw an error with the status code and status text
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    })
    .then((data) => {
      // log the parsed data to the console
      console.log(data);
    })
    .catch((error) => {
      // log any errors to the console
      console.error(error);
    });
}

// call the getWeather function with the city name you want to get the weather for
getWeather("New York");
