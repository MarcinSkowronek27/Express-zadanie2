const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  // { id: 3, author: 'Mietek' },
  // { id: 4, author: 'Janek' },
];
console.log(db);

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomElem = Math.floor(Math.random() * db.length);
  res.json(db[randomElem]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id]);
});

app.post('/testimonials', (req, res) => {
  // const { author, text } = req.body;
  // res.json(db.push({id: randomElem, author: author, text: text }));
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => { 
  // const { author, text } = req.body;
  // const editArray = db[req.params.id];
  // editArray.author = author;
  // editArray.text = text;
  // res.json(db);
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  // res.json(db.splice(req.params.id, 1));
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

