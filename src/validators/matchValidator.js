const { checkSchema } = require('express-validator');
const { MatchValidationConstants } = require("../constants/ValidationConstants");

const matchValidationSchema = checkSchema({
  homeTeamId: {
    // in: ['body'],
    // isInt: { 
    //   errorMessage: MatchValidationConstants.HomeTeamIdInt
    // },
    // isInt: {
    //   options: { min: 1 },
    //   errorMessage: MatchValidationConstants.HomeTeamIdInvalid
    // }
  },
  awayTeamId: {
    // in: ['body'],
    // isInt: { 
    //   errorMessage: MatchValidationConstants.AwayTeamIdInt
    // },
    // isInt: {
    //   options: { min: 1 },
    //   errorMessage: MatchValidationConstants.AwayTeamIdInvalid
    // },
    custom: {
      options: (value, { req }) => {
        if (value === req.body.homeTeamId) {
          throw new Error(MatchValidationConstants.TeamIdsSame);
        }
        return true;
      }
    }
  },
  venue: {
    in: ['body'],
    isString: {
      errorMessage: MatchValidationConstants.VenueString
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: MatchValidationConstants.VenueLength
    }
  },
  scheduledDate: {
    in: ['body'],
    isISO8601: {
      errorMessage: MatchValidationConstants.ScheduledDateFormat
    },
    custom: {
      options: (value) => {
        const date = new Date(value);
        const now = new Date();
        if (date < now) {
          throw new Error(MatchValidationConstants.ScheduledDateFuture);
        }
        return true;
      }
    }
  },
  price: {
    in: ['body'],
    isFloat: {
      options: { min: 0.01 },
      errorMessage: MatchValidationConstants.PricePositive
    }
  },
  ttlTkts: {
    in: ['body'],
    isInt: {
      errorMessage: MatchValidationConstants.TotalTicketsInt
    },
    isInt: {
      options: { min: 1 },
      errorMessage: MatchValidationConstants.TotalTicketsMin
    }
  },
  ttlBookedTkts: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: {
      errorMessage: MatchValidationConstants.BookedTicketsInt
    },
    isInt: {
      options: { min: 0 },
      errorMessage: MatchValidationConstants.BookedTicketsMin
    },
    custom: {
      options: (value, { req }) => {
        if (value > req.body.ttlTkts) {
          throw new Error(MatchValidationConstants.BookedTicketsExceed);
        }
        return true;
      }
    }
  }
});

module.exports = { 
  matchValidationSchema 
};