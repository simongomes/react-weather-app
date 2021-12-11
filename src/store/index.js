import { configureStore } from "@reduxjs/toolkit";

import unitReducer from "./reducers/unit";
import weatherReducer from "./reducers/weather";

export const store = configureStore({
  reducer: {
    unit: unitReducer,
    weather: weatherReducer,
  },
});
