// import dotenv from "dotenv";
// dotenv.config();

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface WeatherData {
  location: Location;
  current: Current;
}

export interface WeatherResult {
  location_name: string;
  location_region: string;
  current_temp_f: number;
  condition_text: string;
  condition_icon: string;
}

// Parse the JSON response

// const data: WeatherData = JSON.parse(jsonResponse);

async function fetchWeatherData(location: string) {
    const baseURL = import.meta.env.VITE_WEATHER_API_BASE_URL || "";
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY || "";
  const url = `${baseURL}key=${apiKey}&q=${location}`;

  console.log("Made it to fetchWeatherData for location: ", location);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Extract the required fields
async function currentWeatherData(location: string) {
  try {
    const rawWeatherData = await fetchWeatherData(location);

    const weatherData: WeatherResult = {
      location_name: rawWeatherData.location.name,
      location_region: rawWeatherData.location.region,
      current_temp_f: rawWeatherData.current.temp_f,
      condition_text: rawWeatherData.current.condition.text,
      condition_icon: rawWeatherData.current.condition.icon,
    };

    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error("Error in main function:", error);
    return error;
  }
}


export default currentWeatherData;
