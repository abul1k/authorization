const User = require('../models/User')

class UserService {
  async create(user) {
    const createdUser = await User.create(user)
    return createdUser
  }

  async getAll() {
    const users = await User.find()
    return users
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
