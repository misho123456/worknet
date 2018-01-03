const router = require('express').Router()

const baseUrl = '/api/vacancies'

const vacancyInteractor = require('../interactors/vacancy.interactor')

router.get('/', function(req, res, next) {
  vacancyInteractor.getList()
    .then(res.send.bind(res))
    .catch(next)
})

router.post('/', function(req, res, next) {
  vacancyInteractor.addVacancy(req.body)
    .then(function(id) {
      res.send({
        id: id
      })
    })
    .catch(next)
})

router.put('/:id', function(req, res, next) {
  vacancyInteractor.editVacancy(req.params.id, req.body)
    .then(function() {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.delete('/:id', function(req, res, next) {
  vacancyInteractor.deleteVacancy(req.params.id)
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
