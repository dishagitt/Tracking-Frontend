import axios from "axios";

// Toggle this to false when connecting to real backend
const MOCK_MODE = true;

// Dummy base for testing
const DUMMY_BASE_URL = "https://dummyjson.com";

// Delay simulation
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Auth header utility
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

const adminService = {
  getDashboardAnalytics: async () => {
    if (MOCK_MODE) {
      const res = await axios.get(`${DUMMY_BASE_URL}/carts`);
      const data = res.data.carts;

      const totalParticipants = data.reduce((sum, cart) => sum + cart.totalProducts, 0);
      const totalWinners = Math.floor(totalParticipants * 0.6);
      const totalStudents = totalParticipants * 6;
      const currentYear = new Date().getFullYear();

      const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i).reverse();

      return {
        totalParticipants,
        totalWinners,
        totalStudents,
        yearlyData: lastFiveYears.map((year, index) => ({
          year,
          participants: data[index] ? data[index].totalProducts : 0,
          winners: Math.floor((data[index]?.totalProducts || 0) * 0.6),
        })),
      };
    }

    // REAL API
    // const res = await axios.get("/api/admin/dashboard-analytics", getAuthHeaders());
    // return res.data;
  },

  getAllAnnouncements: async () => {
    if (MOCK_MODE) {
      const res = await axios.get(`${DUMMY_BASE_URL}/posts`);
      return res.data.posts.slice(0, 10);
    }

    // REAL API
    // const res = await axios.get("/api/admin/announcements", getAuthHeaders());
    // return res.data;
  },

  addAnnouncement: async (data) => {
    if (MOCK_MODE) {
      await delay(300);
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };
    }

    // REAL API
    // const res = await axios.post("/api/admin/announcements", data, getAuthHeaders());
    // return res.data;
  },

  updateAnnouncement: async (data) => {
    if (MOCK_MODE) {
      await delay(300);
      return {
        ...data,
        updated: true,
      };
    }

    // REAL API
    // const res = await axios.put(`/api/admin/announcements/${data.id}`, data, getAuthHeaders());
    // return res.data;
  },

  deleteAnnouncement: async (id) => {
    console.log(id);
    if (MOCK_MODE) {
      await delay(200);
      return { success: true };
    }

    // REAL API
    // const res = await axios.delete(`/api/admin/announcements/${id}`, getAuthHeaders());
    // return res.data;
  },

  // API calls for managing user types
  getAllUserTypes: async () => {
    if (MOCK_MODE) {
      // Simulating API response for user types
      return [
        { id: 1, name: "Team Leader" },
        { id: 2, name: "Mentor" },
        { id: 3, name: "Volunteer" },
      ];
    }

    // REAL API
    // const res = await axios.get("/api/admin/user-types", getAuthHeaders());
    // return res.data;
  },

  addUserType: async (data) => {
    if (MOCK_MODE) {
      await delay(300);
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };
    }

    // REAL API
    // const res = await axios.post("/api/admin/user-types", data, getAuthHeaders());
    // return res.data;
  },

  updateUserType: async (data) => {
    if (MOCK_MODE) {
      await delay(300);
      return {
        ...data,
        updated: true,
      };
    }

    // REAL API
    // const res = await axios.put(`/api/admin/user-types/${data.id}`, data, getAuthHeaders());
    // return res.data;
  },

  deleteUserType: async (id) => {
    console.log(id);
    if (MOCK_MODE) {
      await delay(200);
      return { success: true };
    }

    // REAL API
    // const res = await axios.delete(`/api/admin/user-types/${id}`, getAuthHeaders());
    // return res.data;
  },
};

export default adminService;