const User = require('../models/User')
const PlateXUser = require('../models/PlateXUser')
const uuid = require('uuid/v4')

module.exports = {
  async index (req, res) {
    const users = await User.find().sort('-createdAt')

    return res.json(users)
  },
  async store (req, res) {
    const { userName, password } = req.body

    const users = await User.create({
      userName,
      password
    })
    return res.json(users)
  },

  async login (req, res) {
    const { userName, password } = req.body

    const users = await User.find()
    let index = -1
    let id = -1
    const response = {}

    for (let i = 0; i < users.length; i++) {
      if (users[i].userName === userName) {
        index = i
        id = users[i]._id
      }
    }
    const userSend = index !== -1 ? users[index] : false
    if (userSend && userSend.userName === userName && userSend.password === password) {
      response.status = '200'
      response.data = {
        token: uuid(),
        id: id
      }
    } else {
      response.status = '400'
      response.data = {
        message: 'Usuário e senha incorreto'
      }
    }
    return res.json(response)
  },

  async delete (req, res) {
    const user = await User.findById(req.params.id)
    await user.delete()
    return res.json(user)
  },

  async userPlates (req, res) {
    const response = {}

    const platesLikedByUser = await PlateXUser.find({ userId: req.params.id })

    if (platesLikedByUser) {
      response.status = 200
      response.data = platesLikedByUser
    } else {
      response.status = 400
      response.data = { message: 'Não existem pratos para o usuário buscado' }
    }
    return res.json(response)
  },

  async likePlate (req, res) {
    const { userId, plateId } = req.params

    const checkLikedPlate = await PlateXUser.find({ userId: userId, plateId: plateId })

    let register

    if (checkLikedPlate.length === 0) {
      register = await PlateXUser.create({
        userId,
        plateId
      })

      return res.json({
        status: 200,
      })
    } else {
      const teste = await PlateXUser.findById(checkLikedPlate[0].id)
      teste.delete()
      return res.json({
        status: 200
      })
    }
  }
}
