// import axios from 'axios';  // Import only if you intend to use it

// Mock Mode - set to false to use real API calls
const MOCK_MODE = true;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get Authorization Token -  moved inside the axiosInstance
// const getAuthToken = () => {
//     // Replace with your actual token retrieval logic (e.g., from localStorage)
//     return "mock_token"; //  "real_token_from_storage";
// };

// Axios Instance with Authorization Header
// Moved inside the functions to avoid issues if the token is not immediately available.
// const axiosInstance = axios.create({
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${getAuthToken()}`,
//     },
// });

// ===============================
// Service Object
// ===============================

const competitionService = {
    // Get Team Name
    fetchTeamName: async () => {
        console.log("Fetching Team Name...");
        if (MOCK_MODE) {
            await delay(500);
            return { teamName: "Mock Team Name" };
        }
        // try {
        //     const axiosInstance = axios.create({ // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.get('/api/team-name');
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error fetching team name", error);
        //     throw error;
        // }
    },

    // Initial Stage
    saveInitialStageDetails: async (details) => {
        console.log('Saving Initial Stage Details:', details);
        if (MOCK_MODE) {
            await delay(500);
            return { success: true, initialStageDetails: details };
        }
        // try {
        //     const axiosInstance = axios.create({ // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.post('/api/initial-stage', details);
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error saving initial stage details", error);
        //     throw error;
        // }
    },

    getInitialStageDetails: async () => {
        console.log('Fetching Initial Stage Details');
        if (MOCK_MODE) {
            await delay(500);
            return {
                teamName: "Mock Team Name",
                abstract: "This is a mock abstract for initial stage.",
                ppt: "mock_initial_ppt.pptx",
                finalRoundSelected: null
            };
        }
        // try {
        //      const axiosInstance = axios.create({ // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.get('/api/initial-stage');
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error getting initial stage details", error);
        //     throw error;
        // }
    },

    // Final Stage
    saveFinalStageDetails: async (details) => {
        console.log('Saving Final Stage Details:', details);
        if (MOCK_MODE) {
            await delay(500);
            return { success: true, finalStageDetails: details };
        }
        // try {
        //     const axiosInstance = axios.create({  // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //              Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.post('/api/final-stage', details);
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error saving final stage details", error);
        //     throw error;
        // }
    },

    getFinalStageDetails: async () => {
        console.log('Fetching Final Stage Details');
        if (MOCK_MODE) {
            await delay(500);
            return {
                finalPPT: "mock_final_ppt.pptx",
                teamPhoto: "mock_final_team_photo.jpg",
                location: { college: "Mock College", city: "Mock City" },
                mediaCoverage: "mock_media_coverage.jpg",
                winner: null
            };
        }
        // try {
        //     const axiosInstance = axios.create({  // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //              Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.get('/api/final-stage');
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error getting final stage details", error);
        //     throw error;
        // }
    },

    // Winner Stage
    saveWinnerDetails: async (details) => {
        console.log('Saving Winner Details:', details);
        if (MOCK_MODE) {
            await delay(500);
            return { success: true, winnerDetails: details };
        }
        // try {
        //      const axiosInstance = axios.create({  // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //              Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.post('/api/winner-stage', details);
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error saving winner details", error);
        //     throw error;
        // }
    },

    getWinnerDetails: async () => {
        console.log('Fetching Winner Details');
        if (MOCK_MODE) {
            await delay(500);
            return {
                rank: "1st",
                prizeMoney: "mock_prize_money.jpg",
                certificate: "mock_certificate.jpg",
                medal: "mock_medal.jpg",
                teamPhoto: "mock_winner_team_photo.jpg"
            };
        }
        // try {
        //      const axiosInstance = axios.create({ // Create instance within the function
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${getAuthToken()}`,
        //         },
        //     });
        //     const response = await axiosInstance.get('/api/winner-stage');
        //     return response.data;
        // } catch (error: any) {
        //     console.error("Error getting winner details", error);
        //     throw error;
        // }
    },
};

export default competitionService;
