import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "../styles/StockManagement.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import add_product from "../assets/add_product.png";

const stock_data_url = import.meta.env.VITE_API_INVENTORY_STOCK_MANAGEMENT;

const StocksManagement = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({
    image: "",
    productName: "",
    category: "",
    price: "",
    piece: "",
    availableTypes: []
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(stock_data_url);
        const fetchedData = response.data;

        const formattedData = Object.keys(fetchedData).map((key) => ({
          image: fetchedData[key].image,
          productName: fetchedData[key].name,
          category: fetchedData[key].category,
          price: fetchedData[key].price,
          piece: fetchedData[key].quantity,
          availableTypes: fetchedData[key].availableTypes || [],
        }));

        setData((prevData) => [...prevData, ...formattedData]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
        Cell: ({ row }) => (
          <div className="stock-action-icons">
            <FaEdit
              className="stock-edit-icon"
              onClick={() => handleEdit(row.index)}
            />
            <FaTrash className="stock-delete-icon" />
          </div>
        ),
      },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const openModal = (isEdit = false, index = null) => {
    console.log("Opening modal with edit:", isEdit, "and index:", index); // Debugging line
    setIsOpen(true);
    setIsEditMode(isEdit);
    setEditIndex(index);

    if (isEdit && index !== null) {
      const product = data[index];
      setNewProduct({
        image: product.image,
        productName: product.productName,
        category: product.category,
        price: product.price,
        piece: product.piece,
        availableTypes: product.availableTypes,
      });
      setImagePreview(product.image);
    } else {
      setNewProduct({
        image: "",
        productName: "",
        category: "",
        price: "",
        piece: "",
        availableTypes: [],
      });
      setImagePreview("");
    }
  };

  const closeModal = () => setIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = imagePreview;

      if (newProduct.image && typeof newProduct.image !== 'string') {
        const uploadUrl = "your-image-upload-endpoint";
        const formData = new FormData();
        formData.append("file", newProduct.image);
        
        // Upload image
        const uploadResponse = await axios.post(uploadUrl, formData);
        imageUrl = uploadResponse.data.url; // Adjust based on your API response
      }

      const newProductWithImageUrl = {
        ...newProduct,
        image: imageUrl,
      };

      if (isEditMode) {
        const updatedData = [...data];
        updatedData[editIndex] = newProductWithImageUrl;
        setData(updatedData);
      } else {
        setData((prevData) => [...prevData, newProductWithImageUrl]);
      }

      setNewProduct({
        image: "",
        productName: "",
        category: "",
        price: "",
        piece: "",
        availableTypes: [],
      });
      setImagePreview("");
      closeModal();
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleEdit = (index) => {
    openModal(true, index);
  };

  return (
    <div>
      <div className="stock-header">
        <h2>Stock Management</h2>
        <button className="stock-add-btn" onClick={() => openModal(false)}>Add Product</button>
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

      {isOpen && (
        <div className="stock-modal-overlay">
          <div className="stock-modal-content">
            <div className="stock-header-content">
              <img src={add_product} alt="" className="stock-header-img" />
              <h3 className="stock-modal-title">
                {isEditMode ? "Edit Product" : "Add Product"}
              </h3>
            </div>
            <form className="stock-modal-form">
              <div className="stock-form-group">
                <label>Service Image</label>
                <div className="stock-image-upload">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="stock-image-preview"
                    />
                  )}
                </div>
              </div>
              <div className="stock-form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={newProduct.productName}
                  onChange={handleInputChange}
                  placeholder="example"
                />
              </div>
              <div className="stock-form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="100"
                />
              </div>
              <div className="stock-form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="piece"
                  value={newProduct.piece}
                  onChange={handleInputChange}
                  placeholder="20"
                />
              </div>
              <div className="stock-modal-buttons">
                <button type="button" onClick={closeModal}>Cancel</button>
                <button type="button" onClick={handleSubmit}>Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksManagement;
