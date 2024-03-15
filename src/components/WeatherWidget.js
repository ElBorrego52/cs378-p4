import React, { useState, useEffect } from 'react';

const fetchWeatherData = async (latitude, longitude) => {
    // api url for fetching weather data for lat and long coordinates
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto`;
    try {
      const response = await fetch(apiUrl);
      const json = await response.json(); 
      return json;
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      return null;
    }
};

function WeatherWidget ({ latitude, longitude }) {
    const [weatherData, setWeatherData] = useState(null);

    // load weather data
    useEffect(() => {
        const loadData = async () => {
        const data = await fetchWeatherData(latitude, longitude);
        setWeatherData(data);
        };

        loadData();
    }, [latitude, longitude]);

    // return just first 24 hours for the current day, and parse date/time info
    // to get only hour and minute so it is easier to understand. 
    return (
        <div>
            <div className="row weather-header">
                <div className="col-6">Time</div>
                <div className="col-6">Temperature</div>
            </div>
            {weatherData && weatherData.hourly.time.slice(0, 24).map((time, index) => (
                <div key={index} className="row">
                    <div className="col-6 weather-entry">{`${new Date(time).getHours()}:${new Date(time).getMinutes().toString().padStart(2, '0')}`}</div>
                    <div className="col-6 weather-entry">{weatherData.hourly.temperature_2m[index]}°F</div>
                </div>
            ))}
        </div>
    );
};

export default WeatherWidget;