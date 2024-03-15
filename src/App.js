import './App.css';
import React, { useState, useEffect } from 'react';
import InputBox from './components/InputBox';
import WeatherWidget from './components/WeatherWidget';

import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// First three cities preloaded on weather app
const predefinedCities = [
  { name: "Austin", latitude: 30.26715, longitude: -97.74306 },
  { name: "Dallas", latitude: 32.78306, longitude: -96.80667 },
  { name: "Houston", latitude: 29.76328, longitude: -95.36327 },
];

function App () {
  const [cities, setCities] = useState(predefinedCities); // Track citiies already on list
  const [currentCity, setCurrentCity] = useState(predefinedCities[0]); // Austin as default

  useEffect(() => {
    // This effect will run once on open and get Austin's weather
  }, []); 

  // Add city to list of cities if it exists and is not already in the list
  const handleCitySelected = (city) => {
    const cityExists = cities.some((c) => c.name.toLowerCase() === city.name.toLowerCase());
    if (!cityExists) {
      setCities(cities => [...cities, city]);
    }
    setCurrentCity(city);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">WEATHER TODAY IN {currentCity.name.toUpperCase()}</h1>
      <InputBox onCitySelected={handleCitySelected} predefinedCities={cities} />
      <WeatherWidget latitude={currentCity.latitude} longitude={currentCity.longitude} />
    </div>
  );
};

export default App;
