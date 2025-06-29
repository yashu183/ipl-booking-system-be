const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    required: true,
    default: "USER"
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
    default: null
  },
  updatedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Virtual for userId to maintain compatibility
userSchema.virtual('userId').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised
userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
  