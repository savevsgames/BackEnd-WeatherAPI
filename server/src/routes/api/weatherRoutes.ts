import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { Weather } from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async(req, res) => {
  // TODO: GET weather data from city name
  const weatherData: Promise<Weather> = await WeatherService.getWeatherForCity(req.body.city);
  // TODO: save city to search history
  // HistoryService.addCity(req.body.city);
  return res.json(weatherData);
});

// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
