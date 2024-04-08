const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const roleMiddleware = require('./middleware/roleMiddleware')

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
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
router.get('/user', roleMiddleware(['ADMIN']), controller.getUser)
router.patch('/user', roleMiddleware(['ADMIN']), controller.updateUser)
router.delete('/user', roleMiddleware(['ADMIN']), controller.deleteUser)

module.exports = router
