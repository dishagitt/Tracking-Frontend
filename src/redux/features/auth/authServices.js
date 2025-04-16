// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;


const MOCK_MODE = true; // Set to false when backend is ready

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get token from localStorage
// const getToken = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user?.token;
// };

// Config with headers
// const getConfig = () => {
//   const token = getToken();
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// Mock data
const mockUser = {
  _id: "123",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  userType: "team_leader",
  isApproved: true,
  token: "mocked-jwt-token",
};

const authService = {
  register: async (userData) => {
    if (MOCK_MODE) {
      await delay(500);
      return { ...mockUser, ...userData };
    }
    // REAL API
    // const res = await axios.post("/api/auth/register", userData);
    // return res.data;
  },

  login: async (userData) => {
    if (MOCK_MODE) {
      await delay(500);
      return { ...mockUser, ...userData };
    }
    // REAL API
    // const res = await axios.post("/api/auth/login", userData);
    // return res.data;
  },

  logout: async () => {
    if (MOCK_MODE) {
      await delay(200);
      return;
    }
    // REAL API
    // await axios.post("/api/auth/logout", {}, getConfig());
  },

  changePassword: async (data) => {
    if (MOCK_MODE) {
      await delay(500);
      console.log("fetch members",data);
      return { success: true };
    }
    // REAL API
    // const res = await axios.post("/api/auth/change-password", data, getConfig());
    // return res.data;
  },

  fetchMembers: async (userId) => {
    if (MOCK_MODE) {
      await delay(400);
      if (userId === "mock-user-id-123") {
        return [
          { _id: "1", name: "Alice", email: "alice@example.com" },
          { _id: "2", name: "Bob", email: "bob@example.com" },
        ];
      }
    }
    // REAL API
    // const res = await axios.get(`/api/team-members/${userId}`, getConfig());
    // return res.data;
  },

  deleteMember: async (memberId) => {
    if (MOCK_MODE) {
      await delay(300);
      console.log("fetch members",memberId);
      return { success: true };
    }
    // REAL API
    // const res = await axios.delete(`/api/team-members/${memberId}`, getConfig());
    // return res.data;
  },

  updateMember: async (id, updatedData) => {
    if (MOCK_MODE) {
      // Mock response for testing purposes
      console.log("🔥 MOCK updateMember called with:", id, updatedData);
      await delay(400); // Simulate delay
  
      // Mocking response for a specific user ID
      if (id === "mock-user-id-123") {
        return {
          _id: id,
          name: updatedData.name || "Mock Name",
          email: updatedData.email || "mock@example.com",
        };
      }
  
      // Simulating failure if mock user not found
      throw { message: "Failed to update member. Mock not found." };
    }
  
    // Real API (Uncomment for actual API call)
    // const response = await axios.put(`/api/team-members/${id}`, updatedData);
    // return response.data;
  },

  // FETCH LOGGED-IN USER DATA
  getLoggedInUser: async () => {
    if (MOCK_MODE) {
      await delay(300);
      return mockUser; // Return the mock user data
    }
    // REAL API
    // const res = await axios.get("/api/auth/me", getConfig()); // Or your specific endpoint
    // return res.data;
  },


};


export default authService;
