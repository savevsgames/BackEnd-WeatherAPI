import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// TODO: Define a City class with name and id properties
// The city should also have optional lat and lon properties for future convenience
// This is because the API query prefers the city's latitude and longitude to its name
class City {
  name: string;
  id: string;
  lat?: number;
  lon?: number;
  constructor(name: string, id: string, lat?: number, lon?: number) {
    this.name = name;
    this.id = id;
    this.lat = lat !== undefined ? lat : 0;
    this.lon = lon !== undefined ? lon : 0;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<string> {
    const fileData = await fs.readFile(
      "searchHistory.json",
      "utf8",
      (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }
        console.log("Data read from file:", data);
        return data;
      }
    );
    return JSON.stringify(fileData);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    fs.writeFile("searchHistory.json", JSON.stringify(cities), (err) => {
      if (err) {
        console.error("Error writing to cities array file:", err);
        return;
      }
      console.log("Cities array file updated successfully!");
    });
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const data = await this.read();
    const cities = JSON.parse(data);
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // giving the city a unique id will allow us to remove it later
  async addCity(city: string) {
    const cities = await this.getCities();
    const id = uuidv4();
    cities.push(new City(city, id));
    this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter((city: City) => city.id !== id);
    this.write(updatedCities);
  }
}

export default new HistoryService();
