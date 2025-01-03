const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 3173;
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to CodeCeTra Support API"});
});

app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
