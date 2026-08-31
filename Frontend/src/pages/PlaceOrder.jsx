import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextObject';

const PlaceOrder = () => {
  const { placeOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: '', city: '', state: '', zipcode: '', country: '', phone: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const success = await placeOrder(formData);
    if (success) {
      alert('Order placed successfully!');
      navigate('/orders');
    }
  };

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', paddingTop: '48px', paddingBottom: '80px' }}>
      <form onSubmit={onSubmitHandler} style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h1 className="section-title" style={{ marginBottom: '8px' }}>Delivery Information</h1>
        <hr className="section-rule" />

        <input className="input-field" name="street" placeholder="Street" value={formData.street} onChange={onChangeHandler} required />
        <input className="input-field" name="city" placeholder="City" value={formData.city} onChange={onChangeHandler} required />
        <input className="input-field" name="state" placeholder="State" value={formData.state} onChange={onChangeHandler} required />
        <input className="input-field" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={onChangeHandler} required />
        <input className="input-field" name="country" placeholder="Country" value={formData.country} onChange={onChangeHandler} required />
        <input className="input-field" name="phone" placeholder="Phone" value={formData.phone} onChange={onChangeHandler} required />

        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
          PLACE ORDER (Cash on Delivery)
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;