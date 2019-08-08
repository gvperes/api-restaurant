const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const UserController = require('./controllers/UserController')
const PlateController = require('./controllers/PlateController')

const upload = multer(uploadConfig)
const routes = express.Router()

routes.post('/plates', upload.single('image'), PlateController.store)
routes.get('/plates', PlateController.index)

routes.post('/users', upload.single(''), UserController.store)
routes.get('/users', UserController.index)
routes.delete('/users/:id/delete', UserController.delete)
routes.get('/users/:id/plates', UserController.userPlates)
routes.post('/users/:userId/plates/:plateId', upload.single(''), UserController.likePlate)

routes.post('/login', upload.single(''), UserController.login)

module.exports = routes
