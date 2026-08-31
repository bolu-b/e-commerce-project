import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextObject';

const Cart = () => {
  const { products, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({ _id: itemId, size, quantity: cartItems[itemId][size] });
        }
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartData(tempData);
  }, [cartItems]);

  const getProductDetails = (id) => products.find((p) => p._id === id);

  const total = cartData.reduce((sum, item) => {
    const product = getProductDetails(item._id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <div className="page" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <h1 className="section-title">Your Cart</h1>
      <hr className="section-rule" />

      {cartData.length === 0 && (
       <div className="section-alt" style={{ padding: '60px', textAlign: 'center' }}>
       <p style={{ color: 'var(--color-text-muted)' }}>Your cart is empty.</p>
        </div>
)}

      {cartData.map((item, index) => {
        const product = getProductDetails(item._id);
        if (!product) return null;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '20px 0',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <img
              src={product.image && product.image[0]}
              alt={product.name}
              style={{ width: '80px', height: '100px', objectFit: 'cover', background: 'var(--color-bg-alt)' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500 }}>{product.name}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Size: {item.size}</p>
              <p style={{ fontSize: '14px' }}>${product.price}</p>
            </div>

            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
              className="input-field"
              style={{ width: '60px' }}
            />

            <button
              onClick={() => updateQuantity(item._id, item.size, 0)}
              style={{ background: 'none', border: 'none', color: '#a33', cursor: 'pointer', fontSize: '13px' }}
            >
              Remove
            </button>
          </div>
        );
      })}

      {cartData.length > 0 && (
        <div style={{ marginTop: '32px', textAlign: 'right' }}>
          <p style={{ fontSize: '18px', marginBottom: '16px' }}>Total: ${total}</p>
          <button onClick={() => navigate('/place-order')} className="btn-primary">
            PROCEED TO CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;