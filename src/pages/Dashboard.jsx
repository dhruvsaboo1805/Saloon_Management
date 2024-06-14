import React, { useEffect , useState } from "react";
import "../styles/Dashboard.css";
import PanelData from "../../PanelData";
import ApptDashCardsData from "../../ApptDashCardsData";
import Cards from "../components/Cards";
import TopService from "../components/TopService";
import TotalAppointment from "../components/TotalAppointment";
import CustomerInsight from "../components/CutomerInsight";
import CustomerSatisfaction from "../components/CustomerSatisfaction";
import RevenueChart from "../components/RevenueChart";
import axios from "axios";
import ApptDashCards from "../components/ApptDashCards";

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
  // const [panelData, setPanelData] = useState([]);

  // useEffect(() => {
  //   const apiUrl = "https://tryidol-salonapi.onrender.com/api/pos/appointmentDashboard"
  //   axios.get(apiUrl)
  //   .then((response) => {
  //      const data = response.data;
  //       setPanelData([
  //         {
  //           id: "1",
  //           heading: "Today Booking",
  //           // img: booking,
  //           panelinfo: data.todayBookings.length,
  //         },
  //         {
  //           id: "2",
  //           heading: "Week Booking",
  //           img: require("../assets/booking2.png").default,
  //           panelinfo: data.weekBookings.length,
  //         },
  //         {
  //           id: "3",
  //           heading: "Total Customer",
  //           img: require("../assets/sales.png").default,
  //           panelinfo: data.totalCustomers.length,
  //         },
  //         {
  //           id: "4",
  //           heading: "New Customer",
  //           img: require("../assets/sales2.png").default,
  //           panelinfo: data.newCustomers.length,
  //         }
  //       ]);
  //     })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // })
  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h3>Appointment Dashboard</h3>
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
      <div className="dashboard-cards-panel2">
        {
          ApptDashCardsData.map((data , index) => (
            <ApptDashCards
            key = {index}
            status = {data.status}
            count = {data.count}
            color = {data.color}
            ></ApptDashCards>
          ))
        }
      </div>
      {/* Charts */}
      <div className="dashboard-chart-container">
        {/* <TopService services={services} /> */}
        <CustomerInsight data={insightData} />
        <TotalAppointment data={appointmentData} />
      </div>

      <div className="dashboard-chart-customer-container">
        {/* <CustomerSatisfaction data={satisfactionData} /> */}
      </div>

      {/* <div className="dashboard-chart-revenue-container">
        {/* <RevenueChart /> 
      </div> */}
    </div>
  );
};

export default Dashboard;
