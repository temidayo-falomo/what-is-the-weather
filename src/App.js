import React from "react";
import { useState } from "react";

const api = {
  key: "52740efb23aa210693d4f8ff26c5c360",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weatherList, setWeatherList] = useState([]);
  const [query, setQuery] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherList(result);
          console.log(result);
        });
    }
  };

  return (
    <>
      {typeof weatherList.main != "undefined" ? (
        <div className={`App ${weatherList.weather[0].main}`}>
          <div className="card">
            <img
              src={`${weatherList.weather[0].main}.svg`}
              alt=""
              className="sun"
            />
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                className="search"
                placeholder="Search City..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </form>

            <div className="content">
              <h2>
                {weatherList.name}, {weatherList.sys.country}
              </h2>
              <h2>
                {parseInt(weatherList.main.temp)}
                <sup>o</sup>C
              </h2>
              <h2 className="weather-icon">
                {weatherList.weather[0].main},
                <img
                  src={`http://openweathermap.org/img/wn/${weatherList.weather[0].icon}.png`}
                  alt=""
                  className="icon"
                />
              </h2>

              <div className="more-info">
                <p>Humidity: {weatherList.main.humidity}%</p>
                <p>Wind Speed: {weatherList.wind.speed}km/h</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="App Empty">
          <div className="card">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                className="search"
                placeholder="Search Country..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </form>
            <div className="content">
              <h2 style={{ textAlign: "center" }}>Enter Country/City</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
