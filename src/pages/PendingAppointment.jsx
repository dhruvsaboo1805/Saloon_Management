import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import "../styles/PendingAppointment.css";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_PENDING_APPOINTMENTS;
const employee_name = import.meta.env.VITE_API_PENDING_APPOINTMENTS_EMPLOYEES;

const PendingAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [employeeName, setEmployeeName] = useState({});

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        const [key, appointment] = Object.entries(data).find(
          ([key]) => key !== "success"
        );
        const formattedAppointments = [
          {
            serviceName: appointment.services,
            clientName: appointment.name,
            contact: appointment.phone,
            dateTime: `${appointment.date} - ${appointment.time}`,
            workerName: appointment.prefEmployee,
            duration: `${appointment.duration} min`,
            assignEmployee: appointment.available_employees,
            cancel: "Cancel",
          },
        ];
        setAppointments(formattedAppointments);
      })
      .catch((error) => {
        console.log("API fetching error");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(employee_name)
      .then((response) => {
        setEmployeeName(response.data);
      })
      .catch((error) => {
        console.log("employee_name fetching error");
        console.error(error);
      });
  }, []);

  // const handleAssignChange = (e, appointment) => {
  //   const selectedEmployee = e.target.value;
  //   // console.log(
  //   //   `Assigned employee ${selectedEmployee} to appointment ${appointment.clientName}`
  //   // );
  // };

  const columns = React.useMemo(
    () => [
      {
        Header: "Service Name",
        accessor: "serviceName",
        Cell: ({ value }) => (
          <div className="pending-appt-service-list">
            {value.map((service, index) => (
              <span key={index} className="pending-appt-service-item">
                {service}
              </span>
            ))}
          </div>
        ),
      },
      {
        Header: "Client Name",
        accessor: "clientName",
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
      {
        Header: "Date - Time",
        accessor: "dateTime",
      },
      {
        Header: "Preferred Worker",
        accessor: "workerName",
        Cell: ({ value }) => <span>{employeeName[value]}</span>,
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Assign Employee",
        accessor: "assignEmployee",
        Cell: ({ value, row }) => (
          <select
            className="pending-appt-assign-select"
            // onChange={(e) => handleAssignChange(e, row.original)}
          >
            <option value = "">Assign</option>
            {Array.isArray(value)
              ? value.map((employee, index) => (
                  <option key={index} value={employee}>
                    {employeeName[employee]}
                  </option>
                ))
              : null}
          </select>
        ),
      },
      {
        Header: "Cancel",
        accessor: "cancel",
        Cell: () => <button className="pending-appt-cancel-btn">Cancel</button>,
      },
    ],
    [employeeName]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: appointments,
    });

  return (
    <div className="pending-appointments-container">
      <div className="pending-appointments-header">
        <h2>Pending Appointments</h2>
        <NavLink to="/AppointmentForm" className="navlink">
          <button className="pending-add-appointment-btn">
            Add a new Appointment
          </button>
        </NavLink>
      </div>
      <table {...getTableProps()} className="pending-appointments-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PendingAppointment;
