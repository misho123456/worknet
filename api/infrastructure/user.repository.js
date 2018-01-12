const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const utils = require('./utils')

const index = config.get('elastic.usersIndex')
const type = config.get('elastic.usersType')

async function getUsers() {
  let options = {
    index,
    type
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getUserByUserName(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName
        }
      }
    }
  }

  let result = await client.search(options)

  console.log(result)

  if (result.hits.total === 0) return null

  return utils.toObject(result.hits.hits[0])
}

async function saveUser(user) {
  let options = {
    index,
    type,
    body: user
  }

  if (user.id) options.id = user.id

  return await client.index(options)
}

module.exports = {
  getUsers,
  getUserByUserName,
  saveUser
}
