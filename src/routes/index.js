const Router = require('express')
const router = new Router()
const auth = require('./authRouter')
const users = require('./userRouter')

router.use('/auth', auth)
router.use('/users', users)

module.exports = router
