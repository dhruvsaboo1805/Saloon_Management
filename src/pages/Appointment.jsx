import React from "react";
import { useTable } from "react-table";
import "../styles/Appointment.css";
import data from "../../AppointmentsData";

const Appointment = () => {
  const columns = React.useMemo(
    () => [

    // service name should be used later by chirag
    //   {
    //     Header: "Service Name",
    //     accessor: "serviceName",
    //     Cell: ({ value }) => (
    //       <div className="service-cell">
    //         <span
    //           className={`dot ${value.toLowerCase().replace(" ", "-")}`}
    //         ></span>
    //         {value}
    //       </div>
    //     ),
    //   },
      {
        Header: "Client Name",
        accessor: "clientName",
      },
      {
        Header: "Date - Time",
        accessor: "dateTime",
      },
      {
        Header: "Worker Name",
        accessor: "workerName",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Service Status",
        accessor: "serviceStatus",
        Cell: ({ value }) => (
          <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>
        ),
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: ({ value }) => (
          <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>
        ),
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
    <div className="appointments-container">
      <div className="appointments-header">
        <h2>Appointments</h2>
        <button className="add-appointment-btn">Add a new Appointment</button>
      </div>
      <table {...getTableProps()} className="appointments-table">
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

export default Appointment;
