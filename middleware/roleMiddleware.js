const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const { verifyToken } = require('../features')

module.exports = function (roles) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(403).json({ message: 'User is not registered' })
      }

      const decodedToken = verifyToken(token, secret)

      if (!decodedToken) {
        res.status(401).json({ message: 'Token is invalid or expired' })
      }

      const { id: user_data } = jwt.verify(token, secret)
      let hasRole = false
      user_data.roles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: 'You do not have permission' })
      }
      next()
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'You do not have permission' })
    }
  }
}
