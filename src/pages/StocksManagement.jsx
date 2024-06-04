import React from "react";
import { useTable } from "react-table";
import "../styles/StockManagement.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import data from "../../StockManagementData";

const StocksManagement = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="Product" className="stock-product-image" />
        ),
      },
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Piece",
        accessor: "piece",
      },
      {
        Header: "Available Types",
        accessor: "availableTypes",
        Cell: ({ cell: { value } }) => (
          <div className="stock-available-types">
            {value.map((type, index) => (
              <span key={index} className={`stock-type-dot ${type}`}></span>
            ))}
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => (
          <div className="stock-action-icons">
            <FaEdit className="stock-edit-icon" />
            <FaTrash className="stock-delete-icon" />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="stock-header">
        <h2>Stock Management</h2>
        <button className="stock-add-btn">Add Product</button>
      </div>
      <table {...getTableProps()} className="stock-product-table">
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

export default StocksManagement;
