import React, { useEffect, useState } from "react";
import "../styles/AdminEmployeesPage.css";
import EmployeeCard from "../components/EmployeeCard";
import axios from "axios";
import Loader from "../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import img from "../assets/add_product.png";
import Modal from "react-modal";

const employee_url = import.meta.env.VITE_API_PENDING_APPOINTMENTS_EMPLOYEES;

const AdminEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(employee_url);
        const employeeData = response.data;

        // Convert the fetched employee data into an array of employee objects
        const employeeArray = Object.keys(employeeData)
          .filter((key) => key !== "counter" && key !== "sucess")
          .map((id) => ({
            id,
            ...employeeData[id],
          }));

        setEmployees(employeeArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelect = (id) => {
    console.log(`Selected employee ID: ${id}`);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddWorker = (event) => {
    event.preventDefault();
    // Add logic to handle adding a new worker
    console.log("New worker added");
    closeModal();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="admin-employee-list-container">
      <h1>Workers</h1>
      <button className="admin-add-new-member" onClick={openModal}>Add New Member</button>
      <div className="admin-employee-list">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card-container">
            <EmployeeCard employee={employee} onSelect={handleSelect} />
            <div className="employee-actions">
              <FaEdit className="button" style={{ color: "blue" }} />
              <FaTrash className="button" style={{ color: "red" }} />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Worker"
        className="admin-employee-Modal"
        overlayClassName="admin-employee-Overlay"
      >
        <h2>Add Worker</h2>
        <img src={img} alt="Add" className="admin-employee-add-image" />
        <form onSubmit={handleAddWorker}>
          <div className="admin-employee-form-group">
            <label>Service image</label>
            <div className="admin-employee-image-upload">
              <input type="file" />
            </div>
          </div>
          <div className="admin-employee-form-group">
            <label>Worker Name</label>
            <input type="text" placeholder="example" />
          </div>
          <div className="admin-employee-form-group">
            <label>Designation</label>
            <input type="text" placeholder="e.g." />
          </div>
          <div className="admin-employee-form-group">
            <label>Contact</label>
            <input type="text" placeholder="example" />
          </div>
          <div className="admin-employee-form-group">
            <label>Worker I.D</label>
            <input type="text" placeholder="Write the joining date of the employee" />
          </div>
          <div className="admin-employee-form-buttons">
            <button type="button" onClick={closeModal}>Cancel</button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminEmployeesPage;