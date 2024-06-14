import React from "react";
import data from "../../AllAppointments";
import "../styles/AllAppointment.css";
import { useTable } from "react-table";

const AllAppointments = () => {
  const columns = [
    {
      Header: "Service Name",
      accessor: "serviceName",
      Cell: ({ value }) => (
        <div className="allappt-service-list">
          {value.map((service, index) => (
            <span key={index} className="allappt-service-item">
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
      accessor: "workerassigned",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <button className="allappt-status-button">{value}</button>
      ),
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="allappt-container">
      <h1>Services</h1>
      <table {...getTableProps()}>
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

export default AllAppointments;
