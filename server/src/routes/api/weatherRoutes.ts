import { Router } from "express";
const router = Router();

import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req, res) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName;
    console.log("City name being searched for:", cityName);
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    if (!weatherData) {
      return res.status(404).json({ message: "City not found" });
    }
    // WEATHER DATA FOUND
    console.log("Weather data found successfully: ", weatherData);

    // Prepare the currentWeather object to send back to the client
    const currentWeather = {
      city: cityName,
      date: new Date(weatherData.dt * 1000).toLocaleDateString(),
      icon: weatherData.weather[0].icon,
      iconDescription: weatherData.weather[0].description,
      tempF: (weatherData.main.temp * 9) / 5 + 32, // Convert temperature to Fahrenheit
      windSpeed: weatherData.wind.speed,
      humidity: weatherData.main.humidity,
    };

    // TODO: save city to search history
    await HistoryService.addCity(
      req.body.cityName,
      weatherData.coord.lat,
      weatherData.coord.lon
    );
    console.log("City added to search history");
    return res.json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// TODO: GET search history
router.get("/history", async (_req, res) => {
  try {
    const cities = await HistoryService.getCities();
    console.log("Cities to return", cities);
    return res.json(cities);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error. Error retrieving cities." });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (req, res) => {
  try {
    await HistoryService.removeCity(req.params.id);
    return res.json({ message: "City removed from search history" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error. Error removing city." });
  }
});

export default router;
