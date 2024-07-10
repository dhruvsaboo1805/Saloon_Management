import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";
import Loader from "../components/Loader";
import "../styles/ClientInfo.css";

const apiUrl = import.meta.env.VITE_API_ALL_CLIENT_INFO;

const ClientInfo = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const formattedClients = Object.entries(data)
          .filter(([key]) => key !== "success")
          .map(([key, client]) => {
            if (!client) {
              console.warn(`Client data for key ${key} is undefined or null`);
              return null;
            }
            return {
              name: client.name || "",
              email: client.email || "",
              phone: client.phone || "",
              gender: client.gender == 'M' ? 'Male' : "Female" || "",
              pincode: client.pincode || "",
            };
          })
          .filter(client =>
            client !== null &&
            client.name &&
            client.email &&
            client.phone &&
            client.gender &&
            client.pincode
          ); // Filter out any null entries and empty/default fields

        setClients(formattedClients);
        setLoading(false);
      } catch (error) {
        console.error("API fetching error", error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const columns = React.useMemo(
    () => [
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: clients,
  });

  if (loading) {
    return <Loader />; // Display the loader while fetching data
  }

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
  );
};

export default ClientInfo;
