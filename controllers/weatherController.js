const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

exports.getWeather = async (req, res) => {
    const { city } = req.params;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API key is missing in server configuration' });
    }

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        const weatherData = response.data;

        res.status(200).json({
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
            coordinates: {
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon
            }
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.response?.data || error.message);

        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message });
        }

        res.status(500).json({ error: 'Failed to fetch weather data. Please try again later.' });
    }
};
