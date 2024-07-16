import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "../styles/AdminDashboard.css";
import Cards from "../components/Cards";
import ApptDashCards from "../components/ApptDashCards";
import Loader from "../components/Loader";
import booking from "../assets/booking.png";
import week_booking from "../assets/week_booking.png";
import sales from "../assets/sales.png";
// import sales from "../assets/sales.png";
import AdminSalesChart from "../components/AdminSalesChart";

const AdminDashboard = () => {
  const initialPanelData = [
    { id: "1", heading: "Today Booking", img: booking, panelinfo: 0 },
    { id: "2", heading: "Week Booking", img: week_booking, panelinfo: 0 },
    { id: "3", heading: "Total Sales", img: sales, panelinfo: 0 },
    { id: "4", heading: "Weekly Sales", img: sales, panelinfo: 0 },
  ];

  const initialApptDashCardsData = [
    { status: "Pending Appointment", count: 0, color: "#8280FF" },
    { status: "Confirmed Appointment", count: 0, color: "#FEC53D" },
    { status: "Checkin Appointment", count: 0, color: "#4AD991" },
    { status: "Paid Appointment", count: 0, color: "#A6B5FF" },
  ];

  const services = [
    { name: "Hair Colour", sales: 45 },
    { name: "Nail Polish", sales: 29 },
    { name: "Hair Cutting", sales: 18 },
    { name: "Spa and Massage", sales: 25 },
    { name: "Nail Polish", sales: 29 },
    { name: "Hair Cutting", sales: 18 },
    { name: "Spa and Massage", sales: 25 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h3>Sales Dashboard</h3>
      </div>
      <div className="dashboard-panel">
        {initialPanelData.map((data) => (
          <Cards
            key={data.id}
            heading={data.heading}
            img={data.img}
            values={[data.panelinfo]}
          />
        ))}
      </div>
      <div className="dashboard-cards-panel2">
        {initialApptDashCardsData.map((data, index) => (
          <ApptDashCards
            key={index}
            status={data.status}
            count={data.count}
            color={data.color}
          />
        ))}
      </div>
      {/* Charts */}
      <div className="admin-sales-chart-section">
        <div className="admin-sales-chart-box">
          <AdminSalesChart totalSales={0} />
        </div>
        <div className="admin-service-list-box">
          <div className="admin-services-list">
            <h4>Services</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>
                      <span
                        className={`amdin-sales-percentage admin-color-${service.sales}`}
                      >
                        {service.sales}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
