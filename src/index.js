const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://gvperes:134679@cluster0-giyyc.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

app.use(require('./routes'))

app.use(cors())

app.listen(3040)
