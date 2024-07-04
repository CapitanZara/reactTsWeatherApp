import React, { useState } from 'react';
import './App.css';
import { Weather } from './Weather';

function App() {
    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);

    // const fetchWeather = () => {
    //     const city = "Minsk";
    //     const apiKey = "f52584f8c9d97e7cae671cf9d10a1e12";
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    //         .then(response => response.json())
    //         .then(json => setCity(json))

    // }

    const fetchWeather = () => {
        const apiKey = "f52584f8c9d97e7cae671cf9d10a1e12";

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found');
                    setWeather(null);
                } else {
                    setWeather({
                        temp: json.main.temp,
                        description: json.weather[0].description
                    });
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('An error occurred');
                setWeather(null);
            });
    }


    return (
        <div className="App">
            <h1>Weather App</h1>
            {/* {<div>{json}</div>} */}
            <input value={city} onChange={(e) => setCity(e.currentTarget.value)} />
            <button onClick={fetchWeather}>Get Wheather</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
           {weather && <Weather temp={weather.temp} description={weather.description} />}
        </div>
    );
}

export default App;




