import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContextObject';

const List = () => {
  const { backendUrl, token } = useContext(AdminContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchList();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '32px' }}>
      <h2 style={{ marginBottom: '20px' }}>All Products</h2>

      {list.map((item) => (
        <div
          key={item._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 0',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <img
            src={item.image && item.image[0]}
            alt={item.name}
            style={{ width: '50px', height: '60px', objectFit: 'cover', background: 'var(--color-bg-alt)' }}
          />
          <p style={{ flex: 1 }}>{item.name}</p>
          <p style={{ width: '80px' }}>{item.category}</p>
          <p style={{ width: '60px' }}>${item.price}</p>
          <button
            onClick={() => removeProduct(item._id)}
            style={{ background: 'none', border: 'none', color: '#a33', cursor: 'pointer' }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;