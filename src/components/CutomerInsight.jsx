import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../styles/CustomerInsight.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerInsight = ({ data }) => {
  const chartData = {
    labels: ['New User', 'Old User'],
    datasets: [
      {
        data: [data.newUser, data.oldUser],
        backgroundColor: ['#A259FF', '#ECECEC'],
        hoverBackgroundColor: ['#A259FF', '#ECECEC'],
      },
    ],
  };

  const options = {
    responsive: true,
    cutoutPercentage: 70,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="insight-container">
      <h3>Customer Insight</h3>
      <Doughnut data={chartData} options={options} />
      <div className="insight-total">
        <p>Total Count</p>
        <h2>{data.totalCount}</h2>
      </div>
      <div className="insight-legend">
        <span className="legend-item">
          <span className="dot new-user"></span> New user {data.newUser}
        </span>
        <span className="legend-item">
          <span className="dot old-user"></span> Old User {data.oldUser}
        </span>
      </div>
    </div>
  );
};

export default CustomerInsight;
