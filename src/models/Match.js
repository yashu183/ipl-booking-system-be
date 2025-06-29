const mongoose = require('mongoose');
const { DatabaseConstants } = require("../constants/DatabaseConstants");

const matchSchema = new mongoose.Schema({
  homeTeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  awayTeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  venue: {
    type: String,
    required: true,
    maxlength: 100
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  ttlTkts: {
    type: Number,
    required: true,
    min: 0
  },
  ttlBookedTkts: {
    type: Number,
    default: 0,
    min: 0
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
  collection: 'matches'
});

// Virtual for matchId to maintain compatibility
matchSchema.virtual('matchId').get(function() {
  return this._id.toHexString();
});

// Validation for ttlBookedTkts
matchSchema.pre('save', function(next) {
  if (this.ttlBookedTkts > this.ttlTkts) {
    const error = new Error(DatabaseConstants.ValidationErrors.InvalidBookedTickets);
    return next(error);
  }
  next();
});

// Ensure virtual fields are serialised
matchSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Match', matchSchema);
  