const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://gvperes:134679@cluster0-giyyc.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

app.use(require('./routes'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(cors())

app.listen(3040)
