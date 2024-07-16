import data from "../../InventoryLogs";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import "../styles/AdminInventoryLogs.css";
const AdminInventoryLogs = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Employee Name",
        accessor: "employeeName",
      },
      {
        Header: "Product Used",
        accessor: "productUsed",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Date - Time",
        accessor: "dateTime",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
    <div className="admin-inventory-logs-heading">
        <h2>Inventory Logs</h2>
    </div>
    <table {...getTableProps()} className="admin-inventory-logs">
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
    </>
  );
};

export default AdminInventoryLogs;
