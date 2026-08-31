import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextObject';

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);

  const cartCount = Object.values(cartItems).reduce((total, sizes) => {
    return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
  }, 0);

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">FOREVER</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </div>
  );
};

export default Navbar;