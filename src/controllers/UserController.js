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
    console.log(index)
    const userSend = index !== -1 ? users[index] : false
    console.log(userSend && userSend.userName === userName && userSend.password === password)
    if (userSend && userSend.userName === userName && userSend.password === password) {
      response.status = '200'
      response.token = uuid()
      console.log('entrou')
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
    console.log(req.params)
    const { userId, plateId } = req.params

    const plateSelected = await PlateXUser.find((elem, i) => {
      console.log(elem)
      return elem && elem.userId === userId && elem.plateId === plateId
    })

    const plateLiked = await PlateXUser.create({
      userId,
      plateId
    })

    return res.json(plateLiked)
  }
}
