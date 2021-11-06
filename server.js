const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();


// mongoose.connect(`mongodb+srv://Admin-max:${process.env.PASS_TEST}@cluster0.xxdw6.mongodb.net/newWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true });

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.USER_TEST}:${process.env.PASS_TEST}@cluster0.xxdw6.mongodb.net/newWaveDB?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/newWaveDBtest';
else dbUri = 'mongodb://localhost:27017/newWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

// app.listen('8000', () => {
//   console.log('Server is running on port: 8000');
// });

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New Socket!');
});

app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});




