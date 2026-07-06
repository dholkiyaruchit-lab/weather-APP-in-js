async function featchweather() {
  const userCity = document.getElementById("cityInput").value.trim();
  const msgBox = document.getElementById("error");
  const cityTitle = document.getElementById("city");
  const resultBox = document.getElementById("weather");

  msgBox.textContent = "";
  cityTitle.textContent = "";
  resultBox.innerHTML = "";

  if (!userCity) {
    msgBox.textContent = "Please enter a city name";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=741c8e2867412a6d048b623e3dbfc3c6&units=metric`
    );

    const weatherData = await response.json();

    if (weatherData.cod != 200) {
      throw new Error("City not found");
    }

    cityTitle.textContent = weatherData.name;

    resultBox.innerHTML = `
      <p>🌡 Temp : ${weatherData.main.temp} °C</p>
      <p>💦 Humidity : ${weatherData.main.humidity}%</p>
      <p>🌬 Wind : ${weatherData.wind.speed} m/s</p>
      <p>☁ Weather : ${weatherData.weather[0].main}</p>
    `;
  } catch (error) {
    msgBox.textContent = "City not found";
    console.log(error);
  }
}