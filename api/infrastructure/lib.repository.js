const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const utils = require('./utils')

const index = config.get('elastic.libIndex')
const type = config.get('elastic.locationType')

async function getLocationsInGeorgia() {

  let options = {
    index,
    type
  }

  let result = await client.search(options)
  console.log(result)

  return result.hits.hits.map(utils.toObject)
}

module.exports = {
  getLocationsInGeorgia
}
