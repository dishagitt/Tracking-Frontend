import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamInfoService from "./teamInfoService";

// Initial state
const initialState = {
    teamName: "",
    members: [],
    mentor: {},
    departments: [],
    branches: [],
    mentors: [], // Registered mentors list
    teamMentors: [], //added for team mentors,
    competition: {},
    loading: false,
    error: null,
    success: false, // Overall success flag
    saveTeamNameSuccess: false,
    saveTeamMentorSuccess: false,
    saveCompetitionDetailsSuccess: false,
    saveMemberDataSuccess: false,
};

// Fetching Departments
export const fetchDepartments = createAsyncThunk(
    "teamInfo/fetchDepartments",
    async () => {
        const response = await teamInfoService.fetchDepartments();
        return response;
    }
);

// fetching Branches
export const fetchBranches = createAsyncThunk(
    "teamInfo/fetchBranches",
    async () => {
        const response = await teamInfoService.fetchBranches();
        return response;
    }
);

// Save Team Name (only for team name)
export const saveTeamName = createAsyncThunk(
    "teamInfo/saveTeamName",
    async (teamName) => {
        const response = await teamInfoService.saveTeamName(teamName);
        return response;
    }
);

// Fetch Registered Mentor List
export const fetchRegisteredMentors = createAsyncThunk(
    "teamInfo/fetchRegisteredMentors",
    async () => {
        const response = await teamInfoService.fetchRegisteredMentors();
        return response;
    }
);

// Fetch Team Members by Team Leader ID
export const getMembersByTeamLeader = createAsyncThunk(
    "teamInfo/getMembersByTeamLeader",
    async (teamLeaderId) => {
        const response = await teamInfoService.fetchTeamMembersByLeaderName(teamLeaderId);
        return response;
    }
);

// Fetch Team Members by Team ID
export const getMembers = createAsyncThunk(
    "teamInfo/getMembers",
    async (teamId) => {
        const response = await teamInfoService.fetchMembers(teamId);
        return response;
    }
);

// Save Team Member Data (Add or Update)
export const saveMemberData = createAsyncThunk(
    "teamInfo/saveMemberData",
    async (memberData) => {
        // If member has an id, perform update, otherwise add a new member
        if (memberData.id) {
            const response = await teamInfoService.updateMemberData(memberData.id, memberData);
            return response;
        } else {
            const response = await teamInfoService.addMemberData(memberData);
            return response;
        }
    }
);

// Fetch Mentor Details
export const getMentor = createAsyncThunk(
    "teamInfo/getMentor",
    async (mentorId) => {
        const response = await teamInfoService.fetchMentorDetails(mentorId);
        return response;
    }
);

// Save or Update Mentor Data (Add or Update)
export const saveTeamMentor = createAsyncThunk(
    "teamInfo/saveTeamMentor",
    async (mentorData) => {
        // If mentor data has an id, perform update, otherwise add new mentor
        if (mentorData.id) {
            const response = await teamInfoService.updateMentorData(mentorData.id, mentorData);
            return response;
        } else {
            const response = await teamInfoService.addMentorData(mentorData);
            return response;
        }
    }
);

// Save Competition Details (Add or Update)
export const saveCompetitionDetails = createAsyncThunk(
    "teamInfo/saveCompetitionDetails",
    async (competitionData) => {
        // If competition data has an id, perform update, otherwise add new competition
        if (competitionData.id) {
            const response = await teamInfoService.updateCompetitionDetails(competitionData.id, competitionData);
            return response;
        } else {
            const response = await teamInfoService.addCompetitionDetails(competitionData);
            return response;
        }
    }
);

