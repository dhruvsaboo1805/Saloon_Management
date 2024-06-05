import React from "react";
import { useTable } from "react-table";
import "../styles/CheckInAppointments.css";
import data from "../../CheckInAppointmentData"; // Adjust the import path as needed

const CheckInAppointments = () => {
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
        Cell: () => <button className="checkin-appt-payment-btn">Pay</button>,
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
    </div>
  );
};

export default CheckInAppointments;
