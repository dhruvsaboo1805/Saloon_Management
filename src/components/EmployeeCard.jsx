import React from "react";
import "../styles/EmployeeCard.css";

const EmployeeCard = ({ employee, onSelect }) => {
  return (
    <div className="employee-card" onClick={() => onSelect(employee.id)}>
      <h2>{employee.name}</h2>
    </div>
  );
};

export default EmployeeCard;
