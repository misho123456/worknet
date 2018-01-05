<template>
<div id="">
  vacancy {{id}}
</div>
</template>

<script>
const baseUrl = '/api/vacancies'

export default {
  name: 'vacancy-view',
  props: ['id'],
  data: () => ({
    vacancy: {}
  }),
  created() {
    this.$http.get(baseUrl + '/' + this.id)
      .then(response => {
        this.vacancy = response.data
      })
  }
}
</script>

<style scoped>
</style>
