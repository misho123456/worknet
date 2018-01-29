const _ = require('lodash')
const shortid = require('shortid')
const userRepository = require('../infrastructure/user.repository')
const skillInterctor = require('./skill.interactor')
const factory = require('../domain/factory')
const RecordError = require('../exceptions/record.error')
const domainUtils = require('../domain/domainUtils')

async function getList() {
  return await userRepository.getUsers()
}

async function getUserMainInfo(userName) {
  let user = await userRepository.getMainInfo(userName)
  return user
}

async function updateMainInfo(userName, mainInfo) {

  let foundUser = await userRepository.getUserByUserName(userName)

  let userToSave

  if (!foundUser) {
    throw new RecordError('ჩანაწერი ვერ მოიძებნა')
  } else {
    userToSave = Object.assign(foundUser, mainInfo)
  }

  let result = await userRepository.saveUser(userToSave)
  return result._id

}

async function getUserProfile(userName) {
  let user = await userRepository.getUserByUserName(userName)

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

async function getSkills(userName) {
  return await userRepository.getSkills(userName)
}

async function addSkill(userName, skill) {
  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.addSkill(skill)

    await skillInterctor.addIfNotExists(skill)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function removeSkill(userName, skill) {
  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.removeSkill(skill)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function getJobExperiences(userName) {
  return await userRepository.getJobExperiences(userName)
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

async function addJobExperience(userName, experience) {
  domainUtils.validatePeriod(
    experience.startMonth,
    experience.startYear,
    experience.endMonth,
    experience.endYear
  )

  experience.id = shortid.generate()

  let experiences = await userRepository.getJobExperiences(userName)

  experiences.push(experience)

  await userRepository.saveJobExperiences(userName, experiences)

  return experience.id
}

async function replaceJobExperience(userName, id, experience) {
  if (!experience.id) experience.id = id

  domainUtils.validatePeriod(
    experience.startMonth,
    experience.startYear,
    experience.endMonth,
    experience.endYear
  )

  let experiences = await userRepository.getJobExperiences(userName)

  let index = experiences.findIndex(item => item.id === experience.id)

  experiences[index] = experience

  await userRepository.saveJobExperiences(userName, experiences)
}

async function deleteJobExperience(userName, id) {
  let experiences = await userRepository.getJobExperiences(userName)

  let index = experiences.findIndex(item => item.id === id)

  experiences.splice(index, 1)

  await userRepository.saveJobExperiences(userName, experiences)
}

module.exports = {
  getList,
  getUserMainInfo,
  updateMainInfo,
  getUserProfile,
  fillUserProfile,
  deactivateUserProfile,
  activateUserProfile,
  getSkills,
  addSkill,
  removeSkill,
  getJobExperiences,
  addJobExperience,
  replaceJobExperience,
  deleteJobExperience
}
