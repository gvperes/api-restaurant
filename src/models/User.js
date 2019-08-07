const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: String,
  password: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
