// src/features/auth/authSlice.js
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
  teamMembers: [],
  memberLoading: false,
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
  localStorage.removeItem("user");
  toast.success("Logged out successfully!");
});

export const fetchUserTypes = createAsyncThunk("auth/fetchUserTypes", async (_, thunkAPI) => {
  try {
    const data = await authService.fetchUserTypes();
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const changePassword = createAsyncThunk("auth/changePassword", async (data, thunkAPI) => {
  try {
    const res = await authService.changePassword(data);
    toast.success("Changed Password Successfully!");
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchMembers = createAsyncThunk("auth/fetchMembers", async (userId, thunkAPI) => {
  try {
    const data = await authService.fetchMembers(userId);
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteMember = createAsyncThunk("auth/deleteMember", async (memberId, thunkAPI) => {
  try {
    await authService.deleteMember(memberId);
    toast.success("Team member deleted!");
    return memberId;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error("Error deleting team member");
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateMember = createAsyncThunk("auth/updateMember", async ({ id, updatedData }, thunkAPI) => {
  try {
    const data = await authService.updateMember(id, updatedData); // Assuming service has an updateMember method
    toast.success("Team member updated successfully!");
    return data; // Return updated member data
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});




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
        state.isLoading = true;
      })
      .addCase(fetchUserTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTypes = action.payload;
      })
      .addCase(fetchUserTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch Members
      .addCase(fetchMembers.pending, (state) => {
        state.memberLoading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.memberLoading = false;
        state.teamMembers = action.payload;
      })
      .addCase(fetchMembers.rejected, (state) => {
        state.memberLoading = false;
        state.teamMembers = [];
      })

      // Delete Member
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.teamMembers = state.teamMembers.filter(member => member._id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Update Member
      .addCase(updateMember.pending, (state) => {
        state.memberLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.memberLoading = false;
        const updatedMember = action.payload;
        state.teamMembers = state.teamMembers.map((member) =>
          member._id === updatedMember._id ? updatedMember : member
        );
        toast.success("Team member updated successfully!");
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.memberLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
