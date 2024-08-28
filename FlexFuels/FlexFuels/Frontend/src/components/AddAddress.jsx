import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addAddress } from '../services/customer';

function AddressForm() {
  const [adrLine1, setAdrLine1] = useState('');
  const [adrLine2, setAdrLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!adrLine1 || !city || !state || !country || !zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    const addressData = {
      adrLine1,
      adrLine2,
      city,
      state,
      country,
      zipCode,
    };

    // Assuming you have an API function to handle address submission
    const response = await addAddress(addressData);

    if (response) {
      toast.success('Address added successfully');
      navigate('/profile'); // Navigate back to profile or desired page
    } else {
      toast.error('Failed to add address');
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', margin: 10 }}>Add Address</h1>
      <div className="form">
        <div className="mb-3">
          <label htmlFor="adrLine1">Address Line 1</label>
          <input
            type="text"
            className="form-control"
            value={adrLine1}
            onChange={(e) => setAdrLine1(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="adrLine2">Address Line 2</label>
          <input
            type="text"
            className="form-control"
            value={adrLine2}
            onChange={(e) => setAdrLine2(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            className="form-control"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <button onClick={handleSubmit} className="btn btn-primary">
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
