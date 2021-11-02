const express = require('express');
const router = express.Router();
// const db = require('../db');

const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get( ConcertController.getAll);

router.route('/concerts/performer/:performer').get(ConcertController.getPerformer);

router.route('/concerts/genre/:genre').get(ConcertController.getGenre);

router.route('/concerts/price/day/:day').get(ConcertController.getDay);

router.route('/concerts/price/:price_min/:price_max').get(ConcertController.getPriceMinMax);

router.route('/concerts/:id').get(ConcertController.getId);

router.route('/concerts').post(ConcertController.post);

router.route('/concerts/:id').put(ConcertController.putId);

router.route('/concerts/:id').delete(ConcertController.delete);

module.exports = router;

