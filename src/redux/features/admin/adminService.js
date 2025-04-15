import axios from "axios";

export const getDashboardAnalytics = async () => {
  const response = await axios.get("https://dummyjson.com/carts");
  const data = response.data.carts;

  const totalParticipants = data.reduce(
    (sum, cart) => sum + cart.totalProducts,
    0
  );
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
      winners: Math.floor(
        (data[index] ? data[index].totalProducts : 0) * 0.6
      ),
    })),
  };
};
