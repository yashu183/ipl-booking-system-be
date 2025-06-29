const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  logo: {
    type: String,
    default: null
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
  collection: 'teams'
});

// Virtual for teamId to maintain compatibility
teamSchema.virtual('teamId').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised
teamSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Team', teamSchema);
