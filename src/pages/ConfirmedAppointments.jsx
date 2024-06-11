import React from "react";
import { useTable } from "react-table";
import "../styles/ConfirmedAppointments.css";
import data from "../../ConfirmedAppointmentsData";
import { useState } from "react";
import checkicon from "../assets/check-in-icon.png";

const ConfirmedAppointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [appointmentId, setAppointmentId] = useState("");
  const columns = React.useMemo(
    () => [
      {
        Header: "Service Name",
        accessor: "serviceName",
        Cell: ({ value }) => (
          <div className="confirm-appt-service-list">
            {value.map((service, index) => (
              <span key={index} className="confirm-appt-service-item">
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
        Header: "Worker Assigned",
        accessor: "workerAssigned",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Check in",
        accessor: "checkIn",
        Cell: ({ row }) => (
          <button
            className="confirm-appt-checkin-btn"
            onClick={() => handleCheckInClick(row.original)}
          >
            Check in
          </button>
        ),
      },
    ],
    []
  );

  const handleCheckInClick = (row) => {
    setCurrentData(row);
    setAppointmentId("");
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log("Check In confirmed with Appointment ID:", appointmentId);
    setShowModal(false);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="confirm-appointments-container">
      <div className="confirm-appointments-header">
        <h2>Confirmed Appointments</h2>
      </div>
      <table {...getTableProps()} className="confirm-appointments-table">
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

      {/* popup modal for check in */}
      {showModal && (
        <div className="confirm-appointments-modal-overlay">
          <div className="confirm-appointments-modal-content">
            <div className="confirm-appointments-heading">
              <img src={checkicon} alt="" />
              <button
                className="confirm-appointments-close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <h2>Check In</h2>
            <form>
              <div>
                <label>Client Name</label>
                <input type="text" value={currentData.clientName} readOnly />
              </div>
              <div>
                <label>User Check In Appointment I.D</label>
                <input
                  type="text"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleConfirm}
                className="confirm-appointments-confirm-button"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="confirm-appointments-cancel-button"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmedAppointments;
