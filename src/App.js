import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_UNIT } from "./store/reducers/unit";
import { SET_WEATHER, CHANGE_UNIT } from "./store/reducers/weather";
import {
  CircularProgress,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import WeatherCard from "./components/WeatherCard";
import { Carousel } from "@trendyol-js/react-carousel";
import leftArrow from "./assets/left_icon.png";
import rightArrow from "./assets/right_icon.png";
import "./App.css";
import WeatherChart from "./components/WeatherChart";

function App() {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [elimentToShow, setElimentToShow] = useState(3);
  const { unit } = useSelector((state) => state.unit);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeather = async () => {
      const result = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=afbcbc81f6c77a65fdcb4edaf59b03c6&cnt=40&units=metric"
      ).then((response) => response.json());
      if (result.cod === "200") {
        dispatch(SET_WEATHER(result.list));
      } else {
        setFetchError(true);
      }
      setLoading(false);
    };
    fetchWeather();
    window.innerWidth <= 480 ? setElimentToShow(1) : setElimentToShow(3);
  }, [dispatch]);

  const list = useSelector((state) => state.weather.weather);

  const unitChangeHandler = (e) => {
    const { value } = e.target;
    dispatch(UPDATE_UNIT(value));
    dispatch(CHANGE_UNIT(value));
  };

  const reloadApp = async () => {
    setLoading(true);

    const result = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=afbcbc81f6c77a65fdcb4edaf59b03c6&cnt=40&units=metric"
    ).then((response) => response.json());
    if (result.cod === "200") {
      dispatch(SET_WEATHER(result.list));
      dispatch(UPDATE_UNIT("celcius"));
    } else {
      setFetchError(true);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="main-wrapper">
        {loading && (
          <Box className="loading-wrapper" sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {fetchError && (
          <Box
            className="unit-wrapper"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              sx={{
                mb: 2,
                fontSize: 14,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Server Error! Try again Latter
            </Typography>
          </Box>
        )}
        {!loading && !fetchError && list && (
          <>
            <Box
              className="unit-wrapper"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <RadioGroup
                row
                aria-label="unit"
                name="row-radio-buttons-group"
                value={unit}
                onChange={unitChangeHandler}
              >
                <FormControlLabel
                  value="celcius"
                  control={<Radio />}
                  label="Celcius"
                />
                <FormControlLabel
                  value="farenheit"
                  control={<Radio />}
                  label="Farenheit"
                />
              </RadioGroup>
              <Button variant="outlined" onClick={reloadApp}>
                Refresh
              </Button>
            </Box>
            <div className="carousel-wrapper">
              <Carousel
                show={elimentToShow}
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
                {list.map((item, index) => (
                  <WeatherCard key={index} weather={item} />
                ))}
              </Carousel>
            </div>
            <Box className="chart-wrapper">
              <WeatherChart />
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
