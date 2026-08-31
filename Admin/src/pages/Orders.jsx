import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContextObject';

const statusOptions = ['Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered'];

const Orders = () => {
  const { backendUrl, token } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllOrders();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{ marginBottom: '20px' }}>Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: '1px solid var(--color-border)',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <p style={{ fontWeight: 500, marginBottom: '8px' }}>
            {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            {order.address.phone}
          </p>

          {order.items.map((item, i) => (
            <p key={i} style={{ fontSize: '14px', margin: '2px 0' }}>
              {item.name} — Size {item.size} × {item.quantity}
            </p>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <p>Total: ${order.amount} ({order.paymentMethod})</p>
            <select
              className="input-field"
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              style={{ width: 'auto' }}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;