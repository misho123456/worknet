const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const index = 'skill'
const type = 'skill'

async function getSkills() {
  const options = {
    index,
    type
  }

  let searchResult = await client.search(options)

  return searchResult._source
}

async function addSkill(skill) {
  const options = {
    index,
    type,
    body: skill
  }

  return await client.index(options)
}

module.exports = {
  getSkills,
  addSkill
}
