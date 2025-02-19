const express  = require("express");
const app = express();
const PORT = 3000;
const WEATHER_API_KEY = "3bf7143168ac8e48b8d7a7e8f33a311e";
const NEWS_API_KEY = "https://newsapi.org/v2/top-headlines?country=us&apiKey=cc2d392acaaa48a895a6ca3f7ff48d68";
const MAPS_API_KEY = "AIzaSyBbrKJrZy10l3Jr4ohJa_zd4oM_jwogkCs";
const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/USD";
app.use(express.static(__dirname));

app.get("/weather",async(req,res)=>{
    const city = req.query.city;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const weatherData = await fetch(weatherUrl).then(r=>r.json());

    const {lat,lon} = weatherData.coord;
    const aqiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const aqiData = await fetch(aqiUrl).then(r=>r.json());

    const countryUrl = `https://restcountries.com/v3.1/alpha/${weatherData.sys.country}`;
    const countryData = await fetch(countryUrl).then(r=>r.json());
    res.json({
        temp: weatherData.main.temp,
        feelslike: weatherData.main.feels_like,
        description: weatherData.weather[0].description,
        icon:weatherData.weather[0].icon,
        humidity: weatherData.main.humidity,
        pressure:weatherData.main.pressure,
        wind:weatherData.wind.speed,
        lat,
        lon,
        country:countryData[0].name.common,
        countryCode:weatherData.sys.country,
        flag:countryData[0].flags.png,
        aqi:aqiData.list[0].main.aqi,
        mapUrl: `https://www.google.com/maps/embed/v1/view?key=${MAPS_API_KEY}&center=${lat},${lon}&zoom=10`
    });
});
app.get("/exchange-rates",async(req,res)=>{
    const data = await fetch(EXCHANGE_API_URL).then(r=>r.json());
    res.json({rates:data.rates});
});
app.get("/news",async(req,res)=>{
    const newsData = await fetch(NEWS_API_KEY).then(r=>r.json());
    res.json(newsData.articles.slice(0, 5));
});
app.listen(PORT,()=>console.log(`running at: http://localhost:${PORT}`));



