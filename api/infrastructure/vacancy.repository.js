const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const utils = require('./utils')

const index = 'vacancy'
const type = 'vacancy'

async function getVacancies() {
  let options = {
    index,
    type
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function addVacancy(vacancy) {
  let options = {
    index,
    type,
    body: vacancy
  }

  let result = await client.index(options)
  console.log(result)

  return result.id
}

async function editVacancy(id, vacancy) {
  let options = {
    index,
    type,
    body: vacancy,
    id: id
  }

  await client.index(options)
}

async function deleteVacancy(id) {
  let options = {
    index,
    type,
    id
  }

  await client.delete(options)
}

module.exports = {
  getVacancies,
  addVacancy,
  editVacancy,
  deleteVacancy
}
