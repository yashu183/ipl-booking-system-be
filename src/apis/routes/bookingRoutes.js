const express = require('express');
const router = express.Router();
const {confirmBooking, deleteBooking, getAllBookings } = require("../handlers/booking.handler");
const { bookingValidationSchema } = require("../../validators/bookingValidator");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");
const {checkUserIdMatch, verifyToken, isAdmin} =  require("../../middlewares/authorizationHandler");

router.post('/', bookingValidationSchema, validatioErrorHandler, verifyToken, checkUserIdMatch, confirmBooking);
router.delete('/:bookingId', verifyToken, deleteBooking);
router.get('/user/:userId', verifyToken, checkUserIdMatch, getAllBookings);
router.get('/', verifyToken, isAdmin, getAllBookings);
module.exports = router;
