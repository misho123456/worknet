const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized

const baseUrl = '/api/vacancies'

const vacancyInteractor = require('../interactors/vacancy.interactor')
const utils = require('../utils')

router.get('/', isAuthorized, function(req, res, next) {
  vacancyInteractor.getList(req.query.query)
    .then(res.send.bind(res))
    .catch(next)
})

router.get('/own', isAuthorized, function(req, res, next) {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.getUserVacancies(userName)
    .then(res.send.bind(res))
    .catch(next)
})

router.get('/:id', isAuthorized, function(req, res, next) {
  vacancyInteractor.getById(req.params.id)
    .then(res.send.bind(res))
    .catch(next)
})

router.post('/', isAuthorized, function(req, res, next) {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.addVacancy(userName, req.body)
    .then(function(id) {
      res.send({
        id: id
      })
    })
    .catch(next)
})

router.put('/:id', isAuthorized, function(req, res, next) {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.editVacancy(userName, req.params.id, req.body)
    .then(function() {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.delete('/:id', isAuthorized, function(req, res, next) {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.deleteVacancy(userName, req.params.id)
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
