import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "../styles/CheckInAppointments.css";
import PaymentPopUp from "../components/PaymentPopUp";
import Loader from "../components/Loader";

const apiUrl = import.meta.env.VITE_API_CHECKED_IN_APPOINTMENTS;
const employee_name = import.meta.env.VITE_API_PENDING_APPOINTMENTS_EMPLOYEES;

const CheckInAppointments = () => {
  const [checkedInAppointments, setCheckedInAppointments] = useState([]);
  const [EmployeeName, setEmployeeName] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckedInAppointments = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const formattedAppointments = Object.entries(data)
          .filter(([key]) => key !== "success")
          .map(([key, appointment]) => {
            if (!appointment) {
              console.log(
                `Appointment data for key ${key} is undefined or null`
              );
              return null;
            }
            return {
              serviceName: appointment.services || [],
              clientName: appointment.name || "",
              contact: appointment.phone || "",
              dateTime: `${appointment.date || ""} - ${
                convertTo12HourFormat(appointment.time) || ""
              }`,
              workerAssigned: appointment.assignedEmployee || "",
              duration: appointment.duration
                ? convertToHoursAndMinutes(appointment.duration)
                : "",
              payment: appointment.totalBill || 0,
            };
          })
          .filter(
            (appointment) =>
              appointment !== null &&
              appointment.clientName &&
              appointment.contact &&
              appointment.dateTime.trim() !== "-"
          ); // Filter out any null entries and empty/default fields

        setCheckedInAppointments(formattedAppointments);
      } catch (error) {
        console.error("API fetching error", error);
      }
    };
    const fetchEmployeeNames = async () => {
      try {
        const response = await axios.get(employee_name);
        setEmployeeName(response.data);
      } catch (error) {
        console.error("employee_name fetching error", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchCheckedInAppointments(), fetchEmployeeNames()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const minuteInt = parseInt(minute, 10);
    const ampm = hourInt >= 12 ? "PM" : "AM";
    const adjustedHour = hourInt % 12 || 12;
    return `${adjustedHour}:${
      minuteInt < 10 ? `0${minuteInt}` : minuteInt
    } ${ampm}`;
  };

  const convertToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let result = "";
    if (hours > 0) {
      result += `${hours}h `;
    }
    if (remainingMinutes > 0) {
      result += `${remainingMinutes}m`;
    }
    return result.trim(); // Remove any trailing whitespace
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Service Name",
        accessor: "serviceName",
        Cell: ({ value }) => (
          <div className="checkin-appt-service-list">
            {value.map((service, index) => (
              <span key={index} className="checkin-appt-service-item">
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
        Header: "Assigned Worker",
        accessor: "workerAssigned",
        Cell: ({ value }) => <span>{EmployeeName[value]}</span>,
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Payment",
        accessor: "payment",
        Cell: ({ value }) => (
          <button
            className="checkin-appt-payment-btn"
            onClick={() => setShowPopup(true)}
          >
            Pay ₹{value}
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: checkedInAppointments,
    });

  if (loading) {
    return <Loader />; // Display the loader while fetching data
  }

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
