import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../utils/config"; 

interface PetrolPumpState {
  petrolPumps: any[]; 
  status: "idle" | "loading" | "succeeded" | "failed"; 
  error: string | null; 
}

const initialState: PetrolPumpState = {
  petrolPumps: [],
  status: "idle",
  error: null,
};

export const fetchPetrolPumps = createAsyncThunk(
  "petrolPump/fetchPetrolPumps",
  async () => {
    const response = await fetch(`${BASE_URL}/PetrolPumps/`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  }
);

const petrolPumpSlice = createSlice({
  name: "petrolPump",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetrolPumps.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPetrolPumps.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.petrolPumps = action.payload;
      })
      .addCase(fetchPetrolPumps.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching data"; 
      });
  },
});

export default petrolPumpSlice.reducer;
