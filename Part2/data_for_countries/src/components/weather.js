import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APIXU_API_KEY = "37e860f71949fe39473c8f314d2fd8be";

const Weather = ({city}) => {

    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=37e860f71949fe39473c8f314d2fd8be&query=`+ city)
        .then((response) => setWeather(response.data.current))
          
    }, [city]);

    if (APIXU_API_KEY === "") {
        return <div>API key missing, add it on line 7 of src/components/Weather.js</div>
    }

    if (weather.temperature === undefined) {
        return <div>Weather is loading...</div>
    }

    return (
        <div>
            <p><b>Temperature: </b> {weather.temperature}°C</p>
            <img src={weather.weather_icons} alt={weather.weather_descriptions} />
            <p><b>wind: </b>{weather.wind_speed} kph, direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather;