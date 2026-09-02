import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="hero">
        <p className="hero-eyebrow">New Season</p>
        <h1 className="hero-title">Clothing built to outlast the trend cycle</h1>
        <p className="hero-subtitle">
          Considered basics and statement pieces, designed to earn a permanent place in your wardrobe.
        </p>
        <Link to="/collection">
          <button className="btn-inverse">Shop Collection</button>
        </Link>
      </div>

      <div className="page" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <h1 className="section-title">All Products</h1>
        <hr className="section-rule" />
        <div className="product-grid">
          {products.map((item) => (
            <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;