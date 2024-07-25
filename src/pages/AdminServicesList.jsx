import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import Modal from "react-modal";
import axios from "axios";
import img from "../assets/admin_logo.png";
import img_popup from "../assets/add_product.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/AdminServicesList.css";

const all_services_url = import.meta.env.VITE_API_GET_ALL_SERVICES;

const AdminServicesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(null);
  const [newService, setNewService] = useState({
    image: "",
    serviceName: "",
    price: "",
    duration: "",
    description: "",
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(all_services_url);
        const fetchedData = response.data.services.map((service) => ({
          image: service.imgUrl,
          serviceName: service.name,
          price: `$${service.price}.00`,
          duration: `${service.duration}min`,
          description: service.serviceDesc,
        }));
        setData(fetchedData);
      } catch (error) {
        setError("Error fetching services data");
        console.error("Error fetching services data", error);
      }
    };

    fetchServices();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="Service" className="admin-service-image" />
        ),
      },
      {
        Header: "Service Name",
        accessor: "serviceName",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Action",
        Cell: ({ row: { index } }) => (
          <div className="admin-services-action-buttons">
            <FaEdit
              className="admin-services-edit-button"
              onClick={() => openEditModal(index)}
            />
            <FaTrash
              className="admin-services-delete-button"
              onClick={() => deleteService(index)}
            />
          </div>
        ),
      },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewService({ ...newService, [name]: files[0] });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedData = data.map((service, index) =>
        index === currentServiceIndex ? newService : service
      );
      setData(updatedData);
    } else {
      setData([...data, newService]);
    }

    setModalIsOpen(false);
    setNewService({
      image: "",
      serviceName: "",
      price: "",
      duration: "",
      description: "",
    });
    setSuccess(isEditing ? "Service updated successfully" : "Service added successfully");
  };

  const openEditModal = (index) => {
    const service = data[index];
    if (service) {
      setNewService(service);
      setCurrentServiceIndex(index);
      setIsEditing(true);
      setModalIsOpen(true);
    }
  };

  const openAddModal = () => {
    setNewService({
      image: "",
      serviceName: "",
      price: "",
      duration: "",
      description: "",
    });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  const deleteService = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="admin-services-heading">
        <h2>Services</h2>
        <button onClick={openAddModal}>Add New Service</button>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}

      <table {...getTableProps()} className="admin-services-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="admin-header-row">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="admin-header-cell">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="admin-tbody">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="admin-tbody-row">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="admin-tbody-cell">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="admin-modal"
        overlayClassName="admin-modal-overlay"
      >
        <div className="admin-services-subheading-popup">
          <img src={img_popup} alt="" className="admin-services-img-subheading-popup" />
          <h2>{isEditing ? "Edit Service" : "Add Service"}</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Service Image</label>
            <input type="file" name="image" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={newService.serviceName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={newService.duration}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newService.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminServicesList;
