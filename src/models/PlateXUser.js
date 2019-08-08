const mongoose = require('mongoose')

const PlateXUserSchema = mongoose.Schema({
  userId: String,
  plateId: String
}, {
  timestamps: true
})

module.exports = mongoose.model('PlateXUser', PlateXUserSchema)
