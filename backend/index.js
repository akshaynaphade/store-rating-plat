require('dotenv').config();

const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes for api
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('The store rating server is running! :)');
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});