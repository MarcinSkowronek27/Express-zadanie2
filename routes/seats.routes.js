const express = require('express');
const router = express.Router();
// const db = require('../db');
const randomID = require('@marcin_lark30/randomid-generator');

const SeatController = require('../controllers/seats.controller');
// const Seat = require('../models/seat.model');

router.route('/seats').get( SeatController.getAll);

router.route('/seats/:id').get(SeatController.getId);

router.route('/seats').post(SeatController.post);

router.route('/seats/:id').put(SeatController.putId);

router.route('/seats/:id').delete(SeatController.delete);

module.exports = router;

