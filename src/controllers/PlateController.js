const Plate = require('../models/Plate')
const sharp = require('sharp')
const path = require('path')
// const fs = require('fs')

module.exports = {

  async index (req, res) {
    const plates = await Plate.find().sort('-createdAt')
    const response = {
      status: 200,
      data: plates,
    };
    return res.json(response)
  },
  async store (req, res) {
    const {
      name,
      image,
      tooltip,
    } = req.body

    const plate = await Plate.create({
      name,
      image,
      tooltip
    })

    return res.json(plate)
  },

  async delete (req, res) {
    const plate = await Plate.findById(req.params.id)
    plate.delete()
    return res.json(plate)
  }
}
