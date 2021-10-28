const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id).populate('client');
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.post = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const dep = await Seat.findOne({ day: day, seat: seat });
    if (!dep) {
      // res.status(400).send('The slot is already taken...').json( { message: "The slot is already taken..." });
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      res.json(newSeat);
      req.io.emit('seatsUpdated', await Seat.find());
    } else 
    res.status(400).send('The slot is already taken...');
    // req.io.emit('seatsUpdated', newSeat);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { day, seat, client } = req.body;

  try {
    const com = await Seat.findById(req.params.id);
    if (com) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day, seat, client } });
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

  try {
    const com = await Seat.findById(req.params.id);
    if (com) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};