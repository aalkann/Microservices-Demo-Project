import React, { useState, useEffect } from 'react';
import { fetchProducts, createOrder, createProduct } from '../services/api';
import OrderModal from '../components/OrderModal';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';

function Home({isAuthenticated}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({show:false, type:null});
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowModal({show:true, type:"order"});
  };

  const handleProductAddClick = () => {
    setShowModal({show:true, type:"product"});
  };

  const handleModalClose = () => {
    setShowModal({show:false, type:null});
    setSelectedProduct(null);
  };

  const handleProductSubmit = async (product) =>{
    try {
      await createProduct(product)
      alert("Product created successfully")
      handleModalClose()
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product. Please try again.');
    }
  }

  const handleOrderSubmit = async (orderData) => {
    try {
      await createOrder(orderData);
      alert('Order submitted successfully!');
      handleModalClose();
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Product List</h1>
      <ProductTable 
      products={products} 
      handleOrderClick={handleOrderClick}  
      handleCreateProduct={handleProductAddClick} 
      isAuthenticated={isAuthenticated}/>
      {(() => {
        switch (showModal.type) {
          case "order":
            if (selectedProduct){
              return (<OrderModal
                show={showModal}
                onClose={handleModalClose}
                onSubmit={handleOrderSubmit}
                product={selectedProduct}
              />)
            }
            break;
        
          case "product":
            return <ProductModal
                    show={showModal}
                    onClose={handleModalClose}
                    onSubmit={handleProductSubmit}
                    />
          default:
            break;
        }
      })()}
    </div>
  );
}

export default Home;
