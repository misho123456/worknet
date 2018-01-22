const router = require('express').Router()
const userInteractor = require('../interactors/user.interactor')
const utils = require('../utils')

const baseUrl = '/api/users'

router.get('/profile/maininfo', async (req, res, next) => {
  try {
    // let userName = utils.getUserNameFromRequest(req)
    let userName = 'test'
    let result = await userInteractor.getUserMainInfo(userName)
    next({ result })
  } catch (error) {
    next({ error })
  }
})

router.put('/profile/maininfo', async (req, res, next) => {
  try {
    // let userName = utils.getUserNameFromRequest(req)
    let userName = 'test'
    let result = await userInteractor.updateMainInfo(userName, req.body)
    next({ result })
  } catch (error) {
    next({ error })
  }
})

router.get('/', (req, res, next) => {
  userInteractor.getList().then(res.send.bind(res)).catch(next)
})

router.get('/profile', (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.getUserProfile(userName)
    .then(res.send.bind(res))
    .catch(next)
})

router.post('/profile', (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.fillUserProfile(userName, req.body)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.get('/profile/skills', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getSkills(userName)
    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/skills', (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.addSkill(userName, req.body.skillName)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.delete('/profile/skills/:skillName', (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.removeSkill(userName, req.params.skillName)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.post('/profile/deactivation', (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.deactivateUserProfile(userName)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.post('/profile/activation', (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.activateUserProfile(userName)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

module.exports = {
  router,
  baseUrl
}
