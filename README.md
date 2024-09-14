# BackEnd-WeatherAPI

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  
![Node.js](https://img.shields.io/badge/Runtime-Node.js-brightgreen)  
![Express](https://img.shields.io/badge/Framework-Express-blue)  
![Vite](https://img.shields.io/badge/Frontend-Vite-orange)  
![JavaScript](https://img.shields.io/badge/Language-JavaScript-brightgreen)  
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)  
![Render](https://img.shields.io/badge/Deployment-Render-blue)

## Table of Contents

- [BackEnd-WeatherAPI](#backend-weatherapi)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation Instructions](#installation-instructions)
  - [Usage Instructions](#usage-instructions)
    - [Build and Deployment:](#build-and-deployment)
  - [Contributing Guidelines](#contributing-guidelines)
  - [License Information](#license-information)
  - [Acknowledgments](#acknowledgments)
  - [Questions](#questions)
  - [Resources](#resources)

## Description

The Weather Dashboard API is a full-stack web application that provides current weather data and a 5-day forecast for a user-specified city. It is built with Express.js on the backend and Vite for the frontend. The app fetches data from the OpenWeatherMap API and dynamically displays weather updates. It also saves the search history locally, allowing users to revisit previous searches.

This app is deployed on [Render](https://render.com/) and can be accessed live at:  
**[Weather Dashboard API on Render](https://backend-weatherapi-3.onrender.com/)**

![Weather Dashboard Screenshot](link-to-screenshot)

## Installation Instructions

To install and run the Weather Dashboard API locally, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/savevsgames/BackEnd-WeatherAPI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BackEnd-WeatherAPI
   ```
3. Install the required dependencies for both the server and client:
   ```bash
   npm run install
   ```
4. Create a `.env` file in the `server` directory with your OpenWeather API key:
   ```
   WEATHER_API_KEY=your_openweather_api_key_here
   ```

## Usage Instructions

1. To use the Weather Dashboard API, start the development server:
   ```bash
   npm run start:dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
3. Enter a city name in the search bar to get the current weather and 5-day forecast.
4. The search history will be saved, and you can click on any previously searched city to reload the weather data.

### Build and Deployment:

To build the project for production:

```bash
npm run render-build
```

The live project is deployed at:  
**[Weather Dashboard API on Render](https://backend-weatherapi-3.onrender.com/)**

## Contributing Guidelines

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request with a detailed description of your changes.

## License Information

This repository is covered under the MIT License.  
You can view the license [here](./LICENSE).

## Acknowledgments

I would like to thank the following:

- **OpenWeatherMap**: For providing the weather data API that powers this app.
- **Express.js**: For providing a fast and minimal backend framework.
- **Vite**: For offering an efficient and modern frontend build tool.
- **Node.js**: For enabling server-side JavaScript.
- **Render**: For providing the platform to deploy this project.

## Questions

- **GitHub Profile**: [savevsgames](https://github.com/savevsgames)
- **Email**: gregcbarker@gmail.com

For any questions or issues, please open an issue on the repository or send an email.

## Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
