const mongoose = require('mongoose');

const PlateSchema = mongoose.Schema({
  name: String,
  image: String,
  tooltip: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Plate', PlateSchema);
