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

router.post('/profile/skills', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.addSkill(userName, req.body.skillName)
    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/skills/:skillName', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.removeSkill(userName, req.params.skillName)
    next({})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/experiences', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getJobExperiences(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/experiences', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.addJobExperience(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.put('/profile/experiences/:id', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.replaceJobExperience(userName, req.params.id, req.body)

    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/experiences/:id', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.deleteJobExperience(userName, req.params.id)

    next({})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/educations', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getEducations(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/educations/formalEducationLevel', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getFormalEducationLevel(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/educations/formalEducationLevel', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.setFormalEducationLevel(userName, req.body.level)

    next({})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/educations', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.addEducation(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.put('/profile/educations/:id', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.editEducation(userName, req.params.id, req.body)

    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/educations/:id', async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.deleteEducation(userName, req.params.id)

    next({})
  } catch (error) {
    next({error})
  }
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
