const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {

  try {
    const per = await Concert.find({ performer: req.params.performer });
    if (per.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(per);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.getGenre = async (req, res) => {

  try {
    const gen = await Concert.find({ genre: req.params.genre });
    if (gen.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(gen);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.getDay = async (req, res) => {

  try {
    const da = await Concert.find({ day: req.params.day });
    if (da.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(da);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.getPriceMinMax = async (req, res) => {
  const minPrice = req.params.price_min
  const maxPrice = req.params.price_max
  try {
    const gen = await Concert.find({ $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }] });
    if (gen.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(gen);
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
  clean = sanitize(req.body.performer);
  console.log('clean:', clean);
  try {
    const con = await Concert.findOne({ performer: clean });
    console.log('con:', con);
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