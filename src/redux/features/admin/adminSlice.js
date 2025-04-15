import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardAnalytics } from "./adminService";

export const fetchDashboardAnalytics = createAsyncThunk(
  "admin/fetchDashboardAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await getDashboardAnalytics();
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    analyticsData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analyticsData = action.payload;
      })
      .addCase(fetchDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
