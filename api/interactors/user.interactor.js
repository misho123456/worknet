const _ = require('lodash')
const userRepository = require('../infrastructure/user.repository')

async function getList() {
  return await userRepository.getUsers()
}

async function getUserProfile(userName) {
  let user = await userRepository.getUserByUserName()

  return _.omit(user, ['userName', 'isActive', 'deactivationDate'])
}

async function fillUserProfile(userName, profile) {
  let foundUser = await userRepository.getUserByUserName(userName)

  let userToSave

  if (!foundUser) {
    userToSave = Object.assign({
      userName
    }, profile)
  } else {
    userToSave = Object.assign(foundUser, profile)
  }

  await userRepository.saveUser(userToSave)
}

async function deactivateUserProfile(userName) {
  let foundUser = await userRepository.getUserByUserName(userName)

  if (!foundUser) return

  foundUser.isActive = false
  foundUser.deactivationDate = new Date()

  await userRepository.saveUser(foundUser)
}

async function activateUserProfile(userName) {
  let foundUser = await userRepository.getUserByUserName(userName)

  if (!foundUser) return

  foundUser.isActive = true

  await userRepository.saveUser(foundUser)
}

module.exports = {
  getList,
  getUserProfile,
  fillUserProfile,
  deactivateUserProfile,
  activateUserProfile
}
