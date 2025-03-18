const express = require('express');
const router = express.Router();
const auth = require('./authRoutes');
const booking = require('./bookingRoutes');

router.use('/auth', auth);
router.use('/bookings', booking);

module.exports = router;