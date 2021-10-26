const express = require('express');
const router = express.Router();
const db = require('../db');

const TestimonialController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialController.getAll);

router.route('/testimonials/random').get(TestimonialController.getRandom);

router.route('/testimonials/:id').get(TestimonialController.getId);

router.route('/testimonials').post(TestimonialController.post);

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

