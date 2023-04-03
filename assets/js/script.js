let apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
let apiKey = "eceeec2fb91796f6d65128e7d90aad46";
let history = [];

function storeText() {
  let formText = $("#city").val();
  localStorage.setItem(formText, formText);
  console.log(history);
  $("#searched").append(
    "<button class='button2 btn btn-secondary col-12' id='$('#city').val()'>" +
      formText +
      "</button>"
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
    // append current weather to the page
    .then((data) => {
      let iconCode = data.list[0].weather[0].icon;
      console.log(iconCode);
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      let icon = "<img src=" + iconUrl + ">";
      $("#today").append(
        "<div class = 'card2 mb-3'>" +
          "<h2 class = 'col-12'>" +
          $("#city").val() +
          " : " +
          data.list[0].dt_txt.slice(0, 10) +
          "<h2/>" +
          icon +
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
      //   for loop to append 5 day forecast
      for (i = 0; i < data.list.length; i += 8) {
        let iconCode = data.list[i].weather[0].icon;
        console.log(iconCode);
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        let icon = "<img src=" + iconUrl + ">";
        console.log(iconUrl);
        $("#fiveday").append(
          "<div class = 'card mb-3 col-2'>" +
            "<h5>" +
            data.list[i].dt_txt.slice(0, 10) +
            "<h5/>" +
            icon +
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
      }
      console.log($("#city").val());
      console.log(data.list[0]);
    });
}
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

// $("#searched").on("click", function (event) {
//   event.preventDefault;
//   console.log(this);
// });

$(document).on("click", ".button2", function () {
  console.log(this.childNodes[0].data);
  $("#city").val(this.childNodes[0].data);
  getWeather(this.childNodes[0].data);
});
