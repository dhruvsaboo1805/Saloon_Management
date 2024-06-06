import React from "react";
import { useTable } from "react-table";
import "../styles/PendingAppointment.css";
import data from "../../PendingAppointmentsData";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";

const PendingAppointment = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Service Name",
        accessor: "serviceName",
        Cell: ({ value }) => (
          <div className="pending-appt-service-list">
            {value.map((service, index) => (
              <span key={index} className="pending-appt-service-item">{service}</span>
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
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Assign Employee",
        accessor: "assignEmployee",
        Cell: () => (
          <button className="pending-appt-assign-btn">
            Assign <IoIosArrowDown />
          </button>
        ),
      },
      {
        Header: "Cancel",
        accessor: "cancel",
        Cell: () => <button className="pending-appt-cancel-btn">Cancel</button>,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="pending-appointments-container">
      <div className="pending-appointments-header">
        <h2>Pending Appointments</h2>
        <NavLink to = "/AppointmentForm" className="navlink">
          <button className="pending-add-appointment-btn">Add a new Appointment</button>
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
