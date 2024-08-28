import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../features/authSlice'
import Sidebar from '../Sidebar'
import { vendorLogin } from '../../services/vendor'

function VendorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const VendorLoginAuth = async () => {
    if (email.length === 0) {
      toast.error('Please enter email')
    } else if (password.length === 0) {
      toast.error('Please enter password')
    } else {
      const response = await vendorLogin(email, password)

      if (response) {
        const { vendorId, fname, role } = response.data
        sessionStorage['vendorId'] = vendorId
        sessionStorage['fname'] = fname
        sessionStorage['role'] = role
        
        dispatch(login())  // Update the global store's authSlice

        toast.success(`Welcome ${fname} to grocery store`)
        navigate(`/vendorProducts/${vendorId}`)
      } else {
        toast.error('Invalid username or password')
      }
    }
  }

  return (
    <div
      className="LoginUser"
      id="outer-container"
      style={{
        backgroundColor: '#1a1a1a', // Dark gray background similar to previous codes
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Sidebar
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        styles={{
          bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px',
          },
          bmBurgerBars: {
            background: 'white',
          },
          bmBurgerBarsHover: {
            background: '#00aaff',
          },
          bmMenuWrap: {
            position: 'fixed',
            height: '100%',
          },
          bmMenu: {
            background: '#333',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em',
          },
          bmMorphShape: {
            fill: '#333',
          },
          bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em',
          },
          bmItem: {
            display: 'block',
            padding: '0.8em',
            color: 'white',
            textAlign: 'left',
            textDecoration: 'none',
          },
          bmItemHover: {
            color: '#00aaff',
          },
        }}
      />
      <div
        id="page-wrap"
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '400px',
            padding: '20px',
            backgroundColor: '#333',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: '#00aaff', marginBottom: '10px' }}>
              Flex<span style={{ color: '#fff' }}>Fuels</span>
            </h1>
            <p style={{ color: 'white', fontSize: '14px' }}>
              ...a one stop solution for optimum nutrition
            </p>
            <h2 style={{ color: 'white', marginTop: '20px', fontSize: '25px' }}>
              Vendor Login
            </h2>
          </div>

          <div className='form'>
            <div className='mb-3'>
              <label htmlFor='email' style={{ color: '#fff' }}>
                Email
              </label>
              <input
                type='text'
                className='form-control'
                style={{
                  backgroundColor: '#444',
                  border: '1px solid #555',
                  color: '#fff',
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' style={{ color: '#fff' }}>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                style={{
                  backgroundColor: '#444',
                  border: '1px solid #555',
                  color: '#fff',
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3' style={{ textAlign: 'center' }}>
              <button
                onClick={VendorLoginAuth}
                className='btn btn-success'
                style={{
                  backgroundColor: '#00aaff',
                  border: 'none',
                  width: '100%',
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorLogin
