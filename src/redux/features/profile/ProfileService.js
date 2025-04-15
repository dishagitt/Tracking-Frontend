// import axios from "axios";

const MOCK_MODE = true; // Set to false when backend is ready

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
const mockUser = {
  _id: "123",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  userType: "team_leader",
  isApproved: true,
  token: "mocked-jwt-token",
};

const profileService = {
  // Fetch Basic Profile Data (common for all user types)
  fetchBasicProfileData: async (userId) => {
    if (MOCK_MODE) {
      await delay(500);
      return { ...mockUser, userId }; // Mock response
    }
    // Real API
    // const res = await axios.get(`/api/users/${userId}/basic-profile`);
    // return res.data;
  },

  // Update Basic Profile Data (common for all user types)
  updateBasicProfileData: async (userId, profileData) => {
    if (MOCK_MODE) {
      await delay(500);
      return { ...mockUser, ...profileData }; // Mock response
    }
    // Real API
    // const res = await axios.put(`/api/users/${userId}/basic-profile`, profileData);
    // return res.data;
  },

  // Fetch Mentor Extra Fields (mentor-specific data)
  fetchMentorExtraFields: async (mentorId) => {
    console.log(mentorId);
    if (MOCK_MODE) {
      await delay(500);
      return { department: "Engineering", skills: ["Java", "Spring Boot"] }; // Mock data
    }
    // Real API
    // const res = await axios.get(`/api/mentors/${mentorId}/extra-fields`);
    // return res.data;
  },

  // Save Mentor Extra Fields (mentor-specific data)
  saveMentorExtraFields: async (mentorId, extraFields) => {
    if (MOCK_MODE) {
      await delay(500);
      return { ...extraFields, mentorId }; // Mock response
    }
    // Real API
    // const res = await axios.put(`/api/mentors/${mentorId}/extra-fields`, extraFields);
    // return res.data;
  },

  // Fetch Volunteer Extra Fields (volunteer-specific data)
  fetchVolunteerExtraFields: async (volunteerId) => {
    console.log(volunteerId);
    if (MOCK_MODE) {
      await delay(500);
      return { availability: "Weekends", department: "Human Resources" }; // Mock data
    }
    // Real API
    // const res = await axios.get(`/api/volunteers/${volunteerId}/extra-fields`);
    // return res.data;
  },

  // Save Volunteer Extra Fields (volunteer-specific data)
  saveVolunteerExtraFields: async (volunteerId, extraFields) => {
    if (MOCK_MODE) {
      await delay(500);
      return { ...extraFields, volunteerId }; // Mock response
    }
    // Real API
    // const res = await axios.put(`/api/volunteers/${volunteerId}/extra-fields`, extraFields);
    // return res.data;
  },
};

export default profileService;
