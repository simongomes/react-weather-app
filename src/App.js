import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import WeatherCard from "./components/WeatherCard";
import { weatherObject } from "./datasource";
import { Carousel } from "@trendyol-js/react-carousel";
import leftArrow from "./assets/left_icon.png";
import rightArrow from "./assets/right_icon.png";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      // const result = await fetch(
      //   "https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=5&units=metric"
      // ).then((response) => response.json());

      const result = weatherObject;

      setWeatherData(result);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  const { list } = weatherData;

  return (
    <div className="App">
      <div className="main-wrapper">
        {loading && (
          <Box className="loading-wrapper" sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && list && (
          <div className="carousel-wrapper">
            <Carousel
              show={3}
              swiping={true}
              infinite={false}
              leftArrow={
                <div className="arrow left">
                  <img src={leftArrow} alt="left-arrow" />
                </div>
              }
              rightArrow={
                <div className="arrow right">
                  <img src={rightArrow} alt="right-arrow" />
                </div>
              }
            >
              {list.map((item) => (
                <WeatherCard weather={item} />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
