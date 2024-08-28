import { useState } from "react";
import { toast } from 'react-toastify';
import { registerVendor } from '../../../services/vendor';
import { useNavigate } from 'react-router-dom';

function AddVendor() {
  const navigate = useNavigate();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const saveVendor = async () => {
    if (fname.length === 0) {
      toast.dark('Please enter First Name');
    } else if (lname.length === 0) {
      toast.dark('Please enter Last Name');
    } else if (email.length === 0) {
      toast.dark('Please enter Email');
    } else if (password.length === 0) {
      toast.dark('Please enter password');
    } else if (mobile.length === 0) {
      toast.dark('Please enter Mobile');
    } else {
      const response = await registerVendor(fname, lname, email, password, mobile);

      if (response) {
        toast.dark('Vendor Added Successfully !!!');
      }
      navigate('/vendorList');
    }
  };

  return (
    <div className="AddVendor" id="outer-container" style={{ backgroundColor: '#1a1a1a', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div id="page-wrap" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        <div style={{ width: '500px', padding: '20px', backgroundColor: '#333', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
          
          {/* Title and Tagline */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: '#00aaff', marginBottom: '10px' }}>
              Flex<span style={{ color: '#fff' }}>Fuels</span>
            </h1>
            <p style={{ color: 'white', fontSize: '14px' }}>
              ...a one stop solution for optimum nutrition
            </p>
            <h2 style={{ color: 'white', marginTop: '20px', fontSize: '22px' }}>Add Vendor</h2>
          </div>
          
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor='fname' style={{ color: '#fff' }}>First Name</label>
              <input
                type='text'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='lname' style={{ color: '#fff' }}>Last Name</label>
              <input
                type='text'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' style={{ color: '#fff' }}>Email</label>
              <input
                type='email'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' style={{ color: '#fff' }}>Password</label>
              <input
                type='password'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3' style={{ marginBottom: '10px' }}>
              <label htmlFor='mobile' style={{ color: '#fff' }}>Mobile</label>
              <input
                type='tel'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className='mb-3' style={{ textAlign: 'center', marginTop: '10px' }}>
              <button onClick={saveVendor} className='btn btn-success' style={{ backgroundColor: '#00aaff', border: 'none', width: '100%' }}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVendor;
