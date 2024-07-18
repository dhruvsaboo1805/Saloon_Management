import React from 'react'
import "../styles/AdminEmployeesPage.css";
import data from "../../AdminEmployeeData";
import EmployeeCard from '../components/EmployeeCard';
import { useState , useEffect } from 'react';
const AdminEmployeesPage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employees data from the JSON file
        setEmployees(data);
      }, []);
    
      const handleSelect = (id) => {
        console.log(`Selected employee ID: ${id}`);
      };
  return (
    <div className="admin-employee-list-container">
      <h1>Workers</h1>
      <button className="admin-add-new-member">Add New Member</button>
      <div className="admin-employee-list">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  )
}

export default AdminEmployeesPage
