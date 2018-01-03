const vacancyRepository = require('../infrastructure/vacancy.repository')

async function getList() {
  return await vacancyRepository.getVacancies()
}

async function addVacancy(vacancy) {
  return await vacancyRepository.addVacancy(vacancy)
}

async function editVacancy(id, vacancy) {
  return await vacancyRepository.editVacancy(vacancy)
}

async function deleteVacancy(id) {
  return await vacancyRepository.deleteVacancy(id)
}

module.exports = {
  getList,
  addVacancy,
  editVacancy,
  deleteVacancy
}
