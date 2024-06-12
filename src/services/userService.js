const User = require('../models/User')

class UserService {
  async create(user) {
    const createdUser = await User.create(user)
    return createdUser
  }

  async getAll({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit // Calculate the number of documents to skip
    const users = await User.find().skip(skip).limit(parseInt(limit)) // Fetch the documents
    const totalUsers = await User.countDocuments() // Get the total number of documents

    return {
      total: totalUsers,
      page: parseInt(page),
      limit: parseInt(limit),
      results: users,
    }
  }

  async getOne(id) {
    if (!id) {
      throw new Error('No id provided')
    }
    const user = await User.findById(id)
    return user
  }

  async update(user) {
    if (!user._id) {
      throw new Error('No id provided')
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    })
    return updatedUser
  }

  async delete(id) {
    if (!id) {
      throw new Error('No id provided')
    }
    const deletedUser = await User.findByIdAndDelete(id)
    return deletedUser
  }
}

module.exports = new UserService()
