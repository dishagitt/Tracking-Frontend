import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  userTypes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunks
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData);
    toast.success("User Registered!");
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData);
    localStorage.setItem("user", JSON.stringify(data));
    toast.success("Login Successful!");
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  toast.success("Logged out successfully!");
});

export const fetchUserTypes = createAsyncThunk("auth/fetchUserTypes", async (userData, thunkAPI) => {
    try {
      const data = await authService.fetchUserTypes(userData);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login Successful!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  });

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, thunkAPI) => {
    try {
      const data  = await authService.changePassword(userData);
      toast.success("Changed Password Successfully!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      resetAuthState: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        // Register
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        // Login
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        // Logout
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
        })

        // Fetch User Types
        .addCase(fetchUserTypes.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUserTypes.fulfilled, (state, action) => {
            state.loading = false;
            state.userTypes = action.payload;
          })
          .addCase(fetchUserTypes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    },
  });
  
  export const { resetAuthState } = authSlice.actions;
  export default authSlice.reducer;