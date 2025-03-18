const { Match, Booking } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { AuthConstants } = require("../../constants/AuthConstants");

const confirmBooking = async (req, res, next) => {
    try {

      const { userId, matchId, bookedTkts } = req.body;  
      const match = await Match.findOne({ where: { matchId, isDeleted : 0} });
      if (!match) {
        const error = new Error(ResponseConstants.Booking.MatchNotFound);
        error.statusCode = HttpStatusCodeConstants.NotFound;
        error.isCustom = true;
        throw error;
      }
  
      if (bookedTkts > match.ttlTkts) {
        const error = new Error(ResponseConstants.Booking.InvalidTicketsMessage);
        error.statusCode = HttpStatusCodeConstants.UnProcessable;
        error.isCustom = true;
        throw error;
      }
  
      const booking = await Booking.create({
        userId,
        matchId,
        bookedTkts,
        createdUserId: userId
      });

      match.ttlTkts = match.ttlTkts - bookedTkts;
      match.ttlBookedTkts = match.ttlBookedTkts + bookedTkts;
      
      await match.save();
      res.responseBody = {
        message: ResponseConstants.Booking.BookingConfirmation,
        bookingId: booking.bookingId
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
        const booking = await Booking.findOne({ where: { bookingId } });

        if (!booking) {
            const error = new Error(ResponseConstants.Booking.BookingNotFound);
            error.statusCode = HttpStatusCodeConstants.NotFound;
            throw error;
        }

        if (req.decodedUser.userId !== booking.userId) {
            const err = new Error(AuthConstants.UserMismatch);
            err.statusCode = HttpStatusCodeConstants.Forbidden;
            throw err;
        }

        if (booking.isDeleted === 1) {
            const error = new Error(ResponseConstants.Booking.BookingAlreadyDeleted);
            error.statusCode = HttpStatusCodeConstants.UnProcessable;
            throw error;
        }
    
        booking.isDeleted = 1;
        booking.updatedUserId = req.decodedUser.userId;
        booking.updatedAt= new Date();
        await booking.save();
    
        res.statusCode = HttpStatusCodeConstants.Created;
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
        const whereCondition = { isDeleted: 0 };
        if (userId) {
            whereCondition.userId = userId;
        }
        const bookings = await Booking.findAll({ where: whereCondition });
        const bookingDetails = bookings.map(booking => ({
            bookingId: booking.bookingId,
            userId: booking.userId,
            matchId: booking.matchId,
            bookedTkts: booking.bookedTkts,
            bookedDate: booking.bookedDate,
        }));

        res.responseBody = { bookings: bookingDetails }
        next();
    } catch (error) {
        console.error(`Error while fetching Bookings - ${error.message}`);
        next(error)
    }
}

module.exports = { confirmBooking, 
    deleteBooking,
    getAllBookings
};