// Get Team Name
export const getTeamName = createAsyncThunk(
    "teamInfo/getTeamName",
    async (teamId, { rejectWithValue }) => {
        try {
            const response = await teamInfoService.fetchTeamName(teamId);
            return response.teamName; // Return only the teamName
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Get Team Member Data
export const getTeamMemberData = createAsyncThunk(
    "teamInfo/getTeamMemberData",
    async (teamId, { rejectWithValue }) => {
        try {
            const response = await teamInfoService.fetchTeamMemberData(teamId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Get Competition Details
export const getCompetitionDetails = createAsyncThunk(
    "teamInfo/getCompetitionDetails",
    async (teamId, { rejectWithValue }) => {
        try {
            const response = await teamInfoService.fetchCompetitionDetails(teamId);
            return response.competition; // Adjust based on your actual response structure
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// Get Team Mentors
export const getTeamMentors = createAsyncThunk(
  "teamInfo/getTeamMentors",
  async (teamLeaderId, { rejectWithValue }) => {
      try {
          const response = await teamInfoService.fetchTeamMentors(teamLeaderId);
          return response;
      } catch (error) {
          return rejectWithValue(error.message);
      }
  }
);

// Slice
const teamInfoSlice = createSlice({
    name: "teamInfo",
    initialState,
    reducers: {
        resetSaveTeamNameSuccess: (state) => {
            state.saveTeamNameSuccess = false;
        },
        resetSaveTeamMentorSuccess: (state) => {
            state.saveTeamMentorSuccess = false;
        },
        resetSaveCompetitionDetailsSuccess: (state) => {
            state.saveCompetitionDetailsSuccess = false;
        },
        resetSaveMemberDataSuccess: (state) => {
            state.saveMemberDataSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Registered Mentors
            .addCase(fetchRegisteredMentors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegisteredMentors.fulfilled, (state, action) => {
                state.loading = false;
                state.mentors = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(fetchRegisteredMentors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get Members by Team Leader
            .addCase(getMembersByTeamLeader.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembersByTeamLeader.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(getMembersByTeamLeader.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get Members by Team ID
            .addCase(getMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(getMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Save or Update Team Member
            .addCase(saveMemberData.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveMemberDataSuccess = false; // Reset
            })
            .addCase(saveMemberData.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.id) {
                    // Update existing member
                    state.members = state.members.map((member) =>
                        member.id === action.payload.id ? action.payload : member
                    );
                } else {
                    // Add new member
                    state.members.push(action.payload);
                }
                state.success = true;
                state.error = null;
                state.saveMemberDataSuccess = true; // Set success
            })
            .addCase(saveMemberData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.saveMemberDataSuccess = false; // Reset
            })

            // Save or Update Mentor
            .addCase(saveTeamMentor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveTeamMentorSuccess = false; // Reset
            })
            .addCase(saveTeamMentor.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.id) {
                    // Update existing mentor
                    state.mentor = action.payload;
                } else {
                    // Add new mentor
                    state.mentor = action.payload;
                }
                state.success = true;
                state.error = null;
                state.saveTeamMentorSuccess = true; // Set success
            })
            .addCase(saveTeamMentor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.saveTeamMentorSuccess = false; // Reset
            })

            // Get Mentor Details
            .addCase(getMentor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMentor.fulfilled, (state, action) => {
                state.loading = false;
                state.mentor = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(getMentor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Save or Update Competition
            .addCase(saveCompetitionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveCompetitionDetailsSuccess = false; // Reset
            })
            .addCase(saveCompetitionDetails.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.id) {
                    // Update existing competition
                    state.competition = action.payload;
                } else {
                    // Add new competition
                    state.competition = action.payload;
                }
                state.success = true;
                state.error = null;
                state.saveCompetitionDetailsSuccess = true; // Set success
            })
            .addCase(saveCompetitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.saveCompetitionDetailsSuccess = false; // Reset
            })

            // Save Team Name
            .addCase(saveTeamName.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.saveTeamNameSuccess = false; // Reset
            })
            .addCase(saveTeamName.fulfilled, (state, action) => {
                state.loading = false;
                state.teamName = action.payload.teamName;
                state.success = true;
                state.error = null;
                state.saveTeamNameSuccess = true; // Set success
            })
            .addCase(saveTeamName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.saveTeamNameSuccess = false; // Reset
            })

            // fetch departments
            .addCase(fetchDepartments.pending, (state) => {
                state.departments = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.departments = action.payload;
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.departments = [];
                state.loading = false;
                state.error = action.error.message;
            })

            // fetch branches
            .addCase(fetchBranches.pending, (state) => {
                state.branches = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.branches = action.payload;
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.branches = [];
                state.loading = false;
                state.error = action.error.message;
            })
            //Get Team Name
            .addCase(getTeamName.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.teamName = ""; // Clear previous team name
            })
            .addCase(getTeamName.fulfilled, (state, action) => {
                state.loading = false;
                state.teamName = action.payload;
                state.error = null;
            })
            .addCase(getTeamName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.teamName = "";
            })
            // Get Team Member Data
            .addCase(getTeamMemberData.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.members = []; // Clear previous members
            })
            .addCase(getTeamMemberData.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
                state.error = null;
            })
            .addCase(getTeamMemberData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.members = [];
            })
             // Get Competition Details
            .addCase(getCompetitionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.competition = {}; // Clear previous competition data
            })
            .addCase(getCompetitionDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.competition = action.payload;
                state.error = null;
            })
            .addCase(getCompetitionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.competition = {};
            })
            // Get Team Mentors
            .addCase(getTeamMentors.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.teamMentors = []; // Clear any existing team mentors
            })
            .addCase(getTeamMentors.fulfilled, (state, action) => {
                state.loading = false;
                state.teamMentors = action.payload; // Store the fetched mentors
                state.error = null;
            })
            .addCase(getTeamMentors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.teamMentors = []; // Reset to empty array on error
            });
    },
});

export const { resetSaveTeamNameSuccess, resetSaveTeamMentorSuccess, resetSaveCompetitionDetailsSuccess, resetSaveMemberDataSuccess } = teamInfoSlice.actions;

export default teamInfoSlice.reducer;
