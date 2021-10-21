const express = require('express');
const router = express.Router();
const db = require('../db');
const randomID = require('@marcin_lark30/randomid-generator');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id]);
});

// router.route('/seats').post((req, res) => {
//   res.json({ message: 'OK' });
// });

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  if (db.seats.some(item => (item.day == day && item.seat == seat))) {
    res.status(400).send('The slot is already taken...');
    // res.status(400).send('The slot is already taken...').json( { message: "The slot is already taken..." });
  } else
  req.io.emit('test', db.seats);
    db.seats.push({ id: randomID(3), day, seat, client, email })
    req.io.emit('seatsUpdated', db.seats);
  res.json({ message: 'OK' });
});


router.route('/seats/:id').put((req, res) => {
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  res.json({ message: 'OK' });
});

module.exports = router;

