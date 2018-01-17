const router = require('express').Router()

const skillInteractor = require('../interactors/skill.interactor')

const baseUrl = '/api/skills'

router.get('/search', function(req, res, next) {
  skillInteractor.search(req.query.query)
    .then(res.send.bind(res))
    .catch(next)
})

module.exports = {
  router,
  baseUrl
}
