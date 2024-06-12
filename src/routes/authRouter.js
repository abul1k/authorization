const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../controllers/authController')

router.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check(
      'password',
      'Password must not be less than 4 or more than 10 characters'
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
)

router.post(
  '/login',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check(
      'password',
      'Password must not be less than 4 or more than 10 characters'
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.login
)


module.exports = router
