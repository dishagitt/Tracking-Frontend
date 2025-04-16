import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// THUNKS

// dashboard thunk
export const fetchDashboardAnalytics = createAsyncThunk(
  "admin/fetchDashboardAnalytics",
  async (_, thunkAPI) => {
    try {
      return await adminService.getDashboardAnalytics();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch analytics");
    }
  }
);

// Annoncement Thunks
export const fetchAllAnnouncements = createAsyncThunk(
  "admin/fetchAllAnnouncements",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllAnnouncements();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch announcements");
    }
  }
);

export const addAnnouncement = createAsyncThunk(
  "admin/addAnnouncement",
  async (data, thunkAPI) => {
    try {
      return await adminService.addAnnouncement(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to add announcement");
    }
  }
);

export const updateAnnouncement = createAsyncThunk(
  "admin/updateAnnouncement",
  async (data, thunkAPI) => {
    try {
      return await adminService.updateAnnouncement(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to update announcement");
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "admin/deleteAnnouncement",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteAnnouncement(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to delete announcement");
    }
  }
);

// User Types Thunks
export const fetchAllUserTypes = createAsyncThunk(
  "admin/fetchAllUserTypes",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllUserTypes();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch user types");
    }
  }
);

export const addUserType = createAsyncThunk(
  "admin/addUserType",
  async (data, thunkAPI) => {
    try {
      return await adminService.addUserType(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to add user type");
    }
  }
);

export const updateUserType = createAsyncThunk(
  "admin/updateUserType",
  async (data, thunkAPI) => {
    try {
      return await adminService.updateUserType(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to update user type");
    }
  }
);

export const deleteUserType = createAsyncThunk(
  "admin/deleteUserType",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteUserType(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to delete user type");
    }
  }
);

// Branch Thunks
export const fetchAllBranches = createAsyncThunk(
  "admin/fetchAllBranches",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllBranches();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch branches");
    }
  }
);

export const addBranch = createAsyncThunk(
  "admin/addBranch",
  async (data, thunkAPI) => {
    try {
      return await adminService.addBranch(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to add branch");
    }
  }
);

export const updateBranch = createAsyncThunk(
  "admin/updateBranch",
  async (data, thunkAPI) => {
    try {
      return await adminService.updateBranch(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to update branch");
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "admin/deleteBranch",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteBranch(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to delete branch");
    }
  }
);

// Department Thunks
export const fetchAllDepartments = createAsyncThunk(
  "admin/fetchAllDepartments",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllDepartments();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch departments");
    }
  }
);

export const addDepartment = createAsyncThunk(
  "admin/addDepartment",
  async (department, thunkAPI) => {
    try {
      return await adminService.addDepartment(department);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to add department");
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "admin/updateDepartment",
  async ({ id, department }, thunkAPI) => {
    try {
      return await adminService.updateDepartment(id, department);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to update department");
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "admin/deleteDepartment",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteDepartment(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to delete department");
    }
  }
);




// INITIAL STATE
const initialState = {
  analyticsData: null,
  announcements: [],
  userTypes: [],
  loading: false,
  error: null,
};

// SLICE
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // DASHBOARD
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
      })

      // ANNOUNCEMENTS
      .addCase(fetchAllAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAllAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.announcements.unshift(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        const index = state.announcements.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.announcements = state.announcements.filter(
          (item) => item.id !== action.meta.arg
        );
      })

      // User Types
      .addCase(fetchAllUserTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUserTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.userTypes = action.payload;
      })
      .addCase(fetchAllUserTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addUserType.fulfilled, (state, action) => {
        state.userTypes.push(action.payload);
      })
      .addCase(updateUserType.fulfilled, (state, action) => {
        const index = state.userTypes.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.userTypes[index] = action.payload;
        }
      })
      .addCase(deleteUserType.fulfilled, (state, action) => {
        state.userTypes = state.userTypes.filter(
          (item) => item.id !== action.meta.arg
        );
      })

      // Errors for Add/Update/Delete
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Errors for User Type Add/Update/Delete
      .addCase(addUserType.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUserType.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteUserType.rejected, (state, action) => {
        state.error = action.payload;
      })

            // Branches
            .addCase(fetchAllBranches.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchAllBranches.fulfilled, (state, action) => {
              state.loading = false;
              state.branches = action.payload;
            })
            .addCase(fetchAllBranches.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
      
            .addCase(addBranch.fulfilled, (state, action) => {
              state.branches.push(action.payload);
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
              const index = state.branches.findIndex(
                (item) => item.id === action.payload.id
              );
              if (index !== -1) {
                state.branches[index] = action.payload;
              }
            })
            .addCase(deleteBranch.fulfilled, (state, action) => {
              state.branches = state.branches.filter(
                (item) => item.id !== action.meta.arg
              );
            })
      
            // Errors for Branch Add/Update/Delete
            .addCase(addBranch.rejected, (state, action) => {
              state.error = action.payload;
            })
            .addCase(updateBranch.rejected, (state, action) => {
              state.error = action.payload;
            })
            .addCase(deleteBranch.rejected, (state, action) => {
              state.error = action.payload;
            });
      
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
