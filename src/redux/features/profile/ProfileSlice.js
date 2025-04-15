import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./ProfileService";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  userProfile: null,
  mentorExtraFields: null,
  volunteerExtraFields: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunks

// Fetch Basic Profile Data
export const fetchBasicProfileData = createAsyncThunk(
  "profile/fetchBasicProfileData",
  async (userId, thunkAPI) => {
    try {
      const data = await profileService.fetchBasicProfileData(userId);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Basic Profile Data
export const updateBasicProfileData = createAsyncThunk(
  "profile/updateBasicProfileData",
  async ({ userId, profileData }, thunkAPI) => {
    try {
      const data = await profileService.updateBasicProfileData(userId, profileData);
      toast.success("Profile updated successfully!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch Mentor Extra Fields
export const fetchMentorExtraFields = createAsyncThunk(
  "profile/fetchMentorExtraFields",
  async (mentorId, thunkAPI) => {
    try {
      const data = await profileService.fetchMentorExtraFields(mentorId);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Save Mentor Extra Fields
export const saveMentorExtraFields = createAsyncThunk(
  "profile/saveMentorExtraFields",
  async ({ mentorId, extraFields }, thunkAPI) => {
    try {
      const data = await profileService.saveMentorExtraFields(mentorId, extraFields);
      toast.success("Mentor extra fields saved!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch Volunteer Extra Fields
export const fetchVolunteerExtraFields = createAsyncThunk(
  "profile/fetchVolunteerExtraFields",
  async (volunteerId, thunkAPI) => {
    try {
      const data = await profileService.fetchVolunteerExtraFields(volunteerId);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Save Volunteer Extra Fields
export const saveVolunteerExtraFields = createAsyncThunk(
  "profile/saveVolunteerExtraFields",
  async ({ volunteerId, extraFields }, thunkAPI) => {
    try {
      const data = await profileService.saveVolunteerExtraFields(volunteerId, extraFields);
      toast.success("Volunteer extra fields saved!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch Basic Profile Data
    builder
      .addCase(fetchBasicProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBasicProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProfile = action.payload;
      })
      .addCase(fetchBasicProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Basic Profile Data
      .addCase(updateBasicProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBasicProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProfile = action.payload;
      })
      .addCase(updateBasicProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch Mentor Extra Fields
      .addCase(fetchMentorExtraFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMentorExtraFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mentorExtraFields = action.payload;
      })
      .addCase(fetchMentorExtraFields.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Save Mentor Extra Fields
      .addCase(saveMentorExtraFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveMentorExtraFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mentorExtraFields = action.payload;
      })
      .addCase(saveMentorExtraFields.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch Volunteer Extra Fields
      .addCase(fetchVolunteerExtraFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVolunteerExtraFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.volunteerExtraFields = action.payload;
      })
      .addCase(fetchVolunteerExtraFields.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Save Volunteer Extra Fields
      .addCase(saveVolunteerExtraFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveVolunteerExtraFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.volunteerExtraFields = action.payload;
      })
      .addCase(saveVolunteerExtraFields.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
