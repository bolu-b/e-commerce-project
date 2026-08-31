import { useState, useEffect } from 'react';
import axios from 'axios';

import { ShopContext } from './ShopContextObject';

const ShopContextProvider = (props) => {
  const backendUrl = 'http://localhost:4000';
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [cartItems, setCartItems] = useState({});

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!token) {
      alert('Please login first');
      return;
    }
    try {
      await axios.post(
        backendUrl + '/api/cart/add',
        { itemId, size },
        { headers: { token } }
      );
      getUserCart(token);
    } catch (error) {
      console.log(error);
    }
  };
  const updateQuantity = async (itemId, size, quantity) => {
  try {
    await axios.post(
      backendUrl + '/api/cart/update',
      { itemId, size, quantity },
      { headers: { token } }
    );
    getUserCart(token);
  } catch (error) {
    console.log(error);
  }
};
const placeOrder = async (address) => {
  try {
    const items = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            items.push({
              name: product.name,
              price: product.price,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
    }

    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const response = await axios.post(
      backendUrl + '/api/order/place',
      { items, amount, address },
      { headers: { token } }
    );

    if (response.data.success) {
      getUserCart(token);
      return true;
    } else {
      alert(response.data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    token,
    setToken,
    cartItems,
    addToCart,
    updateQuantity,
    backendUrl,
    placeOrder
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default ShopContextProvider;