const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.post = async (req, res) => {
  const { performer, genre, price, day, image, id } = req.body;

  try {
    const con = await Concert.findOne({ performer });
    if (!con) {
      // res.status(400).send('The slot is already taken...').json( { message: "The slot is already taken..." });
      const newConcert = new Concert({ performer, genre, price, day, image, id });
      await newConcert.save();
      res.json({ message: 'OK' });
    } else
      res.status(400).send('The slot is already taken...');
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { performer, genre, price, day, image, id } = req.body;

  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image, id } });
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};