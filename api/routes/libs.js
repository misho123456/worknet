const router = require('express').Router()

const libRepository = require('../infrastructure/lib.repository')

const baseUrl = '/api/libs'

router.get('/locationsOfGeorgia', async (req, res) => {
  try {
    let result = await libRepository.getLocationsInGeorgia()
    res.send(result[0].locationsInGeorgia)
  } catch (error) {
    res.send({ message: 'მონაცემების ჩატვირთვის დროს მოხდა შეცდომა', error })
  }
})

module.exports = {
  router,
  baseUrl
}
