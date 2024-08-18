const router = require('express').Router()
const { validateRegister } = require('../helper/validators/auth')

const RegisterController = require('../controllers/RegisterController')

router.post('/register', validateRegister, RegisterController.store)

module.exports = router
