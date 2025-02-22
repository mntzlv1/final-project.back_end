const express = require('express');
const { calculateBMI } = require('../controllers/bmiController');

const router = express.Router();

router.post('/calculate', calculateBMI);

module.exports = router;