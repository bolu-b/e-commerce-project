import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
