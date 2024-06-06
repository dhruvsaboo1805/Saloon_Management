import React from "react";
import "../styles/AppointmentForm.css";
import { useState, useEffect } from "react";
// import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCut,
  FaVenusMars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";

const AppointmentForm = () => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    clientName: "",
    email: "",
    pincode: "",
    date: "",
    timeSlot: "",
    gender: "",
  });

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);

    setMinDate(formatDate(today));
    setMaxDate(formatDate(maxDate));
  }, []);

  // item list api cal;
  useEffect(() => {
    const apiUrl = "https://tryidol-salonapi.onrender.com/api/public/items";
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        if (response.data && typeof response.data.services === "object") {
          const servicesArray = Object.values(response.data.services);
          const services = servicesArray.map((service) => ({
            label: service.name,
            value: service.name,
          }));
          setServicesOptions(services);
        } else {
          console.error("Unexpected response structure", response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    if (id === "phone" && value.length == 10) {
      fetchClientData(value);
    }
  };

  // phone number autofill data api
  const fetchClientData = (phone) => {
    setLoading(true);
    axios
      .post("https://tryidol-salonapi.onrender.com/api/pos/getClient", {
        phone,
      })
      .then((response) => {
        if (response.data) {
          const clientData = response.data;
          setFormData((prevFormData) => ({
            ...prevFormData,
            clientName: clientData.name || "",
            email: clientData.email || "",
            pincode: clientData.pincode || "",
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching client data:", err);
        setLoading(false);
      });
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    const start = 9;
    const end = 20;

    for (let hour = start; hour < end; hour++) {
      const time1 = formatTime(hour, 0);
      const time2 = formatTime(hour, 30);
      timeSlots.push(time1, time2);
    }

    return timeSlots.map((time, index) => (
      <option key={index} value={time}>
        {time}
      </option>
    ));
  };

  const handleServiceChange = (selected) => {
    setSelectedServices(selected);
  };

  const formatTime = (hour, minutes) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const minuteStr = minutes === 0 ? "00" : "30";
    return `${hour12}:${minuteStr} ${suffix}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <h2 className="appt-form-heading">New Appointments</h2>
      <div className="appt-form-container">
        <form className="appt-form-formcontainer" onSubmit={handleSubmit}>
          <div className="appt-form-left">
            <div className="appt-form-group">
              <label htmlFor="phoneNo">Phone No</label>
              <div className="appt-input-container">
                <FaPhone className="appt-icon" />
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter Phone No."
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="appt-form-group">
              <label htmlFor="clientName">Client Name</label>
              <div className="appt-input-container">
                <FaUser className="appt-icon" />
                <input
                  type="text"
                  id="clientName"
                  placeholder="Enter Client name"
                  value={formData.clientName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="appt-form-group">
              <label htmlFor="date">Date</label>
              <div className="appt-input-container">
                <FaCalendarAlt className="appt-icon" />
                <input
                  type="date"
                  id="date"
                  min={minDate}
                  max={maxDate}
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="appt-form-group">
              <label htmlFor="services">Services</label>
              <div className="appt-input-container">
                <FaCut className="appt-icon" />
                <Select
                  options={servicesOptions}
                  value={selectedServices}
                  onChange={handleServiceChange}
                  labelledBy="Select"
                  isMulti={true}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "#f5f6fa",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          <div className="appt-form-right">
            <div className="appt-form-group">
              <label htmlFor="email">Email</label>
              <div className="appt-input-container">
                <FaEnvelope className="appt-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="appt-form-group">
              <label htmlFor="gender">Gender</label>
              <div className="appt-input-container">
                <FaVenusMars className="appt-icon" />
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="appt-form-group">
              <label htmlFor="pincode">Pincode</label>
              <div className="appt-input-container">
                <FaMapMarkerAlt className="appt-icon" />
                <input
                  type="text"
                  id="pincode"
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="appt-form-group">
              <label htmlFor="timeSlot">Time Slot</label>
              <div className="appt-input-container">
                <FaClock className="appt-icon" />
                <select
                  id="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                >
                  <option value="">Enter Time Slot</option>
                  {generateTimeSlots()}
                </select>
              </div>
            </div>
          </div>
        </form>
        <NavLink to="/WorkerAppointment" className="navlink">
          <button
            type="submit"
            className="appt-submit-button"

            // onClick={postFetchData}
          >
            Select Worker
          </button>
        </NavLink>
        {/* {loading && <Loader />}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <h2>Response Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </>
  );
};

export default AppointmentForm;
