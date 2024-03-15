import React, { useState, useEffect } from 'react';

function InputBox ({ onCitySelected, predefinedCities }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleCitySubmit = async (event) => {
    event.preventDefault();

    // Geocode API
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json(); 
      if (data.results.length > 0) { // Entry valid, retrieve name
        const { latitude, longitude, name } = data.results[0];
        onCitySelected({ latitude, longitude, name });
        setCity("");
        setError("");
      } else {
        setError(`Could not find weather for ${city}`);
      }
    } catch (error) {
      // Show errror that city is not in database
      setError("City entered is not in database. Please try again.");
    }
  };

  return (
    <div className="input-box">
      <form onSubmit={handleCitySubmit}>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
        <button type="submit">+</button>
      </form>
      {error && <div>{error}</div>} 
      <div className="button-container">
        {predefinedCities.map((predefinedCity) => (
            <button key={predefinedCity.name} onClick={() => onCitySelected(predefinedCity)}>
            {predefinedCity.name}
            </button>
        ))}
      </div>
    </div>
  );
};


export default InputBox;

