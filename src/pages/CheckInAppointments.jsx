import React, { useState } from "react";
import { useTable } from "react-table";
import "../styles/CheckInAppointments.css";
import PaymentPopUp from "../components/PaymentPopUp";
import data from "../../CheckInAppointmentData";

const CheckInAppointments = () => {
  const [showPopup, setShowPopup] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Service Name",
        accessor: "serviceName",
        Cell: ({ value }) => (
          <div className="checkin-appt-service-list">
            {value.map((service, index) => (
              <span key={index} className="checkin-appt-service-item">{service}</span>
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
        accessor: "workerAssigned",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Check in",
        accessor: "checkIn",
        Cell: () => <button className="checkin-appt-checkin-btn">Checked in</button>,
      },
      {
        Header: "Payment",
        accessor: "payment",
        Cell: () => <button className="checkin-appt-payment-btn" onClick={() => setShowPopup(true)}>Pay</button>,
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
    <div className="checkin-appointments-container">
      <div className="checkin-appointments-header">
        <h2>Checked in Appointments</h2>
      </div>
      <table {...getTableProps()} className="checkin-appointments-table">
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
      {showPopup && (
        <PaymentPopUp
          amount="850"
          transactionId="185SDFWE774"
          totalAmount="999"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default CheckInAppointments;
