import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getVendorProductListByVendorId } from "../../services/vendor";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "../../styles.css";

// Styled component for the Vendor Products page
const StyledVendorList = styled.div`
  background-color: #1a1a1a;
  min-height: 100vh;
  padding: 20px;
  position: relative; /* Ensure the logo is positioned correctly within this container */

  h1 {
    text-align: center;
    margin: 10px 0;
    color: #fff; /* Changed color to white */
  }

  .flexfuels-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .logo {
      font-size: 36px;
      font-weight: bold;
      display: flex;

      .flex {
        color: #20a4f3; /* Blue color for "Flex" */
        margin-left: -120px;
      }

      .fuels {
        color: #ffffff; /* White color for "Fuels" */
      }
    }

    .slogan {
      color: white;
      font-size: 14px;
      margin-left: -5px;
    }

    .header-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .table {
    width: 100%; /* Make the table take up more space horizontally */
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
    font-size: 18px; /* Increased font size for better readability */

    th, td {
      padding: 15px; /* Increased padding for a bigger table appearance */
      text-align: left;
    }

    th {
      background-color: #00aaff;
      color: white;
    }

    td {
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  }

  .custom-button {
    background-color: #00aaff;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
  }

  .custom-button:hover {
    background-color: #0088cc;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .logout-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #cc0000;
      color: white;
    }
  }
`;

function VendorProducts() {
  const [vproducts, setVproducts] = useState([]);
  const { vendorId } = useParams();
  const navigate = useNavigate();

  sessionStorage['vendorId'] = vendorId;

  useEffect(() => {
    // get the list of products
    loadVproducts();
  }, []);

  const loadVproducts = async () => {
    const response = await getVendorProductListByVendorId(vendorId);
    if (response) {
      setVproducts(response['data']);
    } else {
      toast.error('Error while calling get /product api');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate('/vendorLogin'); // Navigate to the vendor login page
  };

  return (
    <StyledVendorList>
      {/* FlexFuels Logo and Slogan */}
      <div className="flexfuels-header">
        <div className="header-text">
          <div className="logo">
            <div className="flex">Flex</div>
            <div className="fuels">Fuels</div>
          </div>
          <div className="slogan">...a one stop solution for optimum nutrition</div>
        </div>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className='logout-btn'>
        Logout
      </button>

      <h1>Vendor Products</h1>

      <div className="buttons">
        <button className="custom-button">
          <Link to='/addProduct' style={{ color: 'white', textDecoration: 'none' }}>Add Product</Link>
        </button>
        <button className="custom-button" style={{ marginLeft: '25px' }}>
          <Link to='/addImage' style={{ color: 'white', textDecoration: 'none' }}>Add Image</Link>
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Mfg Date</th>
            <th>Exp Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {vproducts.map((vproduct) => (
            <tr key={vproduct.vendorProductId}>
              <td>{vproduct.vendorProductId}</td>
              <td>{vproduct.productName}</td>
              <td>{vproduct.productDesc}</td>
              <td>{vproduct.productMfgDate}</td>
              <td>{vproduct.productExpDate}</td>
              <td>{vproduct.productPrice}</td>
              <td>{vproduct.productQuantity}</td>
              <td>{vproduct.pmanufacturer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledVendorList>
  );
}

export default VendorProducts;
