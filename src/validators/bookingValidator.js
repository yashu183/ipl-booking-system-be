const { checkSchema } = require('express-validator');
const { BookingValdiationConstants } = require("../constants/ValidationConstants");

const bookingValidationSchema = checkSchema({
  userId: {
    in: ['body'],
    isInt: { 
      errorMessage: BookingValdiationConstants.UserIdInt
    },
    isInt: {
      options: { min: 1 },
      errorMessage: BookingValdiationConstants.UserIdInvalid
    }
  },
  matchId: {
    in: ['body'],
    isInt: {
      errorMessage: BookingValdiationConstants.MatchIdInt
    },
    isInt: {
      options: { min: 1 },
      errorMessage: BookingValdiationConstants.MatchIdInvalid
    }

  },
  bookedTkts: {
    in: ['body'],
    isInt: {
      errorMessage: BookingValdiationConstants.BookedTicketsInt
    },
    isInt: {
      options: { min: 1 },
      errorMessage: BookingValdiationConstants.BookedTicketsMin
    }
  },
});

module.exports = { bookingValidationSchema };
