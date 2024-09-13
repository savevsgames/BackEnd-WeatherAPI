import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
export class Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    message?: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;

  constructor(data: any) {
    this.coord = data.coord;
    this.weather = data.weather;
    this.base = data.base;
    this.main = data.main;
    this.visibility = data.visibility;
    this.wind = data.wind;
    this.clouds = data.clouds;
    this.rain = data.rain;
    this.snow = data.snow;
    this.dt = data.dt;
    this.sys = data.sys;
    this.timezone = data.timezone;
    this.id = data.id;
    this.name = data.name;
    this.cod = data.cod;
  }
} // Based on the OpenWeatherMap API response

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private baseURLGeo: string;
  private apiKey: string;
  private cityName: string;

  constructor(
    baseURL = "https://api.openweathermap.org/data/2.5",
    baseURLGeo = "https://api.openweathermap.org/geo/1.0/direct",
    apiKey = process.env.WEATHER_API_KEY || "",
    cityName = "Toronto"
  ) {
    this.baseURL = baseURL;
    this.baseURLGeo = baseURLGeo;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }
  // TODO: Create fetchLocationData method
  // Fetch location data based on the city name or default city
  private async fetchLocationData(city?: string): Promise<Coordinates> {
    const cityName = city || this.cityName; // Use default if no city provided
    const geocodeQuery = this.buildGeocodeQuery(cityName);
    console.log("Geocode query:", geocodeQuery);

    try {
      const response = await fetch(geocodeQuery);
      console.log("Response from fetch request:", response);

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`Error fetching location data: ${response.statusText}`);
      }

      const locationData = await response.json();
      console.log("Location data from fetch request:", locationData);

      if (!locationData || locationData.length === 0) {
        throw new Error("No location data found for the specified city.");
      }

      return this.destructureLocationData(locationData[0]);
    } catch (error) {
      console.error("Fetch location error:", error);
      throw new Error("Unable to fetch location data.");
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    const geocodeQuery = `${this.baseURLGeo}?q=${query}&limit=1&appid=${this.apiKey}`;
    return geocodeQuery;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    return weatherQuery;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // Create fetchWeatherData method for both current weather and forecast
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    const forecastQuery = `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`; // For 5-day forecast

    try {
      // Fetch current weather
      const weatherResponse = await fetch(weatherQuery);
      const currentWeather = await weatherResponse.json();

      // Fetch forecast data
      const forecastResponse = await fetch(forecastQuery);
      const forecastData = await forecastResponse.json();

      // Build the forecast array
      const forecastArray = this.buildForecastArray(forecastData.list); // 'list' is the array containing forecast data

      return { currentWeather, forecastArray };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Unable to fetch weather data.");
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(data: any): Weather {
    return new Weather(data);
  }
  // TODO: Complete buildForecastArray method
  // Build a forecast array for the 5-day forecast (daily)
  private buildForecastArray(forecastData: any[]): any[] {
    // Group forecast data into daily intervals
    const dailyForecast: any[] = [];

    // OpenWeather returns forecast data in 3-hour intervals, so we can filter for 1 forecast per day (e.g., midday).
    // You can customize this filtering logic as needed.
    forecastData.forEach((dataPoint: any) => {
      const date = new Date(dataPoint.dt * 1000); // Convert UNIX timestamp to JavaScript Date
      const hours = date.getUTCHours(); // Get hours (we can filter by hours)

      // Assume we take the forecast at midday (12 PM)
      if (hours === 12) {
        dailyForecast.push({
          date: date.toLocaleDateString(), // Format as a readable date
          icon: dataPoint.weather[0].icon, // Weather icon code
          iconDescription: dataPoint.weather[0].description, // Icon description
          tempF: Math.round((dataPoint.main.temp * 9) / 5 + 32), // Convert temperature to Fahrenheit
          windSpeed: dataPoint.wind.speed, // Wind speed
          humidity: dataPoint.main.humidity, // Humidity
        });
      }
    });

    return dailyForecast;
  }
  // TODO: Complete getWeatherForCity method
  public async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    console.log("Coordinates for the fetch request:", coordinates);
    return this.fetchWeatherData(coordinates);
  }
}

export default new WeatherService();
