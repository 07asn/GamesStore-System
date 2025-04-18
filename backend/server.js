//------------------------
// Imports
//------------------------
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require("cookie-parser");

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const gamingRoutes = require('./routes/gamingRoute');
const inventoryRoutes = require('./routes/inventoryRoutes');
const contactRoutes = require('./routes/contactRoutes');
//------------------------
// Middlewares
//------------------------
dotenv.config();
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
const corsOptions = { origin: 'http://localhost:5173', credentials: true, };
app.use(cors(corsOptions));

//------------------------
// Load Associations
//------------------------
// Ensure that associations are set up by requiring the associations file.
// (This file will automatically register all associations when loaded.)
require('./models/associations');

//------------------------
// Routes
//------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Digital Games Shop API!');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/', gamingRoutes);
//---------------------------
// ERROR HANDLERS
//---------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


//------------------------
// Server
//------------------------
async function startServer() {
  try {
    await sequelize.sync({ force: false }); 

    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database or starting server:', error);
    process.exit(1);
  }
}

startServer();
