import React from "react";
import "../styles/EmployeeCard.css";

const EmployeeCard = ({ employee, onSelect }) => {
  return (
    <div className="employee-card" onClick={() => onSelect(employee.id)}>
      <img src={employee.image} alt={employee.name} className="employee-image" />
      <p><span>Name: </span>{employee.name}</p>
      <p><span>Designation: </span>{employee.designation}</p>
      <p><span>Contact: </span> {employee.contact}</p>
      <p><span>WorkerI.D: </span> {employee.workerId}</p>
      <div className="employee-actions">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
