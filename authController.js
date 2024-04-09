const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Role = require('./models/Role')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')
const { validationResult } = require('express-validator')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }

  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this username already exists' })
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'USER' }) // user role

      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      })

      await user.save()
      return res.json({ message: 'User registered successfully' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Registration failed' })
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Login error', errors })
      }
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res
          .status(400)
          .json({ message: `User named ${username} was not found.` })
      }
      const validpassword = bcrypt.compareSync(password, user.password)
      if (!validpassword) {
        return res.status(400).json({ message: `Password is not correct` })
      }
      const user_data = {
        id: user._id,
        roles: user.roles,
        username: user.username,
      }
      const access = generateAccessToken(user_data)
      return res.json({ access })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login failed' })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      console.log(error)
    }
  }

  async getUser(req, res) {
    try {
      const userID = req.body.userID
      const user = await User.findById(userID)
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async updateUser(req, res) {
    try {
      const userID = req.body.userID
      const updatedUser = {
        username: req.body.username,
      }
      const user = await User.findByIdAndUpdate(userID, { $set: updatedUser })
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.body.userID)
      res.json({ message: 'User was deleted successfully' })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new authController()
