import { useState, useEffect } from "react";
import "./index.css";

const KEY = "96588a0a9b8649bc917103715260102";

function App() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`,
        );
        console.log(res);
        // Serverin verdiyi exception mesajını çıxarmaq üçün
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
    getData();
  }, []);

  console.log(weatherData);

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">{error}</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name"
              className="search-input"
            />
          </div>
        </div>
        <div className="weather-card">
          <h2>{`${weatherData?.location?.name}, ${weatherData?.location?.country}`}</h2>
          <img
            src={weatherData?.current.condition.icon}
            alt="icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData?.current?.temp_c}°C</p>
          <p className="condition">{weatherData?.current?.text}</p>
          <div className="weather-details">
            <p>Humidity: {weatherData?.current?.humidity}%</p>
            <p>Wind: {weatherData?.current?.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
