// import axios from 'axios';

// Mock Mode
const MOCK_MODE = true; // Set to false for real API

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Set the Authorization token
// const getAuthToken = () => {
// In real implementation, this token should come from localStorage or some state management system
// return localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
// };

// Set the Authorization header
// const axiosInstance = axios.create({
//   headers: {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${getAuthToken()}`,
//  },
// });

// Mock Data
const mockTeamMembers = [
  {
    _id: "1",
    firstName: "Alice",
    lastName: "abc",
    email: "alice@example.com",
    contact: "1234567890",
    gender: "Female",
    department: "CS",
    branch: "Software",
    enrollmentNumber: "CS2024001",
  },
  {
    _id: "2",
    firstName: "Bob",
    lastName: "abc",
    email: "bob@example.com",
    contact: "0987654321",
    gender: "Male",
    department: "CS",
    branch: "Software",
    enrollmentNumber: "CS2024002",
  },
  {
    _id: "3",
    firstName: "Charlie",
    lastName: "abc",
    email: "charlie@example.com",
    contact: "1122334455",
    gender: "Male",
    department: "CS",
    branch: "Software",
    enrollmentNumber: "CS2024003",
  },
  {
    _id: "4",
    firstName: "David",
    lastName: "abc",
    email: "david@example.com",
    contact: "2233445566",
    gender: "Male",
    department: "CS",
    branch: "Software",
    enrollmentNumber: "CS2024004",
  },
  {
    _id: "5",
    firstName: "Eve",
    lastName: "abc",
    email: "eve@example.com",
    contact: "3344556677",
    gender: "Female",
    department: "CS",
    branch: "Software",
    enrollmentNumber: "CS2024005",
  },
  {
    _id: "6",
    firstName: "Frank",
    lastName: "abc",
    email: "frank@example.com",
    contact: "4455667788",
    gender: "Male",
    department: "CS",
    branch: "Software",
    enrollmentNumber: "CS2024006",
  },
];

const mockMentors = [
  { _id: "m1", firstName: "Dr. Anil", lastName: "Kamble" },
  { _id: "m2", firstName: "Dr. Grace", lastName: "Happer" },
  { _id: "m3", firstName: "Dr. Ada", lastName: "Lovelace" },
];

const mockMentorDetails = {
  m1: {
    _id: "m1",
    firstName: "Dr. Anil",
    lastName: "Kamble",
    department: "CS",
    skills: ["AI", "ML"],
    contact: "9999999999",
  },
  m2: {
    _id: "m2",
    firstName: "Dr. Grace",
    lastName: "Happer",
    department: "CS",
    skills: ["Programming", "Compilers"],
    contact: "8888888888",
  },
  m3: {
    _id: "m3",
    firstName: "Dr. Ada",
    lastName: "Lovelace",
    department: "CS",
    skills: ["Mathematics", "Algorithms"],
    contact: "7777777777",
  },
};

const mockDepartments = ["CS", "IT", "Electrical", "Mechanical"];

const mockBranches = ["MCA", "BE", "ME"];

const mockTeamNameData = { teamName: "Mock Team Name" };
const mockCompetitionDetailsData = {
  id: "comp1",
  category: "Software",
  problemTitle: "Mock Problem Title",
  problemStatementNo: "123",
  department: "CS",
  domainBucket: "AI",
};

