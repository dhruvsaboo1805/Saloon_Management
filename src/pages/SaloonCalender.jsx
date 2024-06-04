import React from "react";
import "../styles/SaloonCalender.css";
import { useState } from "react";

const employees = [
  { id: 1, name: "Abril Lewis", role: "Hair Stylist" },
  { id: 2, name: "Allen Hicks", role: "Nails" },
  { id: 3, name: "Bianca Heath", role: "Spa" },
  { id: 4, name: "Emmy Massey", role: "Hair" },
];

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

  const handlePrevDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
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
          {timeSlots.map((slot, index) => (
            <div key={index} className="employee-time-slot">
              {slot}
            </div>
          ))}
        </div>
        <div className="employee-columns">
          {employees.map((employee) => (
            <div key={employee.id} className="employee-column">
              <div className="employee-column-header">
                <strong>{employee.name}</strong>
                <br />
                {employee.role}
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
