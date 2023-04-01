let apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
let apiKey = "eceeec2fb91796f6d65128e7d90aad46";
let history = [];

// event listener for the search button
$("#form").on("submit", function (event) {
  event.preventDefault();
  getWeather($("#city").val());
  if (jQuery.inArray($("#city").val(), history) !== -1) {
    return;
  }
  history.push($("#city").val());
  storeText();
});
// event listener for the search history buttons
$(".btn-secondary").on("click", function () {
  preventDefault();
  stoppropagation();
  var formText = $(this).text();
  getWeather(formText);
});

function storeText() {
  let formText = $("#city").val();
  localStorage.setItem(formText, formText);
  console.log(formText);
  $("#searched").append(
    "<button class='btn btn-secondary col-12'>" + formText + "</button>"
  );
}

// function to call to the url
function getWeather(city) {
  let url = `${apiUrl}?q=${city}&units=imperial&appid=${apiKey}`;
  // fetch from the open weather api
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      $("#today").append(
        "<div class = 'card2 mb-3'>" +
          "<h4>" +
          $("#city").val() +
          "<h4/>" +
          "<h5>" +
          data.list[0].dt_txt.slice(0, 10) +
          "<h5/>" +
          "<p>" +
          "Temp: " +
          data.list[0].main.temp +
          "°F" +
          "<p/>" +
          "<p>" +
          "humidity: " +
          data.list[0].main.humidity +
          "%" +
          "<p/>" +
          "<p>" +
          "Wind Speed: " +
          data.list[0].wind.speed +
          "mph" +
          "<p/>" +
          "</div>"
      );
      if ($(".card2").length >= 2) {
        $(".card2:first").remove();
      }
      $(".card").remove();
      //   // log the parsed data to the console
      for (i = 0; i < data.list.length; i += 8) {
        $("#fiveday").append(
          "<div class = 'card mb-3 col-2'>" +
            "<h4>" +
            $("#city").val() +
            "<h4/>" +
            "<h5>" +
            data.list[i].dt_txt.slice(0, 10) +
            "<h5/>" +
            "<p>" +
            "Temp: " +
            data.list[i].main.temp +
            "°F" +
            "<p/>" +
            "<p>" +
            "humidity: " +
            data.list[i].main.humidity +
            "%" +
            "<p/>" +
            "<p>" +
            "Wind Speed: " +
            data.list[i].wind.speed +
            "mph" +
            "<p/>" +
            "</div>"
        );
        console.log($("#city").val());
        console.log(data.list);
        console.log(data.list[i].main.temp);
        console.log(data.list[i].main.humidity);
        console.log(data.list[i].wind.speed);
        console.log(data.list[i].weather[0].icon);
      }
    });
}
