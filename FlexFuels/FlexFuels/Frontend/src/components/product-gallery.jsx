import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getInventoryProduct } from '../services/product';
import { constants } from '../utils/constants';
import NavigationBar from './navigationBar';
import { UpdateCart } from '../services/cart';
import { getCategoryList } from '../services/category';
import { getVendorProductListByVendorId } from '../services/vendor';
import poster from '../images/poster_logo.jpg'; // Import the poster image

function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await getVendorProductListByVendorId(4);
    if (response) {
      const productsWithQuantity = response['data'].map(product => ({
        ...product,
        qty: 0, // Initialize qty to 0
      }));

      const beginnerProducts = [];
      const intermediateProducts = [];
      const advancedProducts = [];

      productsWithQuantity.forEach((product, index) => {
        if (index % 3 === 0) {
          beginnerProducts.push(product);
        } else if (index % 3 === 1) {
          intermediateProducts.push(product);
        } else {
          advancedProducts.push(product);
        }
      });

      setProducts({
        All: productsWithQuantity,
        Beginner: beginnerProducts,
        Intermediate: intermediateProducts,
        Advanced: advancedProducts
      });
    } else {
      toast.error('Error while calling get /product api');
    }
  };

  const loadCategories = async () => {
    const response = await getCategoryList();
    if (response) {
      setCategories(response['data']);
    } else {
      toast.error('Error while fetching categories');
    }
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setShowCategories(false);
  };

  const handleCategoryClick = () => {
    if (!showCategories) {
      loadCategories();
    }
    setShowCategories(prevState => !prevState);
  };

  const filteredProducts = isSearching
    ? products.All.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products[selectedLevel || 'All'];

  const customerId = sessionStorage.getItem('userId');

  const GoToCart = async (productId, qty) => {
    const response = await UpdateCart(customerId, productId, qty);
    if (response) {
      toast.dark("Added to Cart");
    }
  };

  const updateProductQty = (productId, delta) => {
    const updatedProducts = { ...products };

    const updateQty = (product) => {
      if (product.productId === productId) {
        return { ...product, qty: Math.max(0, product.qty + delta) };
      }
      return product;
    };

    // Update the specific category (Beginner, Intermediate, or Advanced)
    updatedProducts[selectedLevel || 'All'] = updatedProducts[selectedLevel || 'All'].map(updateQty);

    // Also update the "All" category for consistency
    updatedProducts['All'] = updatedProducts['All'].map(updateQty);

    setProducts(updatedProducts);
  };

  const increaseQty = (productId) => {
    updateProductQty(productId, 1);
  };

  const decreaseQty = (productId) => {
    updateProductQty(productId, -1);
  };

  return (
    <div style={{ backgroundColor: '#1c1c1c', color: '#fff', minHeight: '100vh' }}>
      <NavigationBar onCategoryClick={handleCategoryClick} showCategories={showCategories} />
      <div className="container">
        {!showCategories && (
          <>
            <div className="poster" style={{ textAlign: 'center', margin: '20px 0' }}>
              <img 
                src={poster} // Add the poster image here
                alt="Poster" 
                style={{ 
                  height: '300px', 
                  objectFit: 'contain',  // Ensures the entire image fits within the div without being cropped
                  width: '100%' 
                }} 
              />
            </div>
            <div className="filters" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', gap: '30px' }}>
              <button
                className="btn btn-outline-light"
                style={{ flex: '0 1 200px', padding: '10px 20px' }}
                onClick={() => handleLevelClick('Beginner')}
              >
                Beginner
              </button>
              <button
                className="btn btn-outline-light"
                style={{ flex: '0 1 200px', padding: '10px 20px' }}
                onClick={() => handleLevelClick('Intermediate')}
              >
                Intermediate
              </button>
              <button
                className="btn btn-outline-light"
                style={{ flex: '0 1 200px', padding: '10px 20px' }}
                onClick={() => handleLevelClick('Advanced')}
              >
                Advanced
              </button>
            </div>
          </>
        )}

        {showCategories ? (
          <div className="categories-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '30px' }}>
            {
              categories.map((category) => (
                <div key={category.categoryId} style={{ backgroundColor: '#333', padding: '20px', textAlign: 'center', borderRadius: '10px' }}>
                  <img
                    src="/path/to/category-image.png" 
                    alt={category.categoryName}
                    style={{ height: '100px', marginBottom: '10px' }}
                  />
                  <h5>{category.categoryName}</h5>
                  <p>{category.categoryDesc}</p>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="product-list row" style={{ marginTop: '30px' }}>
            {
              filteredProducts?.map((product) => (
                <div className="col-md-3" key={product.productId} style={{ marginBottom: '20px' }}>
                  <div className="card" style={{ backgroundColor: '#333', borderRadius: '10px', overflow: 'hidden' }}>
                    <img
                      src={`${constants.serverUrl}/vendorProducts/images/${product.vendorProductId}`}
                      style={{ height: '200px', objectFit: 'cover' }}
                      alt={product.productName}
                    />
                    <div className="card-body">
                      <h5>{product.productName}</h5>
                      <p>{product.productDesc}</p>
                      <p>₹ {product.productPrice}</p>
                      <button className="btn btn-primary" onClick={() => GoToCart(product.productId, product.qty)}>Add To Cart</button>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <button onClick={() => decreaseQty(product.productId)}>-</button>
                        <span>Qty: {product.qty}</span>
                        <button onClick={() => increaseQty(product.productId)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGallery;