const teamInfoService = {
  // Fetch Team Members by Team Leader Name (will return 6 team members including the team leader)
  fetchTeamMembersByLeaderName: async (teamLeaderName) => {
    console.log("Fetching team members for team leader:", teamLeaderName);
    if (MOCK_MODE) {
      await delay(400);
      return mockTeamMembers;
    }
    // Real API request
    // try {
    //   const res = await axiosInstance.get(`/api/team-members/by-leader/${teamLeaderName}`);
    //   return res.data;
    // } catch (error) {
    //   console.error('Error fetching team members:', error);
    //     throw error; // }
  }, // Fetch Registered Mentors List (team leader can select 2 mentors)

  fetchRegisteredMentors: async () => {
    console.log("Fetching registered mentor list...");
    if (MOCK_MODE) {
      await delay(400);
      return mockMentors;
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.get('/api/mentors');
    //  return res.data;
    // } catch (error) {
    //  console.error('Error fetching registered mentors:', error);
    //  throw error; // }
  },

  // Fetch Mentor Details (when a mentor is selected)
  fetchMentorDetails: async (mentorId) => {
    console.log("Fetching mentor details for mentor ID:", mentorId);
    if (MOCK_MODE) {
      await delay(400);
      return mockMentorDetails[mentorId];
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.get(`/api/mentors/${mentorId}`);
    //  return res.data;
    // } catch (error) {
    //  console.error('Error fetching mentor details:', error);
    //  throw error; // }
  },

  // Save Team Name
  saveTeamName: async (teamName) => {
    console.log("Saving team name:", teamName);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, teamName };
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.post('/api/team-name', { teamName });
    //  return res.data;
    // } catch (error) {
    //  console.error('Error saving team name:', error);
    //  throw error;
    // }
  },

  // Save Competition Details
  saveCompetitionDetails: async (competitionData) => {
    console.log("Saving competition details:", competitionData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, competitionData };
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.post('/api/team-competition', competitionData);
    //  return res.data;
    // } catch (error) {
    //  console.error('Error saving competition details:', error);
    //  throw error; // }
  },

  // Save Team Members Details
  saveTeamMembersDetails: async (teamMembersData) => {
    console.log("Saving team members details:", teamMembersData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, teamMembers: teamMembersData };
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.post('/api/team-members', teamMembersData);
    //  return res.data;
    // } catch (error) {
    //  console.error('Error saving team members details:', error);
    // throw error;
    // }
  },

  // Save Team Mentors (two mentors selected by the team leader)
  saveTeamMentors: async (mentorIds) => {
    console.log("Saving team mentors:", mentorIds);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, mentorIds };
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.post('/api/team-mentors', { mentorIds });
    //  return res.data;
    // } catch (error) {
    //  console.error('Error saving team mentors:', error);
    //  throw error;
    // }
  },

  // Fetch Departments
  fetchDepartments: async () => {
    console.log("Fetching departments...");
    if (MOCK_MODE) {
      await delay(400);
      return mockDepartments;
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.get('/api/departments');
    //  return res.data;
    // } catch (error) {
    //  console.error('Error fetching departments:', error);
    //  throw error;
    // }
  },

  // Fetch Branches
  fetchBranches: async () => {
    console.log("Fetching branches...");
    if (MOCK_MODE) {
      await delay(400);
      return mockBranches;
    }
    // Real API request
    // try {
    //  const res = await axiosInstance.get('/api/branches');
    //  return res.data;
    // } catch (error) {
    //  console.error('Error fetching branches:', error);
    //  throw error;
    // }
  },

  //Get Team Name
  fetchTeamName: async (teamId) => {
    console.log("Fetching Team Name...", teamId);
    if (MOCK_MODE) {
      await delay(400);
      return mockTeamNameData;
    }
    // try {
    // const response = await axiosInstance.get(`/api/team-name/${teamId}`,
    //{
    //  headers: { //
    //   Authorization: `Bearer ${getAuthToken()}`,
    //  }
    //});
    //return response.data;
    //} catch (error) {
    //  console.error("Error fetching team name", error);
    // throw error;
    // }
  },

  // Get Team Member Data
  fetchTeamMemberData: async (teamId) => {
    console.log("Fetching Team Members Data...", teamId);
    if (MOCK_MODE) {
      await delay(400);
      return mockTeamMembers; // Or a subset, adjust as needed
    }
    // try {
    // const response = await axiosInstance.get(`/api/team-members/${teamId}`, {  headers: {
    //   Authorization: `Bearer ${getAuthToken()}`,
    // }
    //});
    //return response.data;
    //} catch (error) {
    // console.error("Error fetching team members data", error); // }
  },

  // Get Competition Details
  fetchCompetitionDetails: async (teamId) => {
    console.log("Fetching Competition Details...", teamId);
    if (MOCK_MODE) {
      await delay(400);
      return mockCompetitionDetailsData;
    }
    // try {
    //const response = await axiosInstance.get(`/api/team-competition/${teamId}`, {  headers: {
    //     Authorization: `Bearer ${getAuthToken()}`,
    // }
    //});
    //return response.data;
    //} catch (error) {
    //console.error("Error fetching competition details", error);
    //}
  },
  updateCompetitionDetails: async (id, competitionData) => {
    console.log("Updating competition details:", competitionData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, competitionData };
    }
    // try {
    //  const response = await axiosInstance.put(`/api/team-competition/${id}`, competitionData);
    //  return response.data;
    // } catch (error) {
    //  console.error("Error updating competition details", error);
    // }
  },

  addCompetitionDetails: async (competitionData) => {
    console.log("Adding competition details:", competitionData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, competitionData };
    }
    // try {
    //   const response = await axiosInstance.post(
    //     "/api/team-competition",
    //     competitionData
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Error adding competition details", error);
    // }
  },
  updateMemberData: async (id, memberData) => {
    console.log("Updating member data:", memberData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, memberData };
    }
    // try {
    //   const response = await axiosInstance.put(
    //     `/api/team-members/${id}`,
    //     memberData
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Error updating member data", error);
    // }
  },

  addMemberData: async (memberData) => {
    console.log("Adding member data:", memberData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, memberData };
    }
    // try {
    //   const response = await axiosInstance.post(
    //     "/api/team-members",
    //     memberData
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Error adding member data", error);
    // }
  },
  
  updateMentorData: async (id, mentorData) => {
    console.log("Updating mentor data:", mentorData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, mentorData };
    }
    // try {
    //   const response = await axiosInstance.put(
    //     `/api/mentors/${id}`,
    //     mentorData
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Error updating mentor data", error);
    // }
  },

  addMentorData: async (mentorData) => {
    console.log("Adding mentor data:", mentorData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, mentorData };
    }
    // try {
    //   const response = await axiosInstance.post("/api/mentors", mentorData);
    //   return response.data;
    // } catch (error) {
    //   console.error("Error adding mentor data", error);
    // }
  },
  
  // Get Team Mentors
  fetchTeamMentors: async (teamLeaderId) => {
    console.log("Fetching team mentors for team leader:", teamLeaderId);
    if (MOCK_MODE) {
      await delay(400); // Mock the response structure to match what your Redux slice expects
      return [
        { id: "m1", firstName: "Dr. Anil", lastName: "Kamble" },
        { id: "m2", firstName: "Dr. Grace", lastName: "Happer" }, // Add more mock data as needed
      ];
    }
    // Real API request
    // try {
    //   const response = await axiosInstance.get(
    //     `/api/teams/teamLeader/${teamLeaderId}/mentors`
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching team mentors:", error);
    //   throw error;
    // }
  },
};

export default teamInfoService;
