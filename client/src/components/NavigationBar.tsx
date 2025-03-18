import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import currentWeatherData from "../utils/getWeather";
import logo from "../assets/in-my-closet-header-pic.png";

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
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ffbe98" }}>
      <div className="container">
      <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="In My Closet Logo"
            width="250"
            height="85"
            className="d-inline-block align-top"
          />
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="nav-link fw-bold" to="/" style={{ color: "#7669ea" }}>Home</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/login" style={{ color: "#7669ea" }}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/signup" style={{ color: "#7669ea" }}>Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;




