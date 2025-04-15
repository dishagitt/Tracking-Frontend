import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import competitionService from "./competitionService";

// Initial state
const initialState = {
    initialStage: {},
    finalStage: {},
    winnerStage: {},
    loading: false,
    error: null,
    success: false,
    saveInitialStageSuccess: false,
    saveFinalStageSuccess: false,
    saveWinnerStageSuccess: false
};

// ===============================
// Async Thunks
// ===============================


// Get Initial Stage Details
export const getInitialStageDetails = createAsyncThunk(
    "competition/getInitialStageDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await competitionService.getInitialStageDetails();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Save Initial Stage Details
export const saveInitialStageDetails = createAsyncThunk(
    "competition/saveInitialStageDetails",
    async (details, { rejectWithValue }) => {
        try {
            const response = await competitionService.saveInitialStageDetails(details);
            return response.initialStageDetails;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Get Final Stage Details
export const getFinalStageDetails = createAsyncThunk(
    "competition/getFinalStageDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await competitionService.getFinalStageDetails();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Save Final Stage Details
export const saveFinalStageDetails = createAsyncThunk(
    "competition/saveFinalStageDetails",
    async (details, { rejectWithValue }) => {
        try {
            const response = await competitionService.saveFinalStageDetails(details);
            return response.finalStageDetails;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Get Winner Stage Details
export const getWinnerDetails = createAsyncThunk(
    "competition/getWinnerDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await competitionService.getWinnerDetails();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Save Winner Stage Details
export const saveWinnerDetails = createAsyncThunk(
    "competition/saveWinnerDetails",
    async (details, { rejectWithValue }) => {
        try {
            const response = await competitionService.saveWinnerDetails(details);
            return response.winnerDetails;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ===============================
// Slice
// ===============================

const competitionSlice = createSlice({
    name: "competition",
    initialState,
    reducers: {
        resetSaveInitialStageSuccess: (state) => {
            state.saveInitialStageSuccess = false;
        },
        resetSaveFinalStageSuccess: (state) => {
            state.saveFinalStageSuccess = false;
        },
        resetSaveWinnerStageSuccess: (state) => {
            state.saveWinnerStageSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder


            // ===============================
            // Get Initial Stage Details
            // ===============================
            .addCase(getInitialStageDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.initialStage = {};
            })
            .addCase(getInitialStageDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.initialStage = action.payload;
                state.error = null;
            })
            .addCase(getInitialStageDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.initialStage = {};
            })

            // ===============================
            // Save Initial Stage Details
            // ===============================
            .addCase(saveInitialStageDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveInitialStageSuccess = false;
            })
            .addCase(saveInitialStageDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.initialStage = action.payload;
                state.error = null;
                state.success = true;
                state.saveInitialStageSuccess = true;
            })
            .addCase(saveInitialStageDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.saveInitialStageSuccess = false;
            })

            // ===============================
            // Get Final Stage Details
            // ===============================
            .addCase(getFinalStageDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.finalStage = {};
            })
            .addCase(getFinalStageDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.finalStage = action.payload;
                state.error = null;
            })
            .addCase(getFinalStageDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.finalStage = {};
            })

            // ===============================
            // Save Final Stage Details
            // ===============================
            .addCase(saveFinalStageDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveFinalStageSuccess = false;
            })
            .addCase(saveFinalStageDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.finalStage = action.payload;
                state.error = null;
                state.success = true;
                state.saveFinalStageSuccess = true;
            })
            .addCase(saveFinalStageDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.saveFinalStageSuccess = false;
            })

            // ===============================
            // Get Winner Stage Details
            // ===============================
            .addCase(getWinnerDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.winnerStage = {};
            })
            .addCase(getWinnerDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.winnerStage = action.payload;
                state.error = null;
            })
            .addCase(getWinnerDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.winnerStage = {};
            })

            // ===============================
            // Save Winner Stage Details
            // ===============================
            .addCase(saveWinnerDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveWinnerStageSuccess = false;
            })
            .addCase(saveWinnerDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.winnerStage = action.payload;
                state.error = null;
                state.success = true;
                state.saveWinnerStageSuccess = true;
            })
            .addCase(saveWinnerDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.saveWinnerStageSuccess = false;
            });
    },
});

export const { resetSaveInitialStageSuccess, resetSaveFinalStageSuccess, resetSaveWinnerStageSuccess } = competitionSlice.actions;

export default competitionSlice.reducer;
