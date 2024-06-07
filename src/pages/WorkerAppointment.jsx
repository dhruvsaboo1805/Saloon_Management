import React, { useEffect, useState } from "react";
import "../styles/WorkerAppointment.css";
import EmployeeCard from "../components/EmployeeCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const WorkerAppointment = () => {
  const location = useLocation();
  const formData = location.state || {};
  const [availableEmployeeIds, setAvailableEmployeeIds] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.date || !formData.time) {
      console.error("Form data is missing date or time:", formData);
      navigate("/AppointmentForm");
      return;
    }
  })
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const convertToMilitaryTime = (time) => {
    console.log(time); // Debugging line
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchAvailableEmployees = async () => {
      try {
        const formattedDate = formatDate(formData.date);
        const militaryTimeSlot = convertToMilitaryTime(formData.time);

        const response = await axios.post(
          "https://tryidol-salonapi.onrender.com/api/public/availableEmployees",
          { ...formData, date: formattedDate, time: militaryTimeSlot }
        );

        const matchingEmployeeIds = response.data;
        console.log("Matching Employee IDs:", matchingEmployeeIds);
        setAvailableEmployeeIds(matchingEmployeeIds);
      } catch (error) {
        console.error("Error fetching available employees:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAvailableEmployees();
  }, [formData]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        console.log("tye ke andra");
        alert(typeof availableEmployeeIds);
        alert(availableEmployeeIds.length);
        if (availableEmployeeIds.length > 0) {
          const queryString = availableEmployeeIds
            .map((id) => `employeeIds=${id}`)
            .join("&");
          // const response = await axios.get(
          //   `https://tryidol-salonapi.onrender.com/api/public/basicEmployees?${queryString}`
          // );

          const response = {1:"Aryan" , 2:"Dhruv", 3:"Chirag"};

          const employeeDetails = response;
          console.log("Employee Details:", employeeDetails);

          const employeesArray = availableEmployeeIds.map((id) => ({
            id,
            name: employeeDetails[id],
          }));

          console.log(employeesArray);

          setEmployees(employeesArray);
         
          setLoading(false);
        } else {
          console.log("else ke andar");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [availableEmployeeIds]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(employees);
  alert(typeof employees);
  alert("upar wala length employee ka hain");
  if (Object.keys(employees).length === 0) {
    navigate("/AppointmentForm");
    return null; 
  }

  useEffect(() => {
    console.log("lqst useeffect ke andar");
    console.log(employees);
  } , [])
  return (
    <div>
      <div className="worker-appt-container">
        <h1>Workers Available</h1>
        <div className="worker-appt-list">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </div>
      <div className="worker-appt-button-div">
        <button  className="worker-create-appointment">
          Create Appointment
        </button>
      </div>
    </div>
  );
};

export default WorkerAppointment;
