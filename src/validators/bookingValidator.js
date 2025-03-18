const { checkSchema } = require('express-validator');
const { BookingValdiationConstants } = require("../constants/ValidationConstants");

const bookingValidationSchema = checkSchema({
  userId: {
    in: ['body'],
    isInt: { 
      errorMessage: BookingValdiationConstants.UserIdInt
    },
    notEmpty: {
      errorMessage: BookingValdiationConstants.UserIdNotEmpty,
    }
  },
  matchId: {
    in: ['body'],
    isInt: {
      errorMessage: BookingValdiationConstants.MatchIdInt
    },
    notEmpty: {
      errorMessage: BookingValdiationConstants.MatchIdNotEmpty,
    }
  },
  bookedTkts: {
    in: ['body'],
    isInt: {
      errorMessage: BookingValdiationConstants.BookedTicketsInt
    },
    notEmpty: {
      errorMessage: BookingValdiationConstants.BookedTicketsNotEmpty,
    }
  },
});

module.exports = { bookingValidationSchema };
