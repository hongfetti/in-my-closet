import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import currentWeatherData from "../utils/getWeather";

const NavigationBar = () => {
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = 'Orlando';
        const data = await currentWeatherData(location);
        console.log(data);
        setWeather(data);
        
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Navbar brand (logo or site title) */}
        <Link className="navbar-brand" to="/">
          My Closet
        </Link>

        {weather && (
          <div className="weather-info">
            <img src={weather.condition_icon} alt={weather.condition_text} />
            <span>{weather.current_temp_f}, {weather.location_name}, {weather.location_region}</span>
          </div>
        )}

        {error && <div className="weather-error">{error}</div>}

        {/* Toggle button for mobile responsiveness */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
