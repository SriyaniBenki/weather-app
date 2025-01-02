import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState(''); // Initialize as an empty string
  const [weather, setWeather] = useState(null); // Initialize as null for conditional rendering
  const apiKey = '15ac55ea87a99ad807e2bfe11fae2f99'; // Store API key in a variable

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeather(response.data); // Set the weather data
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temp: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
