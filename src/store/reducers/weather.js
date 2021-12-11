import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  weather: [],
  chartLabels: [],
  chartValues: [],
};

const getFiveDaysWeather = (weatherData) => {
  let weathers = [];
  if (weatherData.length) {
    weathers.push(weatherData[0]);
    let current = moment(weatherData[0].dt_txt).format("DD MMM. YYYY");
    weatherData.forEach((weather) => {
      if (current !== moment(weather.dt_txt).format("DD MMM. YYYY")) {
        weathers.push(weather);
        current = moment(weather.dt_txt).format("DD MMM. YYYY");
      }
    });
  }
  return weathers.slice(0, 5);
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    SET_WEATHER: (state, action) => {
      state.weather = getFiveDaysWeather(action.payload);
      state.chartLabels = state.weather.map((weather) =>
        moment(weather.dt_txt).format("DD MMM. YYYY")
      );
      state.chartValues = state.weather.map((weather) => weather.main.temp);
    },
    CHANGE_UNIT: (state, action) => {
      if (action.payload !== "celcius") {
        state.chartValues = state.chartValues.map((value) =>
          Math.floor(value * (9 / 5) + 32)
        );
      } else {
        state.chartValues = state.weather.map((weather) => weather.main.temp);
      }
    },
  },
});

export const { SET_WEATHER, CHANGE_UNIT } = weatherSlice.actions;

export default weatherSlice.reducer;
