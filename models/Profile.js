const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  intrests: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  username: {
    type: String
  },
}, {timestamps: true})

module.exports = Profile = mongoose.model('profile', ProfileSchema);