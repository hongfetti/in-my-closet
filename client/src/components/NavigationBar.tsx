// React imports
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import currentWeatherData from "../utils/getWeather";
import { WeatherResult } from "../utils/getWeather";
import logo from "../assets/2.png";

// GraphQL imports
import { GET_CURRENT_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const NavigationBar = () => {
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loading, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    const fetchWeather = async (location: string) => {
      try {
        const data = (await currentWeatherData(location)) as WeatherResult;
        console.log(data);
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      }
    };

    if (data?.currentUser?.location) {
      const userLocation = data.currentUser.location;
      fetchWeather(userLocation);
    }
  }, [data]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#ffbe98" }}
    >
      <div className="container">
        {/* Navbar brand (logo or site title) */}
        <Link className="navbar-brand" to="/">
          My Closet
        </Link>

        {/* Weather Section */}
        <div className="weather-info">
          {loading && <span>Loading weather...</span>}
          {weather && (
            <>
              <img src={weather.condition_icon} alt={weather.condition_text} />
              <span>
                {weather.current_temp_f}, {weather.location_name},{" "}
                {weather.location_region}
              </span>
            </>
          )}
        </div>

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

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/signup">
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
