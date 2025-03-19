// React imports
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import currentWeatherData from "../utils/getWeather";
import { WeatherResult } from "../utils/getWeather";

// GraphQL imports
import { GET_CURRENT_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import auth from "../utils/auth";
import logo from "../assets/in-my-closet-header-pic.png";

const NavigationBar = () => {
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loading, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    console.log("User Data:", data);

    const fetchWeather = async (location: string) => {
      try {
        const data = (await currentWeatherData(location)) as WeatherResult;
        console.log("Weather Data:", data);
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      }
    };

    if (data?.currentUser?.location) {
      const userLocation = data.currentUser.location;
      fetchWeather(userLocation);
    } else {
      console.log("Something went wrong to end up here..");
      console.log("I'm just going to go ahead and default to Tokyo");
      const userLocation = "Tokyo";
      fetchWeather(userLocation);
    }
  }, [data]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#ffbe98" }}
    >
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
          {/* If user is logged in, show "Wardrobe", "Outfits", "Add Item", and "Logout" */}
          {auth.loggedIn() ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  // !ADD proper link
                  to="/wardrobe"
                  style={{ color: "#7669ea" }}
                >
                  Wardrobe
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  // !ADD proper link
                  to="/outfits"
                  style={{ color: "#7669ea" }}
                >
                  Outfits
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  // !ADD proper link
                  to="/add-item"
                  style={{ color: "#7669ea" }}
                >
                  Add Item
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  // !ADD proper link
                  to="/logout"
                  style={{ color: "#7669ea" }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              {/* <li className="nav-item">
              <Link className="nav-link fw-bold" to="/" style={{ color: "#7669ea" }}>Home</Link>
            </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  to="/login"
                  style={{ color: "#7669ea" }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  to="/signup"
                  style={{ color: "#7669ea" }}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
