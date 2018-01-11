const router = require('express').Router()
const userInteractor = require('../interactors/user.interactor')
const utils = require('../utils')

const baseUrl = '/api/users'

router.get('/', function(req, res, next) {
  userInteractor.getList().then(res.send.bind(res)).catch(next)
})

router.get('/profile', function(req, res, next) {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.getUserProfile(userName)
    .then(res.send.bind(res))
    .catch(next)
})

router.post('/profile', function(req, res, next) {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.fillUserProfile(userName, req.body)
    .then(function() {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.post('/profile/skills', function(req, res, next) {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.addSkill(userName, req.body.skillName)
    .then(function() {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.delete('/profile/:skillName', function(req, res, next) {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.removeSkill(userName, req.params.skillName)
    .then(function() {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.post('/profile/deactivation', function(req, res, next) {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.deactivateUserProfile(userName)
    .then(function() {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.post('/profile/activation', function(req, res, next) {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.activateUserProfile(userName)
    .then(function() {
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
