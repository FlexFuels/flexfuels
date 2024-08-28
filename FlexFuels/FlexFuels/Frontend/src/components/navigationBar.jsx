import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../features/authSlice';

function NavigationBar({ onCategoryClick, showCategories }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const currentPath = location.pathname;

  // Logout the user
  const logoutUser = () => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('fname');
    sessionStorage.removeItem('customerId');
    sessionStorage.removeItem('vendorId');
    sessionStorage.removeItem('firstName');

    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <nav className='navbar navbar-expand-sm navbar-dark sticky-top' style={{ backgroundColor: '#000' }}>
        <div className='container-fluid d-flex align-items-center'>
          <div className="d-flex flex-column align-items-start">
            <div className="navbar-brand d-flex align-items-center">
              <h1 style={{ color: '#00a2ff', margin: 0, fontSize: '50px' }}>Flex</h1>
              <h1 style={{ color: '#fff', margin: 0, fontSize: '50px' }}>Fuels</h1>
            </div>
            {(showCategories || currentPath === '/product-gallery') && (
              <p style={{ color: '#fff', fontSize: '13px', marginTop: '2px', marginLeft: '2px' }}>
                ...a one stop solution for optimum nutrition
              </p>
            )}
          </div>

          <div className='d-flex ms-auto align-items-center'>
            {showCategories ? (
              <>
                <button 
                  onClick={logoutUser} 
                  className='btn btn-outline-light'
                  style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px' 
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  className='nav-link' 
                  to='#' 
                  onClick={onCategoryClick} 
                  style={{ color: 'white', textDecoration: 'underline', marginRight: '20px', fontSize: '16px' }}
                >
                  Categories
                </Link>
                <Link 
                  className='nav-link' 
                  to='/cart' 
                  style={{ color: 'white', textDecoration: 'underline', marginRight: '20px', fontSize: '16px' }}
                >
                  Cart
                </Link>
                <Link 
                  className='nav-link' 
                  to='/updateCustomer' 
                  style={{ color: 'white', textDecoration: 'underline', marginRight: '20px', fontSize: '16px' }}
                >
                  Profile
                </Link>
                <button 
                  onClick={logoutUser} 
                  className='btn btn-outline-light'
                  style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px' 
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <style>
        {`
          .logout-button:hover {
            color: white !important; /* Ensure color change on hover */
            background-color: black !important; /* Optionally, change the background to black on hover */
          }
        `}
      </style>
    </div>
  );
}

export default NavigationBar;
