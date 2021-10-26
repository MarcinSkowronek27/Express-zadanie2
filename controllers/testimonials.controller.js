const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.getId = async (req, res) => {

  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.post = async (req, res) => {
  const { author, text } = req.body;

  try {
    const tes = await Testimonial.findOne({ author });
    if (!tes) {
      // res.status(400).send('The slot is already taken...').json( { message: "The slot is already taken..." });
      const newTestimonial = new Testimonial({ author, text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
    } else
      res.status(400).send('The slot is already taken...');
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};