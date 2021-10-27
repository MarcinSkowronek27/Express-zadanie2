const express = require('express');
const router = express.Router();
// const db = require('../db');

const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get( ConcertController.getAll);

router.route('/concerts/:id').get(ConcertController.getId);

router.route('/concerts').post(ConcertController.post);

router.route('/concerts/:id').put(ConcertController.putId);

router.route('/concerts/:id').delete(ConcertController.delete);

module.exports = router;

