const apiKey = "0ee135e942c982b0fe3d1aef805fd95a";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Місто не знайдено");
      }
      return response.json();
    })
    .then((data) => {
      const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Температура: ${data.main.temp}°C</p>
        <p>Погода: ${data.weather[0].description}</p>
      `;
      document.getElementById("result").innerHTML = html;
    })
    .catch((error) => {
      document.getElementById(
        "result"
      ).innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

function getUserInfo() {
  const login = document.getElementById("loginInput").value;
  fetch(`/info/${login}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        document.getElementById(
          "userInfo"
        ).innerHTML = `<p style="color:red;">${data.error}</p>`;
      } else {
        document.getElementById("userInfo").innerHTML = `
          <h3>Особисті дані:</h3>
          <p>Прізвище: ${data["прізвище"]}</p>
          <p>Ім’я: ${data["імя"]}</p>
          <p>Курс: ${data["курс"]}</p>
          <p>Група: ${data["група"]}</p>
          <p>Логін: ${data["логін"]}</p>
        `;
      }
    });
}
