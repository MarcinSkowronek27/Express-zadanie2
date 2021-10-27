const express = require('express');
const router = express.Router();
const db = require('../db');

const TestimonialController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialController.getAll);

router.route('/testimonials/random').get(TestimonialController.getRandom);

router.route('/testimonials/:id').get(TestimonialController.getId);

router.route('/testimonials').post(TestimonialController.post);

router.route('/testimonials/:id').put(TestimonialController.putId);

router.route('/testimonials/:id').delete(TestimonialController.delete);


module.exports = router;

