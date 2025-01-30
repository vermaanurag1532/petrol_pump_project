import { configureStore } from "@reduxjs/toolkit";
import petrolPumpReducer from "./petrolPumpSlice";

export const store = configureStore({
  reducer: {
    petrolPump: petrolPumpReducer,
  },
});

// Infer types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
