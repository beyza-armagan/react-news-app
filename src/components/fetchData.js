import axios from "axios";
import config from "../../config";

export const fetchData = async (city) => {
  const apiKey = config.apiKey;

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    const get8Days = (weatherData) => {
      const uniqueDays = new Set();
      const result = [];

      for (const line of weatherData.list) {
        const dateObject = new Date(line.dt_txt);
        const currentDay = dateObject.getDate();

        if (uniqueDays.size < 8 && !uniqueDays.has(currentDay)) {
          uniqueDays.add(currentDay);
          result.push(line);
        }

        if (uniqueDays.size === 8) {
          break; // exit the loop once there are 8 unique days
        }
      }
      console.log(weatherData);
      return result;
    };

    const weekDays = get8Days(weatherData);

    const formattedWeatherData = weekDays.map((day) => {
      const date = day.dt_txt;
      const tempMax = day.main.temp;
      const tempMin = day.main.temp_min;
      const weatherIconCode = day.weather[0].icon;
      const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

      return {
        date,
        tempMax,
        tempMin,
        weatherIconUrl,
      };
    });

    return { weatherData: formattedWeatherData };
  } catch (error) {
    console.error("Error : ", error);
  }
};
