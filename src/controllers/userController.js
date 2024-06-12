const UserService = require('../services/userService')

class UserController {
  async create(req, res) {
    try {
      const createdPost = await UserService.create(req.body)
      res.status(200).json(createdPost)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query // Default values: page 1, limit 10
      const posts = await UserService.getAll({ page, limit })
      return res.status(200).json(posts)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async getOne(req, res) {
    try {
      const post = await UserService.getOne(req.params.id)
      return res.status(200).json(post)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await postService.update(req.body)
      res.status(200).json(updatedPost)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async delete(req, res) {
    try {
      await UserService.delete(req.params.id)
      res.status(200).json('deleted successfully')
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}

module.exports = new UserController()
