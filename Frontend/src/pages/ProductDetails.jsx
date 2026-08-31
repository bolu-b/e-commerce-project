import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextObject';

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState('');

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductData(found);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="page" style={{ paddingTop: '48px' }}>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!size) {
      alert('Please select a size');
      return;
    }
    addToCart(productData._id, size);
    alert('Added to cart');
  };

  return (
    <div className="page" style={{ display: 'flex', gap: '48px', paddingTop: '48px', paddingBottom: '80px', flexWrap: 'wrap' }}>
      <img
        src={productData.image && productData.image[0]}
        alt={productData.name}
        style={{ width: '360px', height: '440px', objectFit: 'cover', background: 'var(--color-bg-alt)' }}
      />

      <div style={{ maxWidth: '420px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>{productData.name}</h1>
        <p style={{ fontSize: '20px', color: 'var(--color-text-muted)', margin: '0 0 20px' }}>${productData.price}</p>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '28px' }}>{productData.description}</p>

        <p style={{ fontSize: '13px', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '12px' }}>SELECT SIZE</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          {productData.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                padding: '10px 18px',
                border: size === s ? '1px solid var(--color-text)' : '1px solid var(--color-border)',
                background: size === s ? 'var(--color-text)' : '#fff',
                color: size === s ? '#fff' : 'var(--color-text)',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <button onClick={handleAddToCart} className="btn-primary">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;