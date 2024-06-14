import React from "react";
import "../styles/ClientInfo.css";
import { useTable } from "react-table";
import data from "../../ClientInfo";

const ClientInfo = () => {
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone.no", accessor: "phone" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Pincode", accessor: "pincode" },
    {
      Header: "View Information",
      accessor: "viewInfo",
      Cell: () => <button className="client-info-button">View Info</button>,
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="client-info-container">
        <h1>Client Information</h1>
    <table {...getTableProps()} className="client-info-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );;
};

export default ClientInfo;
