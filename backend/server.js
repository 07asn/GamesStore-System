//------------------------
// Imports
//------------------------
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require("cookie-parser");
//------------------------
// Middlewares
//------------------------
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const corsOptions = { origin: 'http://localhost:5173', credentials: true, };
app.use(cors(corsOptions));
//------------------------
// Routes
//------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Digital Games Shop API!');
});
app.use('/api/users', userRoutes);

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
