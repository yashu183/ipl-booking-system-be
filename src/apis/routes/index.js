const express = require('express');
const router = express.Router();
const auth = require('./authRoutes');
const booking = require('./bookingRoutes');
const user = require('./userRoutes');
const match = require('./matchRoutes');

router.use('/auth', auth);
router.use('/bookings', booking);
router.use('/matches', match);
router.use('/user', user);

module.exports = router;