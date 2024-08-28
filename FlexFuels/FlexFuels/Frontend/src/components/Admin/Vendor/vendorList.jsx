import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getVendorList } from "../../../services/vendor";
import { useNavigate } from 'react-router-dom';
import { styled } from "styled-components";
import "../../../styles.css";

// Styled component for the FlexFuels logo and slogan
const LogoContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  text-align: left;
  margin-bottom: 30px;

  h1 {
    color: #00aaff;
    margin-bottom: 10px;
  }

  h1 span {
    color: #fff;
  }

  p {
    color: white;
    font-size: 14px;
  }
`;

// Styled component for the Vendor List page
const StyledVendorList = styled.div`
  background-color: #1a1a1a;
  min-height: 100vh;
  padding: 20px;

  h1 {
    text-align: center;
    margin: 10px 0;
    color: #00aaff;
  }

  .table {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    overflow: hidden;

    th {
      background-color: #00aaff;
      color: white;
    }

    tbody {
      color: white; /* Set text color to white in the table body */
      
      tr {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .btn-success {
    background-color: #00aaff;
    border: none;
    color: white;
    margin-top: 50px; /* Adding space before the button */
  }

  .btn-success:hover {
    background-color: #0088cc;
  }

  .navbar {
    background-color: #333;
    color: white;
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
    }
  }
`;

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    const response = await getVendorList();
    if (response) {
      setVendors(response.data);
    } else {
      toast.error('Error while calling get /vendor api');
    }
  };

  const navigateToVendorDetails = (vendorId) => {
    sessionStorage.setItem('vId', vendorId);
    navigate(`/vendorProductList/${vendorId}`);
  };

  const addVendor = () => {
    navigate('/addNewVendor');
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate('/adminLogin'); // Navigate to the admin login page
  };

  return (
    <>
      {/* FlexFuels logo and slogan */}
      <LogoContainer>
        <h1>
          Flex<span>Fuels</span>
        </h1>
        <p>...a one stop solution for optimum nutrition</p>
      </LogoContainer>

      <StyledVendorList>
        {/* Logout Button */}
        <button onClick={handleLogout} className='logout-btn'>
          Logout
        </button>

        <h1 style={{ color: 'white' }}>Vendor List</h1>

        <div className='container'>
          <button onClick={addVendor} className='btn btn-success'>
            Add Vendor
          </button>
          <br /><br />
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>VendorID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.vendorId}>
                  <td>{vendor.vendorId}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.fname}</td>
                  <td>{vendor.lname}</td>
                  <td>{vendor.mobile}</td>
                  <td>{vendor.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StyledVendorList>

      <nav className='navbar navbar-expand-sm navbar-dark sticky-bottom' style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', fontSize: '15px' }}>
        <div>
          FlexFuels. ©2024. All Rights Reserved
        </div>
      </nav>
    </>
  );
}

export default VendorList;
