import React, { useEffect , useState } from "react";
import "../styles/Dashboard.css";
import initialPanelData from "../../PanelData";
import ApptDashCardsData from "../../ApptDashCardsData";
import Cards from "../components/Cards";
import TopService from "../components/TopService";
import TotalAppointment from "../components/TotalAppointment";
import CustomerInsight from "../components/CutomerInsight";
import CustomerSatisfaction from "../components/CustomerSatisfaction";
import RevenueChart from "../components/RevenueChart";
import axios from "axios";
import ApptDashCards from "../components/ApptDashCards";
import { useDispatch, useSelector } from 'react-redux';
import { loadPanelData } from '../redux/actions/panelDataActions';
import { loadInsightData } from '../redux/actions/insightActions';
import { fetchApptDashCardsData } from '../redux/reducers/apptDashCardsSlice';

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


const satisfactionData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  lastMonth: [3000, 3200, 3100, 3004],
  thisMonth: [4500, 4600, 4700, 4504],
};


const Dashboard = () => {
  const dispatch = useDispatch();
  const panelData = useSelector((state) => state.panelData);
  const insightData = useSelector((state) => state.insight);
  const apptDashCardsData = useSelector((state) => state.apptDashCards);

  useEffect(() => {
    dispatch(loadPanelData());
    dispatch(loadInsightData());
    dispatch(fetchApptDashCardsData());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h3>Appointment Dashboard</h3>
      </div>
      <div className="dashboard-panel">
        {panelData.map((data) => (
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
          apptDashCardsData.map((data , index) => (
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
