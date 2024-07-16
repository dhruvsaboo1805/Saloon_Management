import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import "../styles/AdminDashboard.css";

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const AdminSalesChart = ({totalSales}) => {
    const data = {
        labels: ['01', '02', '03', '04', '05', '06', '07'],
        datasets: [
          {
            label: 'Sales',
            data: [1000, 2000, 3000, 2348, 1348, 2000, 3000, 4000],
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      };
    
      const options = {
        scales: {
          x: {
            type: 'category',
            display: true,
            title: {
              display: true,
              text: 'Day of the Month',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Sales Amount',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw} sales - ₹${context.raw}`;
              },
            },
          },
        },
      };
  return (
    <div className="admin-sales-chart-container">
      <h4>Sales ₹{totalSales}k</h4>
      <Line data={data} options={options} />
    </div>
  )
}

export default AdminSalesChart
