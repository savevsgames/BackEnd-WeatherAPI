import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
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
  private apiKey: string;
  private cityName: string;

  constructor(
    baseURL = "https://api.openweathermap.org/data/2.5",
    apiKey = process.env.WEATHER_API_KEY || "",
    cityName = "Toronto"
  ) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }
  // TODO: Create fetchLocationData method
  // Will take a city name and return the coordinates
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const geocodeQuery = this.buildGeocodeQuery(query);
    const response = await fetch(geocodeQuery);
    const locationData = await response.json();
    return this.destructureLocationData(locationData[0]);
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
    const geocodeQuery = `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
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
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    const weatherData = await response.json();
    return this.parseCurrentWeather(weatherData);
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(data: any): Weather {
    return new Weather(data);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(
    currentWeather: Weather,
    weatherData: any[]
  ): any[] {
    return weatherData.map((dataPoint: any) => ({
      dateTime: new Date(dataPoint.dt * 1000), // Convert UNIX timestamp to JS Date object
      temperature: dataPoint.main.temp, // Extract temperature
      weatherDescription: dataPoint.weather[0].description, // Weather description
      icon: dataPoint.weather[0].icon, // Weather icon
      windSpeed: dataPoint.wind.speed, // Wind speed
    }));
  }
  // TODO: Complete getWeatherForCity method
  public async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    return this.fetchWeatherData(coordinates);
  }
}

export default new WeatherService();
