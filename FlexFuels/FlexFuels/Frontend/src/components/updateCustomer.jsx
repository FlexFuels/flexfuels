import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCustomerById, updateCustomer as updateCustomerApi } from '../services/customer';

function UpdateCustomer() {
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchDetailsOfCustomer();
  }, []);

  const fetchDetailsOfCustomer = async () => {
    const response = await getCustomerById(sessionStorage.getItem('userId'));
    if (response.data != null) {
      setCustomerId(sessionStorage.getItem('customerId'));
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setPassword(response.data.password);
    } else {
      toast.error('Error while calling get /Customer/customerId api');
    }
  };

  const handleAddAddress = () => {
    navigate('/add-address');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Profile Details</h1>

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <div className="mb-3">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <button onClick={handleAddAddress} className="btn btn-primary">
                Add Address
              </button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default UpdateCustomer;
