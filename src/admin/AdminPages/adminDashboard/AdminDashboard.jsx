import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminDashboard.css";
import { fetchDashboardAnalytics } from "../../../redux/features/admin/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { analyticsData, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardAnalytics());
  }, [dispatch]);

  if (loading || !analyticsData) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading">Error: {error}</div>;
  }

  // Chart data
  const participantChartData = {
    labels: analyticsData.yearlyData.map((entry) => entry.year),
    datasets: [
      {
        label: "Participant Groups",
        data: analyticsData.yearlyData.map((entry) => entry.participants),
        backgroundColor: "#007BFF",
      },
    ],
  };

  const winnerChartData = {
    labels: analyticsData.yearlyData.map((entry) => entry.year),
    datasets: [
      {
        label: "Winner Groups",
        data: analyticsData.yearlyData.map((entry) => entry.winners),
        backgroundColor: "#FFC107",
      },
    ],
  };

  const doughnutData = {
    labels: ["Total Participated Students"],
    datasets: [
      {
        data: [analyticsData.totalStudents],
        backgroundColor: ["#28A745"],
        hoverBackgroundColor: ["#218838"],
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
    cutout: "70%",
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = (height / 100).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      const text = `${analyticsData.totalStudents}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillStyle = "#000";
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  return (
    <div className="dashboard-outer">
      <div className="dashboard-card">
        <div className="dashboard-heading-bar">
          <h2 className="dashboard-heading">Competition Analytics</h2>
        </div>

        {/* Stats Section */}
        <div className="section">
          <h3 className="section-heading">
            Total Participant Groups (Previous Year)
          </h3>
          <div className="stats-container">
            <div className="stats-box">
              <h4>SIH</h4>
              <p>{analyticsData.totalParticipants}</p>
            </div>
            <div className="stats-box">
              <h4>SSIP</h4>
              <p>{analyticsData.totalParticipants}</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-heading">
            Total Winner Groups (Previous Year)
          </h3>
          <div className="stats-container">
            <div className="stats-box">
              <h4>SIH</h4>
              <p>{analyticsData.totalWinners}</p>
            </div>
            <div className="stats-box">
              <h4>SSIP</h4>
              <p>{analyticsData.totalWinners}</p>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="section">
          <h3 className="section-heading">Last 5 Years Data in Graphs</h3>
          <div className="charts-row">
            <div className="chart-box">
              <h4>Participant Groups</h4>
              <Bar
                data={participantChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
            <div className="chart-box">
              <h4>Winner Groups</h4>
              <Bar
                data={winnerChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
            <div className="chart-box doughnut-chart">
              <h4>Total Participated Students</h4>
              <Doughnut
                data={doughnutData}
                options={doughnutOptions}
                plugins={[centerTextPlugin]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
