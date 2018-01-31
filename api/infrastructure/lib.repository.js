const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const utils = require('./utils')

const index = config.get('elastic.libIndex')
const type = config.get('elastic.locationType')
const educationTypesType = config.get('elastic.educationTypesType')
const educationLevelType = config.get('elastic.educationLevelType')

async function getLocationsInGeorgia() {

  let options = {
    index,
    type
  }

  let result = await client.search(options)
  console.log(result)

  return result.hits.hits.map(utils.toObject)
}

async function getEducationTypes() {
  let options = {
    index,
    type: educationTypesType
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function getEducationLevels() {
  let options = {
    index,
    type: educationLevelType
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

module.exports = {
  getLocationsInGeorgia,
  getEducationTypes,
  getEducationLevels
}
