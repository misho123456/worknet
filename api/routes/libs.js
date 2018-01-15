const router = require('express').Router()

const libRepository = require('../infrastructure/lib.repository')

const baseUrl = '/api/libs'

router.get('/', async (req, res) => {
  let result = await libRepository.getLocationsInGeorgia()
  res.send(result[0].locationsInGeorgia)
})

module.exports = {
  router,
  baseUrl
}
