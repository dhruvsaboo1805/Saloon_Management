import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SaloonCalender.css";

const apiurl = import.meta.env.VITE_API_CALENDER_TIME_SLOTS_WISE_DATA;
const employee_url = import.meta.env.VITE_API_PENDING_APPOINTMENTS_EMPLOYEES;

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

const SaloonCalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(employee_url);
        console.log("Fetched employees:", response.data);

        const employeeData = response.data;
        const employeeArray = Object.keys(employeeData)
          .filter((key) => key !== "success") // Ignore non-employee keys
          .map((key) => ({ id: key, name: employeeData[key], role: "" })); // Customize role if available

        setEmployees(employeeArray);
        console.log("Transformed employee array:", employeeArray);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };

    fetchEmployees();
  }, []);

  const handlePrevDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const minuteInt = parseInt(minute, 10);
    const ampm = hourInt >= 12 ? "PM" : "AM";
    const adjustedHour = hourInt % 12 || 12;
    return `${adjustedHour}:${
      minuteInt < 10 ? `0${minuteInt}` : minuteInt
    } ${ampm}`;
  };

  return (
    <div className="employee-calendar">
      <div className="employee-header">
        <button onClick={handlePrevDay}>Previous Day</button>
        <span>{currentDate.toDateString()}</span>
        <button onClick={handleNextDay}>Next Day</button>
      </div>
      <div className="employee-body">
        <div className="employee-time-slots">
          <h3 className="claender-seperation">Time-Slots</h3>
          {timeSlots.map((slot, index) => (
            <div key={index} className="employee-time-slot">
              {convertTo12HourFormat(slot)}
            </div>
          ))}
        </div>
        <div className="employee-columns">
          {/* <h3 className="claender-seperation">Employee-Name</h3> */}
          {employees.map((employee) => (
            <div key={employee.id} className="employee-column">
              <div className="employee-column-header">
                {/* Assuming you have an image URL */}
                {/* <img
                  // src={employee.profilePicture}
                  // alt={employee.name}
                  className="employee-photo"
                /> */}
                <strong>{employee.name}</strong>
                <br />
                {/* {employee.role} */}
              </div>
              {/* Appointments will be added here */}
            </div>
          ))}
        </div>
      </div>
      <button className="employee-new-appointment">New Appointment</button>
    </div>
  );
};

export default SaloonCalender;
