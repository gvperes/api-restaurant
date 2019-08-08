const User = require('../models/User')
const PlateXUser = require('../models/PlateXUser')
const uuid = require('uuid/v4')

module.exports = {
  async index (req, res) {
    const users = await User.find().sort('-createdAt')
    console.log('users', users)

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
    const response = {}

    for (let i = 0; i < users.length; i++) {
      if (users[i].userName === userName) {
        index = i
      }
    }
    const userSend = index !== -1 ? users[index] : false
    if (userSend && userSend.userName === userName && userSend.password === password) {
      response.status = '200'
      response.token = uuid()
    } else {
      response.status = '400'
      response.message = 'Usuário e senha incorretos'
    }

    return res.json(response)
  },

  async delete (req, res) {
    const user = await User.findById(req.params.id)
    await user.delete()
    return res.json(user)
  },

  async userPlates (req, res) {
    const user = await PlateXUser.find({ userId: req.params.id })
    return res.json(user)
  },

  async likePlate (req, res) {
    const { userId, plateId } = req.params

    const checkLikedPlate = await PlateXUser.find({ userId: userId, plateId: plateId })
    console.log(checkLikedPlate.length === 0)
    let register

    if (checkLikedPlate.length === 0) {
      register = await PlateXUser.create({
        userId,
        plateId
      })
    } else {
      console.log('false')
      const teste = await PlateXUser.findById(checkLikedPlate[0].id)
      teste.delete()
      console.log(teste)
    }

    return res.json(register)
  }
}
