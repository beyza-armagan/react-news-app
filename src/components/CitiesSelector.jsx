import TurkishCities from "../data/TurkishCities.json";
import PropTypes from "prop-types";

function CitiesSelector({ onSelectCity, selectedCity }) {
  return (
    <div>
      <select
        className="city-selector"
        id="city"
        value={selectedCity}
        onChange={(e) => onSelectCity(e.target.value)}
      >
        {TurkishCities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CitiesSelector;

CitiesSelector.propTypes = {
  onSelectCity: PropTypes.func,
  selectedCity: PropTypes.string,
};
