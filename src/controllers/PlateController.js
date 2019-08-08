const Plate = require('../models/Plate')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {

  async index (req, res) {
    const plates = await Plate.find().sort('-createdAt')

    return res.json(plates)
  },
  async store (req, res) {
    const { name } = req.body
    const { filename: image } = req.file

    const [name] = image.split('.')
    const fileName = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', image)
      )

    // fs.unlinkSync(req.file.pa) // deleta a imagem de uploads

    const plate = await Plate.create({
      name,
      image: fileName
    })

    return res.json(plate)
  },

  async delete (req, res) {
    const plate = await Plate.findById(req.params.id)
    plate.delete()
    return res.json(plate)
  }
}
