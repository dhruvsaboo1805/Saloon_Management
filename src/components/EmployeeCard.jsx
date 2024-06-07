import React, { useEffect } from 'react'
import "../styles/EmployeeCard.css";

const EmployeeCard = ({ employee }) => {
  useEffect(() => {
    console.log(employee);
    console.log("emplyee card comp");
  } , []);

  return (
    <div>
      <div className="worker-card">
        <img
          // src={employee.image}
          alt={employee.name}
          className="worker-image"
        />
        <h3>{employee.name}</h3>
        {/* <p>{employee.role}</p> */}
      </div>
    </div>
  )
}

export default EmployeeCard
