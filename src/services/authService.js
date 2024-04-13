const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET_KEY
const expiresIn = process.env.TOKEN_EXPIRES_IN

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }

  return jwt.sign(payload, secret, { expiresIn })
}

class AuthService {
  async registration({ username, password }) {
    const candidate = await User.findOne({ username })
    if (candidate) {
      throw new Error('User with this username already exists')
    }

    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await Role.findOne({ value: 'USER' }) // user role

    const user = await User.create({
      username,
      password: hashPassword,
      roles: [userRole.value],
    })
    await user.save()
  }

  async login({ username, password }) {
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error(`User named ${username} was not found.`)
    }
    const validpassword = bcrypt.compareSync(password, user.password)
    if (!validpassword) {
      throw new Error(`Password is not correct`)
    }
    const user_data = {
      id: user._id,
      roles: user.roles,
      username: user.username,
    }
    const access = generateAccessToken(user_data)
    return access
  }
}

module.exports = new AuthService()
