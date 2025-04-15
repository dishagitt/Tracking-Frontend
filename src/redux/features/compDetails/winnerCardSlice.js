import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch winners
export const fetchWinners = createAsyncThunk(
  "winners/fetchWinners",
  async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=9");
    return response.data.map((user, index) => ({
      id: user.id,
      teamName: user.company.name,
      competition: `Competition ${index + 1}`,
      image: `https://randomuser.me/api/portraits/lego/${index + 1}.jpg`,
      problem: `Problem ${index + 1}`,
      abstract: `This is a brief abstract for team ${user.company.name}.`,
    }));
  }
);

const compDetailsSlice = createSlice({
  name: "winners",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default compDetailsSlice.reducer;
