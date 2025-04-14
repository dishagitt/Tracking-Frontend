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
  competition: {},
  loading: false,
  error: null,
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

// Slice
const teamInfoSlice = createSlice({
  name: "teamInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Registered Mentors
      .addCase(fetchRegisteredMentors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisteredMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload;
      })
      .addCase(fetchRegisteredMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Members by Team Leader
      .addCase(getMembersByTeamLeader.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMembersByTeamLeader.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(getMembersByTeamLeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Members by Team ID
      .addCase(getMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Save or Update Team Member
      .addCase(saveMemberData.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(saveMemberData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Save or Update Mentor
      .addCase(saveTeamMentor.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(saveTeamMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Mentor Details
      .addCase(getMentor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMentor.fulfilled, (state, action) => {
        state.loading = false;
        state.mentor = action.payload;
      })
      .addCase(getMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Save or Update Competition
      .addCase(saveCompetitionDetails.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(saveCompetitionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Save Team Name
      .addCase(saveTeamName.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTeamName.fulfilled, (state, action) => {
        state.loading = false;
        state.teamName = action.payload.teamName;
      })
      .addCase(saveTeamName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch departments
      .addCase(fetchDepartments.pending, (state) => {
        state.departments = [];
        state.departmentsLoading = true;
        state.departmentsError = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
        state.departmentsLoading = false;
        state.departmentsError = null;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.departments = [];
        state.departmentsLoading = false;
        state.departmentsError = action.error.message;
      })

      // fetch branches
      .addCase(fetchBranches.pending, (state) => {
        state.branches = [];
        state.branchesLoading = true;
        state.branchesError = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
        state.branchesLoading = false;
        state.branchesError = null;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.branches = [];
        state.branchesLoading = false;
        state.branchesError = action.error.message;
      });
  
  },
});

export default teamInfoSlice.reducer;
