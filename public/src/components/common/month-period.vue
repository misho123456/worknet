<template>
<div class="month-period">
  <b-container>
    <b-row>
      <b-col>
        <b-form-select :value="month" @input="onMonthInput" v-model="month" class="mb-3">
          <option v-for="monthOption in monthOptions">
            {{monthOption}}
          </option>
        </b-form-select>
        <b-form-select :value="year" @input="onYearInput" v-model="year" class="mb-3">
          <option v-for="yearOption in yearOptions">{{yearOption}}</option>
        </b-form-select>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  name: 'month-period',
  props: {
    minYear: {
      type: Number,
      default: new Date().getFullYear() - 60
    },
    month: {
      type: Number
    },
    year: {
      type: Number
    }
  },
  data: () => ({
    monthOptions: new Array(12).map((item, index) => index + 1),
    yearOptions: []
  }),
  created() {
    let currentYear = new Date().getFullYear()

    this.yearOptions = new Array(currentYear - this.minYear + 1)
      .map((item, index) => currentYear - index)

    if (this.value) this.currentPeriod = this.value
  },
  methods: {
    onMonthInput(value) {
      this.month = value

      this.$emit('month', value)
    }
    onYearInput(value) {
      this.year = value

      this.$emit('year', value)
    }
  }
}
</script>

<style scoped>
</style>
