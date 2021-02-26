const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema
({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user'
//   },
  username: {
    type: String
  },
  website: {
    type: String
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
  githubusername: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
}, {timestamps: true})

module.exports = Profile = mongoose.model('profile', ProfileSchema);