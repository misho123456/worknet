<template>
<div class="vacancyAdd">
  <div class="form-group">
    <label>პოზიცია</label>
    <input type="text" class="form-control" v-model="vacancy.position">
  </div>
  <div class="form-group">
    <label>ორგანიზაცია</label>
    <input type="text" class="form-control" v-model="vacancy.organization">
  </div>
  <!-- <div class="form-group">
    <label>გასაუბრებების დაწყების სავარაუდო თარიღი</label>
    <input type="text" class="form-control" v-model="vacancy.position">
  </div> -->
  <div class="form-group">
    <label>ვაკანტური ადგილები</label>
    <input type="text" class="form-control" v-model="vacancy.vacantPlacesQuantity">
  </div>
  <div class="form-group">
    <label>ანაზღაურება</label>
    <input type="text" class="form-control" v-model="vacancy.averageSalaryName">
  </div>

  <label>სამუშაოს ტიპი</label><br>
  <label>
    <input type="checkbox" v-model="vacancy.fullTime">
    სრული
  </label>
  &nbsp;
  <label>
    <input type="checkbox" v-model="vacancy.partTime">
    არასრული
  </label>
  &nbsp;
  <label>
    <input type="checkbox" v-model="vacancy.shiftBased">
    ცვლებში
  </label>


</div>
</template>
<script>

export default {
  name: 'vacancy-add',
  data: () => ({
    vacancy: {}
  })
}
</script>
<style scoped>
</style>
