import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextObject';

const Navbar = () => {
  const { cartItems, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartCount = Object.values(cartItems).reduce((total, sizes) => {
    return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
  }, 0);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">FOREVER</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/orders">Orders</Link>

        {token === '' ? (
          <Link to="/login">Login</Link>
        ) : (
          <span onClick={logout} style={{ cursor: 'pointer' }}>Logout</span>
        )}

        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </div>
  );
};

export default Navbar;