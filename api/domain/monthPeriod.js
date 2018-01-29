class MonthPeriod {
  constructor(month, year) {
    this.month = Number(month)
    this.year = Number(year)
  }

  isFuture() {
    let currentPeriod = MonthPeriod.currentMonthPeriod()

    return this.compareTo(currentPeriod) > 0
  }

  static currentMonthPeriod() {
    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return new MonthPeriod(month, year)
  }

  compareTo(period) {
    return 12 * this.year + this.month - 12 * period.year - period.month
  }
}

module.exports = MonthPeriod
