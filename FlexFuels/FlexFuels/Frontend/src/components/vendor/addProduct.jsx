import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addVendorProducts } from "../../services/vendor";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productMfgDate, setProductMfgDate] = useState('');
  const [productExpDate, setProductExpDate] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [pmanufacturer, SetPmanufacturer] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [subCatId, setSubCatId] = useState('');

  useEffect(() => {
    setVendorId(sessionStorage['vendorId']);
  }, []);

  const navigate = useNavigate();

  const addProductToList = async () => {
    if (productName.length === 0) {
      toast.dark('Enter product name');
    } else if (productDesc.length === 0) {
      toast.dark('Enter product description');
    } else if (productExpDate === '') {
      toast.dark('Enter expiration date');
    } else if (productMfgDate === '') {
      toast.dark('Enter manufacturing date');
    } else if (productPrice === '') {
      toast.dark('Enter price');
    } else if (productQuantity === '') {
      toast.dark('Enter quantity');
    } else if (pmanufacturer === '') {
      toast.dark('Enter manufacturer');
    } else if (categoryId === '') {
      toast.dark('Enter category ID');
    } else if (vendorId === '') {
      toast.dark('Enter vendor ID');
    } else if (subCatId === '') {
      toast.dark('Enter sub-category ID');
    } else {
      const response = await addVendorProducts(
        productName, productDesc, productMfgDate, productExpDate,
        productPrice, productQuantity, pmanufacturer, categoryId, vendorId, subCatId
      );

      if (response) {
        toast.dark("Product added successfully");
        navigate(`/vendorProducts/${sessionStorage.getItem('vendorId')}`);
      } else {
        toast.dark('Error while adding product, please try again');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', padding: '20px' }}>
        <h1 style={{ color: '#00aaff', marginBottom: '10px' }}>
          Flex<span style={{ color: '#fff' }}>Fuels</span>
        </h1>
        <p style={{ color: 'white', fontSize: '14px' }}>
          ...a one stop solution for optimum nutrition
        </p>
      </div>
      <div className='input-box-admin' style={{ width: '600px', margin: 'auto', padding: '20px', backgroundColor: '#333', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className='row'>
          <div className='col'>
            <div className='form' style={{ margin: '0' }}>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder="Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>
  
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder="Product Description"
                  onChange={(e) => setProductDesc(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>
  
              <div className='mb-3'>
                <label htmlFor='productMfgDate' style={{ color: '#fff' }}>Manufacturing Date:</label>
                <input
                  type='date'
                  id='productMfgDate'
                  className='form-control'
                  onChange={(e) => setProductMfgDate(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>
  
              <div className='mb-3'>
                <label htmlFor='productExpDate' style={{ color: '#fff' }}>Expiration Date:</label>
                <input
                  type='date'
                  id='productExpDate'
                  className='form-control'
                  onChange={(e) => setProductExpDate(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>
  
              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder="Product Price"
                  onChange={(e) => setProductPrice(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>
  
              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder="Product Quantity"
                  onChange={(e) => setProductQuantity(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>

              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder="Manufacturer"
                  onChange={(e) => SetPmanufacturer(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>

              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder="Category ID"
                  onChange={(e) => setCategoryId(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>

              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder="Vendor ID"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>

              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder="Sub-Category ID"
                  onChange={(e) => setSubCatId(e.target.value)}
                  style={{ backgroundColor: '#444', border: '1px solid #555', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%' }}
                />
              </div>
              
              <div className='mb-3'>
                <button onClick={addProductToList} className='btn btn-success' style={{ backgroundColor: '#00aaff', border: 'none', color: '#fff', padding: '10px', borderRadius: '4px', width: '100%', cursor: 'pointer' }}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
