import { useEffect, useState } from "react";
import "./App.css";
import CitiesSelector from "./components/CitiesSelector";
import { fetchData } from "./components/fetchData";
import WeatherInfo from "./components/WeatherInfo";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  const [city, setCity] = useState("Adana");
  const [weatherData, setWeatherData] = useState();

  const handleSelectCity = (city) => {
    setCity(city);
  };
  useEffect(() => {
    // Fetch data when city parameter changes
    const fetchDataAndUpdateState = async () => {
      const { weatherData } = await fetchData(city);
      setWeatherData(weatherData);
    };
    fetchDataAndUpdateState();
  }, [city]);

  return (
    <WeatherProvider value={{ weatherData, setWeatherData }}>
      <div className="app">
        <div className="header">
          <img className="weather-img" src="./src/assets/weather.png" />
          <h1 className="app-title">Weather</h1>
        </div>
        <div className="dropdown-container">
          <CitiesSelector onSelectCity={handleSelectCity} selectedCity={city} />
        </div>
        <div className="weather-icons-container">
          <WeatherInfo />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
