const { Match, Booking, Team, User } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { AuthConstants } = require("../../constants/AuthConstants");

const confirmBooking = async (req, res, next) => {
    try {
      const { userId, matchId, bookedTkts } = req.body;  
      const match = await Match.findOne({ _id: matchId, isDeleted: false });

      if (!match) {
        const error = new Error(ResponseConstants.Booking.MatchNotFound);
        error.statusCode = HttpStatusCodeConstants.NotFound;
        throw error;
      }
  
      if (bookedTkts > match.ttlTkts - match.ttlBookedTkts) {
        const error = new Error(ResponseConstants.Booking.InvalidTicketsMessage);
        error.statusCode = HttpStatusCodeConstants.UnProcessable;
        throw error;
      }
  
      const booking = await Booking.create({
        userId,
        matchId,
        bookedTkts,
        createdUserId: userId
      });
      
      match.ttlBookedTkts = match.ttlBookedTkts + bookedTkts;
      await match.save();

      res.statusCode = HttpStatusCodeConstants.Created;
      res.responseBody = {
        message: ResponseConstants.Booking.BookingConfirmation,
        bookingId: booking._id
      }
      next();
    } catch (error) {
      console.error(`Error while creating Booking - ${error.message}`);
      next(error);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        console.log("bookingId", req);
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            const error = new Error(ResponseConstants.Booking.BookingNotFound);
            error.statusCode = HttpStatusCodeConstants.NotFound;
            throw error;
        }

        if (req.decodedUser.userId !== booking.userId.toString()) {
            const err = new Error(AuthConstants.UserMismatch);
            err.statusCode = HttpStatusCodeConstants.Forbidden;
            throw err;
        }

        if (booking.isDeleted === true) {
            const error = new Error(ResponseConstants.Booking.BookingAlreadyDeleted);
            error.statusCode = HttpStatusCodeConstants.UnProcessable;
            throw error;
        }

        // Get the booked tickets count before cancelling
        const bookedTkts = booking.bookedTkts;
        
        // Find the corresponding match to update ticket count
        const match = await Match.findById(booking.matchId);
        if (!match) {
            const error = new Error(ResponseConstants.Booking.MatchNotFound);
            error.statusCode = HttpStatusCodeConstants.NotFound;
            throw error;
        }
    
        booking.isDeleted = true;
        booking.updatedUserId = req.decodedUser.userId;
        await booking.save();

        // Add the cancelled tickets back to the match
        match.ttlBookedTkts = match.ttlBookedTkts - bookedTkts;
        await match.save();

        res.responseBody = {
          message: ResponseConstants.Booking.BookingCancellationSuccess,
        }
        next();
      } catch (error) {
        console.error(`Error while cancelling Booking - ${error.message}`);
        next(error);
      }
}

const getAllBookings = async (req, res, next) => {
  try {
      const { userId } = req.params;
      const whereCondition = { isDeleted: false };

      if (userId) {
          whereCondition.userId = userId;
      }

      const bookings = await Booking.find(whereCondition)
          .populate({
              path: 'matchId',
              populate: [
                  {
                      path: 'homeTeamId',
                      select: 'code logo'
                  },
                  {
                      path: 'awayTeamId',
                      select: 'code logo'
                  }
              ]
          })
          .populate('userId', 'name email');

      const bookingDetails = bookings.map(booking => ({
          bookingId: booking._id,
          userId: booking.userId._id,
          match: {
              venue: booking.matchId.venue,
              scheduledDate: booking.matchId.scheduledDate,
          },
          homeTeam: {
            name: booking.matchId.homeTeamId.code,
            logo: booking.matchId.homeTeamId.logo
          },
          awayTeam: {
              name: booking.matchId.awayTeamId.code,
              logo: booking.matchId.awayTeamId.logo
          },
          user: {
              name: booking.userId.name,
              email: booking.userId.email
          },
          bookedTkts: booking.bookedTkts,
          bookedDate: booking.bookedDate,
      }));

      res.responseBody = { bookings: bookingDetails };
      next();
  } catch (error) {
      console.error(`Error while fetching Bookings - ${error.message}`);
      next(error);
  }
};


module.exports = { confirmBooking, 
    deleteBooking,
    getAllBookings
};
