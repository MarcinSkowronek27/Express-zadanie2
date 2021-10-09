const express = require('express');
const db = require('./db');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

// const db = [
//   { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
//   { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
// ];
// console.log(db);

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

