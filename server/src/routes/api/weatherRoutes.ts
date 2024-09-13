import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async(req, res) => {
  // TODO: GET weather data from city name
  try {
    const weatherData = await WeatherService.getWeatherForCity(req.body.city);
    // TODO: save city to search history
    HistoryService.addCity(req.body.city);
    return res.json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO: GET search history
// router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
