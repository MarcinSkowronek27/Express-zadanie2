const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// app.get('/testimonials', (req, res) => {
//   res.json(db.testimonials);
// });

router.route('/testimonials/random').get((req, res) => {
  const randomElem = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomElem]);
});

// app.get('/testimonials/random', (req, res) => {
//   const randomElem = Math.floor(Math.random() * db.testimonials.length);
//   res.json(db.testimonials[randomElem]);
// });

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id]);
});

// app.get('/testimonials/:id', (req, res) => {
//   res.json(db.testimonials[req.params.id]);
// });

router.route('/testimonials').post((req, res) => {
  res.json({ message: 'OK' });
});

// app.post('/testimonials', (req, res) => {
//   // const { author, text } = req.body;
//   // res.json(db.push({id: randomElem, author: author, text: text }));
//   res.json({ message: 'OK' });
// });

router.route('/testimonials/:id').put((req, res) => {
  res.json({ message: 'OK' });
});

// app.put('/testimonials/:id', (req, res) => { 
//   // const { author, text } = req.body;
//   // const editArray = db[req.params.id];
//   // editArray.author = author;
//   // editArray.text = text;
//   // res.json(db);
//   res.json({ message: 'OK' });
// });

router.route('/testimonials/:id').delete((req, res) => {
  res.json({ message: 'OK' });
});

// app.delete('/testimonials/:id', (req, res) => {
//   // res.json(db.splice(req.params.id, 1));
//   res.json({ message: 'OK' });
// });

module.exports = router;

