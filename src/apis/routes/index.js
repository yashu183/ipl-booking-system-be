const express = require('express');
const router = express.Router();
const auth = require('./authRoutes');
const booking = require('./bookingRoutes');
const user = require('./userRoutes');
const match = require('./matchRoutes');
const teams = require('./teamRoutes');

router.use('/auth', auth);
router.use('/bookings', booking);
router.use('/matches', match);
router.use('/user', user);
router.use('/teams', teams);

module.exports = router;