// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

const MOCK_MODE = true;

const mockUser = {
  id: "123",
  name: "Mock User",
  email: "mock@example.com",
  role: "team_leader",
  token: "mock-token-123",
};

// const authHeader = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return {
//     headers: {
//       Authorization: `Bearer ${user?.token}`,
//     },
//   };
// };


// Register user
const register = async (userData) => {
    if (MOCK_MODE) {
      console.log("Mock register:", userData);
      return Promise.resolve({ message: "User registered successfully", user: userData });
    }
    // const response = await axios.post(`${API_URL}/api/v1/auth/register`, userData);
    // return response.data;
  };
  
  // Register profile
  const registerProfile = async (userData) => {
    if (MOCK_MODE) {
      console.log("Mock register profile:", userData);
      return Promise.resolve({ message: "Profile registered", profile: userData });
    }
  
    // const response = await axios.post(`${API_URL}/api/v1/profiles`, userData, authHeader());
    // return response.data;
  };
  
  // Login
  const login = async (userData) => {
    if (MOCK_MODE) {
      console.log("Mock login:", userData);
      return Promise.resolve({
        token: mockUser.token,
        user: mockUser,
      });
    }
    // const response = await axios.post(`${API_URL}/api/v1/auth/authenticate`, userData);
    // return response.data;
  };
  
  // Logout
  const logout = async () => {
    if (MOCK_MODE) {
      console.log("Mock logout");
      return Promise.resolve({ message: "Logged out" });
    }
    // localStorage.removeItem("user");
  };
  
  // Get user by ID
  const getUserById = async (userId) => {
    if (MOCK_MODE) {
      console.log("Mock get user by ID:", userId);
      return Promise.resolve(mockUser);
    }
    // const response = await axios.get(`${API_URL}/api/users/${userId}`, authHeader());
    // return response.data;
  };
  
  // Get profile by ID
  const getProfileById = async (profileId) => {
    if (MOCK_MODE) {
      console.log("Mock get profile by ID:", profileId);
      return Promise.resolve({
        id: profileId,
        name: "Mock Profile",
        branch: "CSE",
      });
    }
    // const response = await axios.get(`${API_URL}/api/profiles/${profileId}`, authHeader());
    // return response.data;
  };
  
  // Check login status
  const getLoginStatus = async () => {
    if (MOCK_MODE) {
      console.log("Mock login status");
      return Promise.resolve(true);
    }
    // const response = await axios.get(`${API_URL}/getLoginStatus`, authHeader());
    // return response.data;
  };
  
  // Update user
  const updateUser = async (userData) => {
    if (MOCK_MODE) {
      console.log("Mock update user:", userData);
      return Promise.resolve({ message: "User updated", user: { ...mockUser, ...userData } });
    }
    // const response = await axios.patch(`${API_URL}/updateUser`, userData, authHeader());
    // return response.data;
  };
  
  const changePassword = async (userData) => {
    if (MOCK_MODE){
      console.log("Mock chnage password: ", userData);
      return Promise.resolve({ message: "password changed", user: { ...mockUser, ...userData } });
    }
    // const response = await axios.post(`${API_URL}/changePassword`, userData, authHeader());
    //     return response.data; 
  }

  const fetchUserTypes = async (userData) => {
    if (MOCK_MODE){
      console.log("user types: ", userData);
      return Promise.resolve({ message: "user types", user: { ...mockUser, ...userData } });
    }
    // const response = await axios.post(`${API_URL}/changePassword`, userData, authHeader());
    //     return response.data; 
  }


  
  const authService = {
    register,
    registerProfile,
    login,
    logout,
    getUserById,
    getProfileById,
    getLoginStatus,
    updateUser,
    fetchUserTypes,
    changePassword
  };
  
  export default authService;
  