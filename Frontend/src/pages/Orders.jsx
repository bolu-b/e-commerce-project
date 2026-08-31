import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContextObject';

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

  return (
    <div className="page" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <h1 className="section-title">My Orders</h1>
      <hr className="section-rule" />

      {orders.length === 0 && (
        <div className="section-alt" style={{ padding: '60px', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>No orders yet.</p>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: '1px solid var(--color-border)',
            padding: '24px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '12px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                background: 'var(--color-bg-alt)',
                color: 'var(--color-text)',
              }}
            >
              {order.status}
            </span>
            <p style={{ fontWeight: 500 }}>${order.amount}</p>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            {order.paymentMethod} — {order.payment ? 'Paid' : 'Payment Pending'}
          </p>

          {order.items.map((item, i) => (
            <p key={i} style={{ fontSize: '14px', margin: '4px 0' }}>
              {item.name} — Size {item.size} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;