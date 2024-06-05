import React from "react";
import "../styles/Dashboard.css";
import PanelData from "../../PanelData";
import Cards from "../components/Cards";
import TopService from "../components/TopService";
import TotalAppointment from "../components/TotalAppointment";
import CustomerInsight from "../components/CutomerInsight";
import CustomerSatisfaction from "../components/CustomerSatisfaction";
import RevenueChart from "../components/RevenueChart";

const appointmentData = {
  online: [30, 40, 40, 20, 60, 15, 80],
  offline: [50, 20, 15, 90, 40, 10, 50],
};

const services = [
  { name: "Hair Colour", sales: 45, color: "blue" },
  { name: "Nail Polish", sales: 29, color: "green" },
  { name: "Hair cutting", sales: 18, color: "purple" },
  { name: "Spa and Massage", sales: 25, color: "orange" },
];

const insightData = {
  newUser: 120,
  oldUser: 200,
  totalCount: 320,
};

const satisfactionData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  lastMonth: [3000, 3200, 3100, 3004],
  thisMonth: [4500, 4600, 4700, 4504],
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h3>Dashboard</h3>
      </div>
      <div className="dashboard-panel">
        {PanelData.map((data) => (
          <Cards
            key={data.id}
            heading={data.heading}
            img={data.img}
            values={data.panelinfo}
          ></Cards>
        ))}
      </div>

      {/* Charts */}
      <div className="dashboard-chart-container">
        <TotalAppointment data={appointmentData} />
        <TopService services={services} />
      </div>

      <div className="dashboard-chart-customer-container">
        <CustomerInsight data={insightData} />
        {/* <CustomerSatisfaction data={satisfactionData} /> */}
      </div>

      <div className="dashboard-chart-revenue-container">
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
