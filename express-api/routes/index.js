const router = require('express').Router()
const { validateRegister, validateLogin } = require('../helper/validators/auth')

const RegisterController = require('../controllers/RegisterController')
const LoginController = require('../controllers/LoginController')

router.post('/register', validateRegister, RegisterController.store)

router.post('/login', validateLogin, LoginController.submit)

module.exports = router
