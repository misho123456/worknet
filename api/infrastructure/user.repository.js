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

async function getMainInfo(userName) {
  console.log(userName)

  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'firstName',
      'lastName',
      'personalId',
      'birthDate',
      'genderName',
      'registrationLocationName',
      'registrationLocationUnitName',
      'registrationAddressDescription',
      'factLocationName',
      'factLocationUnitName',
      'factAddressDescription',
      'mobileNumber',
      'email',
      'contactDescription'
    ]
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return null

  return utils.toObject(result.hits.hits[0])
}

async function updateMainInfo(userName, mainInfo) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName
        }
      },
      script: {
        inline: 'ctx._source.factLocationUnitName = test',
        params: { test: 'aaaaaaaaaa' }
      }
      // script: {
      //   inline:
      //     `ctx._source.factLocationUnitName=${mainInfo.factLocationUnitName};
      //   ctx._source.mobileNumber=${mainInfo.mobileNumber};
      //   `
      // }
    }
  }
  let result = await client.updateByQuery(options)
  console.log(result)
  return result
}

async function getSkills(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'skills'
    ]
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.skills
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
  getMainInfo,
  updateMainInfo,
  getUserByUserName,
  saveUser,
  getSkills
}
