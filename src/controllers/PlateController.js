const Plate = require('../models/Plate')

module.exports = {

  async index (req, res) {
    const plates = await Plate.find().sort('-createdAt')

    return res.json(plates)
  },
  async store (req, res) {
    const { name } = req.body
    const { filename: image } = req.file
    console.log(req.file)

    const plate = await Plate.create({
      name,
      image
    })

    return res.json(plate)
  },

  async delete (req, res) {
    const plate = await Plate.findById(req.params.id)
    plate.delete()
    return res.json(plate)
  }
}
