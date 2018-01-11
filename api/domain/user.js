const RecordError = require('../exceptions/record.error')

class User {
  addSkill(skill) {
    if (this.skills.find(item => item.skillName === skill)) throw new RecordError('skill already exists')

    this.skills.push({
      skillName: skill,
      endorsements: 0,
      users: []
    })
  }

  removeSkill(skill) {
    let index = this.skills.findIndex(item => item.skillName === skill)

    if (index === -1) throw new RecordError('skill does not exist')

    this.skills.splice(index, 1)
  }
}

module.exports = User
