const Router = require('express')
const router = new Router()
const { check } = require('express-validator')
const controller = require('../controllers/userController')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/', roleMiddleware(['ADMIN']), controller.getAll)
router.get('/:id', roleMiddleware(['ADMIN']), controller.getOne)
router.patch('/', roleMiddleware(['ADMIN']), controller.update)
router.delete('/:id', roleMiddleware(['ADMIN']), controller.delete)

module.exports = router
