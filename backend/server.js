const dotenv = require('dotenv');
const express = require('express');
const { chats } = require('./data/data');
const connectDB = require("./config/db")
const colors = require('colors');
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express();
dotenv.config();
connectDB();

app.use(express.json())   // to accept JSON Data

app.get('/', (req, res) => {
  res.send('API is Running');
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`. yellow.bold));
