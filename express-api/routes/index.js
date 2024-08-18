const router = require('express').Router()
const { validateRegister, validateLogin } = require('../helper/validators/auth')
const { verifyToken } = require('../middleware/auth')

const RegisterController = require('../controllers/RegisterController')
const LoginController = require('../controllers/LoginController')
const UserController = require('../controllers/UserController')
const { validateUser } = require('../helper/validators/users')

router.post('/register', validateRegister, RegisterController.store)

router.post('/login', validateLogin, LoginController.submit)

router.route('/admin/users')
    .get(verifyToken, UserController.getUsers)
    .post(verifyToken, validateUser, UserController.store)
router.route('/admin/users/:id')
    .get(verifyToken, UserController.show)
    .put(verifyToken, validateUser, UserController.update)
    .delete(verifyToken, UserController.destroy)

module.exports = router
