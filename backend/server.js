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
//------------------------
// Middlewares
//------------------------
dotenv.config();
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
const corsOptions = { origin: 'http://localhost:5174', credentials: true, };
app.use(cors(corsOptions));
//------------------------
// Routes
//------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Digital Games Shop API!');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
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
