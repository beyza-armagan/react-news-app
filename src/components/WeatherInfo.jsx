import { useWeather } from "../context/WeatherContext";

export default function WeatherInfo() {
  const { weatherData } = useWeather();

  if (!weatherData || !weatherData[0]) {
    console.log("Error loading data.");
    return;
  }

  return (
    <div className="data-container">
      {weatherData.map((dayData, index) => (
        <div
          key={index}
          className={`weather-info${index === 0 ? "-selected" : ""}`}
        >
          <p>{getDayOfWeek(dayData.date)}</p>
          {weatherData && (
            <img src={dayData.weatherIconUrl} alt="Weather Icon" />
          )}

          <div className="weather-degrees">
            <p className="temperature">{Math.floor(dayData.tempMax)}°C</p>
            <p>{Math.floor(dayData.tempMin)}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function getDayOfWeek(dateString) {
  const dateObject = new Date(dateString);
  const options = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(dateObject);
}
