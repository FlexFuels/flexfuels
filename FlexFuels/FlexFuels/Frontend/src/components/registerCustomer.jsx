import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerCustomer as registerCustomerApi } from '../services/customer';

function RegisterCustomer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const registerCustomer = async () => {
    if (firstName.length === 0) {
      toast.dark('Please enter first name');
    } else if (lastName.length === 0) {
      toast.dark('Please enter last name');
    } else if (email.length === 0) {
      toast.dark('Please enter email');
    } else if (phone.length === 0) {
      toast.dark('Please enter mobile number');
    } else if (password.length === 0) {
      toast.dark('Please enter password');
    } else if (confirmPassword.length === 0) {
      toast.dark('Please confirm password');
    } else if (password !== confirmPassword) {
      toast.dark('Password does not match');
    } else {
      try {
        const response = await registerCustomerApi(
          firstName,
          lastName,
          email,
          password,
          phone
        );

        if (response) {
          toast.dark('Successfully registered a new user');
          navigate('/');
        } else {
          toast.dark('Error while registering a new user, please try again');
        }
      } catch (error) {
        toast.dark('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="RegisterCustomer" id="outer-container" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div id="page-wrap" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ width: '500px', padding: '20px', backgroundColor: '#333', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
          {/* Title and Tagline */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: '#00aaff', marginBottom: '10px' }}>
              Flex<span style={{ color: '#fff' }}>Fuels</span>
            </h1>
            <p style={{ color: 'white', fontSize: '14px' }}>
              ...a one stop solution for optimum nutrition
            </p>
            <h2 style={{ color: 'white', marginTop: '20px', fontSize: '22px' }}>Register Customer</h2>
          </div>
          
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor='firstName' style={{ color: '#fff' }}>First Name</label>
              <input
                type='text'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' style={{ color: '#fff' }}>Last Name</label>
              <input
                type='text'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setLastName(e.target.value)}
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
              <label htmlFor='phone' style={{ color: '#fff' }}>Mobile Number</label>
              <input
                type='tel'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setPhone(e.target.value)}
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
            <div className='mb-3'>
              <label htmlFor='confirmPassword' style={{ color: '#fff' }}>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff' }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <div className='white-text'>
                Already have an account? <Link to='/' style={{ color: '#00aaff' }}>Login here</Link>
              </div>
              <br />
              <button onClick={registerCustomer} className='btn btn-success' style={{ backgroundColor: '#00aaff', border: 'none', width: '100%' }}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCustomer;
