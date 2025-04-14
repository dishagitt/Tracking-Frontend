// import axios from 'axios';

// Mock Mode
const MOCK_MODE = true; // Set to false for real API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Set the Authorization token
// const getAuthToken = () => {
//   // In real implementation, this token should come from localStorage or some state management system
//   return localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
// };

// Set the Authorization header
// const axiosInstance = axios.create({
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getAuthToken()}`,
//   },
// });

// Mock Data
const mockTeamMembers = [
  { _id: '1', firstName: 'Alice', lastName:'abc', email: 'alice@example.com', contact: '1234567890', gender: 'Female', department: 'CS', branch: 'Software', enrollmentNumber: 'CS2024001' },
  { _id: '2', firstName: 'Bob', lastName:'abc', email: 'bob@example.com', contact: '0987654321', gender: 'Male', department: 'CS', branch: 'Software', enrollmentNumber: 'CS2024002' },
  { _id: '3', firstName: 'Charlie', lastName:'abc', email: 'charlie@example.com', contact: '1122334455', gender: 'Male', department: 'CS', branch: 'Software', enrollmentNumber: 'CS2024003' },
  { _id: '4', firstName: 'David', lastName:'abc', email: 'david@example.com', contact: '2233445566', gender: 'Male', department: 'CS', branch: 'Software', enrollmentNumber: 'CS2024004' },
  { _id: '5', firstName: 'Eve', lastName:'abc', email: 'eve@example.com', contact: '3344556677', gender: 'Female', department: 'CS', branch: 'Software', enrollmentNumber: 'CS2024005' },
  { _id: '6', firstName: 'Frank', lastName:'abc', email: 'frank@example.com', contact: '4455667788', gender: 'Male', department: 'CS', branch: 'Software', enrollmentNumber: 'CS2024006' },
];

const mockMentors = [
  { _id: 'm1', firstName: 'Dr. Anil', lastName:'Kamble' },
  { _id: 'm2', firstName: 'Dr. Grace', lastName:'Happer' },
  { _id: 'm3', firstName: 'Dr. Ada', lastName: 'Lovelace' },
];

const mockMentorDetails = {
  m1: { _id: 'm1', firstName: 'Dr. Anil', lastName:'Kamble', department: 'CS', skills: ['AI', 'ML'], contact: '9999999999' },
  m2: { _id: 'm2',  firstName: 'Dr. Grace', lastName:'Happer', department: 'CS', skills: ['Programming', 'Compilers'], contact: '8888888888' },
  m3: { _id: 'm3',firstName: 'Dr. Ada', lastName: 'Lovelace', department: 'CS', skills: ['Mathematics', 'Algorithms'], contact: '7777777777' },
};

const mockDepartments = ['CS', 'IT', 'Electrical', 'Mechanical'];

const mockBranches = ['MCA', 'BE', 'ME'];

// Main Service File to Fetch Data
const teamInfoService = {
  // Fetch Team Members by Team Leader Name (will return 6 team members including the team leader)
  fetchTeamMembersByLeaderName: async (teamLeaderName) => {
    console.log('Fetching team members for team leader:', teamLeaderName);
    if (MOCK_MODE) {
      await delay(400);
      return mockTeamMembers;
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.get(`/api/team-members/by-leader/${teamLeaderName}`);
    //   return res.data;
    // } catch (error) {
    //   console.error('Error fetching team members:', error);
    //   throw error;
    // }
  },

  // Fetch Registered Mentors List (team leader can select 2 mentors)
  fetchRegisteredMentors: async () => {
    console.log('Fetching registered mentor list...');
    if (MOCK_MODE) {
      await delay(400);
      return mockMentors;
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.get('/api/mentors');
    //   return res.data;
    // } catch (error) {
    //   console.error('Error fetching registered mentors:', error);
    //   throw error;
    // }
  },

  // Fetch Mentor Details (when a mentor is selected)
  fetchMentorDetails: async (mentorId) => {
    console.log('Fetching mentor details for mentor ID:', mentorId);
    if (MOCK_MODE) {
      await delay(400);
      return mockMentorDetails[mentorId];
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.get(`/api/mentors/${mentorId}`);
    //   return res.data;
    // } catch (error) {
    //   console.error('Error fetching mentor details:', error);
    //   throw error;
    // }
  },

  // Save Team Name
  saveTeamName: async (teamName) => {
    console.log('Saving team name:', teamName);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, teamName };
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.post('/api/team-name', { teamName });
    //   return res.data;
    // } catch (error) {
    //   console.error('Error saving team name:', error);
    //   throw error;
    // }
  },

  // Save Competition Details
  saveCompetitionDetails: async (competitionData) => {
    console.log('Saving competition details:', competitionData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, competitionData };
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.post('/api/team-competition', competitionData);
    //   return res.data;
    // } catch (error) {
    //   console.error('Error saving competition details:', error);
    //   throw error;
    // }
  },

  // Save Team Members Details
  saveTeamMembersDetails: async (teamMembersData) => {
    console.log('Saving team members details:', teamMembersData);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, teamMembers: teamMembersData };
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.post('/api/team-members', teamMembersData);
    //   return res.data;
    // } catch (error) {
    //   console.error('Error saving team members details:', error);
    //   throw error;
    // }
  },

  // Save Team Mentors (two mentors selected by the team leader)
  saveTeamMentors: async (mentorIds) => {
    console.log('Saving team mentors:', mentorIds);
    if (MOCK_MODE) {
      await delay(400);
      return { success: true, mentorIds };
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.post('/api/team-mentors', { mentorIds });
    //   return res.data;
    // } catch (error) {
    //   console.error('Error saving team mentors:', error);
    //   throw error;
    // }
  },

  // Fetch Departments
  fetchDepartments: async () => {
    console.log('Fetching departments...');
    if (MOCK_MODE) {
      await delay(400);
      return mockDepartments;
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.get('/api/departments');
    //   return res.data;
    // } catch (error) {
    //   console.error('Error fetching departments:', error);
    //   throw error;
    // }
  },

  // Fetch Branches
  fetchBranches: async () => {
    console.log('Fetching branches...');
    if (MOCK_MODE) {
      await delay(400);
      return mockBranches;
    }
    // Real API request (commented out for now)
    // try {
    //   const res = await axiosInstance.get('/api/branches');
    //   return res.data;
    // } catch (error) {
    //   console.error('Error fetching branches:', error);
    //   throw error;
    // }
  },

};

export default teamInfoService;
