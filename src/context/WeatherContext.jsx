import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const WeatherContext = createContext();

export const WeatherProvider = ({ value, children }) => {
  const setWeather = (data) => {
    value.setWeatherData(data);
  };

  const contextValue = {
    ...value,
    setWeather,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};

WeatherProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.object,
};
