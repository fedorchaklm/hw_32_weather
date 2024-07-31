const city = document.getElementById("city");
const selectedCity = city.value;

function getWeather(selectedCity) {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

  fetch(url, {
    referrerPolicy: "unsafe-url",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then((data) => {
      showWeather(data);
    })
    .catch((error) => console.error(error));
}

window.addEventListener("DOMContentLoaded", () => {
  getWeather("lviv");

  city.addEventListener("change", () => {
    const changedCity = city.value;
    getWeather(changedCity);
  });
});

function showWeather(data) {
  const weatherContent = document.getElementById("weather-content");
  let iconCode = data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  weatherContent.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind speed: ${data.wind.speed} m/s</p>
      <p>Pressure: ${data.main.pressure} hPa</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Direction of wind: ${data.wind.deg}°</p>
      <img src="${iconUrl}" alt="Weather icon">
  `;
  city.value = "";
}
