const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  // userID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
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
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);