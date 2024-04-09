const jwt = require('jsonwebtoken')

function verifyToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (err) {
    console.log('object', err)
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired')
    } else {
      console.error('Invalid token')
    }
    return null
  }
}

module.exports = {
  verifyToken,
}
