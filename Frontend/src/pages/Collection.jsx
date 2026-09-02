import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [sortType, setSortType] = useState('relevant');

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

  let filteredProducts = category === 'All'
    ? products
    : products.filter((item) => item.category === category);

  if (sortType === 'low-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortType === 'high-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="page" style={{ display: 'flex', gap: '48px', paddingTop: '48px', paddingBottom: '80px' }}>

      {/* Sidebar filters */}
      <div style={{ minWidth: '180px' }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '16px' }}>
          CATEGORIES
        </p>
        {['All', 'Men', 'Women', 'Kids'].map((cat) => (
          <p
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              cursor: 'pointer',
              fontSize: '14px',
              color: category === cat ? 'var(--color-text)' : 'var(--color-text-muted)',
              fontWeight: category === cat ? 600 : 400,
              marginBottom: '10px',
            }}
          >
            {cat}
          </p>
        ))}
      </div>

      {/* Products */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <h1 className="section-title">All Collections</h1>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="input-field"
            style={{ fontSize: '13px' }}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        <hr className="section-rule" />

        <div className="product-grid">
          {filteredProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;