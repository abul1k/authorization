const Role = require('../models/Role')
const authService = require('../services/authService')
const { validationResult } = require('express-validator')

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      await authService.registration(req.body)
      return res.json({ message: 'User registered successfully' })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Registration failed!', error: error.message })
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Login error', errors })
      }
      const access = await authService.login(req.body)
      return res.json({ access })
    } catch (error) {
      res.status(400).json({ message: 'Login failed', error: error.message })
    }
  }
}

module.exports = new authController()
