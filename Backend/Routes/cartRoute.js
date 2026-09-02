const express = require('express');
const userModel = require('../models/userModel');
const authUser = require('../middleware/auth');

const cartRouter = express.Router();

// Add item to cart
cartRouter.post('/add', authUser, async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Get user's cart
cartRouter.post('/get', authUser, async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    res.json({ success: true, cartData: userData.cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Update cart item quantity (also handles removal when quantity is 0)
cartRouter.post('/update', authUser, async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (quantity === 0) {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});
module.exports = cartRouter;
