<template>
<div id="vacancies">
  <b-card class="mb-2 vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
    <div @click="viewVacancy(vacancy.id)">
      <h3 class="card-title">{{vacancy.positionName}}</h3>
      <h5 class="card-text">{{vacancy.organization}}</h5>
    </div>
  </b-card>
</div>
</template>
<script>
const baseUrl = '/api/vacancies'

export default {
  name: 'vacancies',
  data: () => ({
    vacancies: []
  }),
  created() {
    this.$http.get(baseUrl)
      .then(response => {
        this.vacancies = response.body
      })
  },
  methods: {
    viewVacancy(vacancyId) {
      this.$router.push(`/vacancies/${vacancyId}/view`)
    }
  }
}
</script>
<style scoped>
.vacancy:hover {
  box-shadow: 0 0 6px rgba(161, 161, 161, 0.89);
}
</style>
