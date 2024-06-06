import React from "react";
import "../styles/WorkerAppointment.css";
import data from "../../WorkerAppointmentData";
import EmployeeCard from "../components/EmployeeCard";

const WorkerAppointment = () => {
    
  return (
    <div>
       <div className="worker-appt-container">
            <h1>Worker Available</h1>
            <div className="worker-appt-list">
                {data.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>
        </div>
        <div className="worker-appt-button-div">
          <button className="worker-create-appointment">Create Appointment</button>
        </div>
    </div>
  );
};

export default WorkerAppointment;
