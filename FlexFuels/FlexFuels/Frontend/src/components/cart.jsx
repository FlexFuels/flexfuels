import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getCartList, removeProductFromCart, giveOrder, cartQty } from '../services/cart';
import NavigationBar from './navigationBar';

function Cart() {
  const [carts, setCarts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadCarts();
  }, []);

  const loadCarts = async () => {
    setLoading(true);
    const response = await getCartList(sessionStorage.getItem('userId'));
    if (response) {
      setCarts(response.data);
      setLoading(false);
    } else {
      toast.error('Error while fetching the cart');
      setLoading(false);
    }
  };

  const removeFromCart = async (cartId, productName) => {
    const response = await removeProductFromCart(cartId);
    if (response) {
      toast.dark(`${productName} removed from cart`, {
        style: {
          top: '80px',
        },
      });
      loadCarts(); // Reload cart items after removing a product
    }
  };

  const PlaceOrder = async () => {
    try {
      const formattedDate = currentDate.toISOString().split('T')[0];
      const id = sessionStorage.getItem('userId');
      const total = carts.reduce((acc, cart) => acc + cart.totalAmount, 0);
  
      const response = await giveOrder(formattedDate, id, total);
  
      if (response && response.success) { // Assuming your response has a success flag
        toast.success('Order placed successfully!');
        setCarts([]); // Clear the cart after placing the order
        navigate('/product-gallery');
      } else {
        throw new Error(response.message || 'Failed to place the order');
      }
    } catch (error) {
      toast.error(`Error placing order: ${error.message}`);
      console.error('Error placing order:', error); // Log the error to the console for debugging
    }
  };
  

  let cartTotal = 0;
  let discount = 0;

  return (
    <>
      <section
        className="bg-light my-5"
        style={{ boxShadow: '11px 12px 13px 12px rgb(207, 207, 207)' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>
                  {loading ? (
                    <p>Loading...</p>
                  ) : carts.length > 0 ? (
                    carts.map((cart) => {
                      cartTotal += cart.totalAmount;
                      if (cart.productPrice >= 1000) {
                        discount += 100;
                      }
                      return (
                        <div className="row gy-3 mb-4" key={cart.cartId}>
                          <div className="col-lg-5">
                            <div className="me-lg-5">
                              <div className="d-flex">
                                <div className="">
                                  <p style={{ fontSize: 20, fontFamily: 'cursive' }}>
                                    {cart.productName}
                                  </p>
                                  <p>{cart.pmanufacturer}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                            <div className="" style={{ marginRight: 150 }}>
                              <span className="h6">Quantity: {cart.qty}</span> <br />
                            </div>
                            <div className="">
                              <span className="h6">Total: {cart.totalAmount}</span> <br />
                              <small className="text-muted text-nowrap">
                                {cart.productPrice} / per item
                              </small>
                            </div>
                          </div>
                          <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                            <div className="float-md-end">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeFromCart(cart.cartId, cart.productName)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Your cart is empty.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">{cartTotal}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success">-{discount}</p>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2 fw-bold">{cartTotal - discount}</p>
                  </div>

                  <div className="mt-3">
                    <button
                      className="btn btn-success w-100 shadow-0 mb-2"
                      onClick={PlaceOrder}
                    >
                      Place Order
                    </button>
                    <button
                      className="btn btn-light w-100 border mt-2"
                      onClick={() => navigate('/product-gallery')}
                    >
                      Back to store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav className="navbar navbar-expand-sm bg-success navbar-dark sticky-top">
        <div> </div>
        <div style={{ textAlign: 'center' }}>FlexFuels. ©2024. All Rights Reserved</div>
      </nav>
    </>
  );
}

export default Cart;
