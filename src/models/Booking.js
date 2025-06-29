const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  bookedTkts: {
    type: Number,
    required: true,
    min: 1
  },
  bookedDate: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isUpdated: {
    type: Boolean,
    default: false
  },
  createdUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true,
  collection: 'bookings'
});

// Virtual for bookingId to maintain compatibility
bookingSchema.virtual('bookingId').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised
bookingSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Booking', bookingSchema);
  