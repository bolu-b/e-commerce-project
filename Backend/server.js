const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectCloudinary = require('./config/Cloudinary');
connectCloudinary();
const productRouter = require('./Routes/productRoute');
const userRouter = require('./Routes/userRoute');
const cartRouter = require('./Routes/cartRoute');
const orderRouter = require('./Routes/orderRoute');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API is working');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});