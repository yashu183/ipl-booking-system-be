const express = require('express');
const router = express.Router();
const auth = require('./authRoutes');
const booking = require('./bookingRoutes');
const match = require('./matchRoutes');

router.use('/auth', auth);
router.use('/bookings', booking);
router.use('/matches', match);

module.exports = router;