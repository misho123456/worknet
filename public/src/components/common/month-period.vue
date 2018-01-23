<template>
<div class="month-period">
  <b-container>
    <b-row>
      <b-col>
        <b-form-select :value="currentPeriod.month" @input="onMonthInput" class="mb-3">
          <option v-for="monthOption in monthOptions">
            {{monthOption}}
          </option>
        </b-form-select>
      </b-col>
      <b-col>
        <b-form-select :value="currentPeriod.year" @input="onYearInput" class="mb-3">
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
    monthOptions: new Array(12).fill(0).map((item, index) => index + 1),
    yearOptions: [],
    currentPeriod: {}
  }),
  created() {
    let currentYear = new Date().getFullYear()

    this.yearOptions = new Array(currentYear - this.minYear + 1).fill(0)
      .map((item, index) => currentYear - index)

    this.currentPeriod = {
      month: this.month,
      year: this.year
    }
  },
  methods: {
    onMonthInput(value) {
      this.currentPeriod.month = Number(value)

      this.$emit('month', this.currentPeriod.month)
    },
    onYearInput(value) {
      this.currentPeriod.year = Number(value)

      this.$emit('year', this.currentPeriod.year)
    }
  },
  watch: {
    month(value) {
      this.currentPeriod.month = Number(value)
    },
    year(value) {
      this.currentPeriod.year = Number(value)
    }
  }
}
</script>

<style scoped>
</style>
