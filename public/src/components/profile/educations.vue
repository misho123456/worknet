<template>
  <div class="educations">
    <b-card title="განათლება">
      <p>
        <b>ფორმალური განათლების დონე: </b>{{formalEducationLevelName}}
      </p>
      <b-btn class="right-float">დამატება</b-btn>
      <b-list-group class="right-clear">
        <b-list-group-item v-for="edu in educations" :key="edu.id">
          <div>
            <p>
              <b>
                {{edu.educationType}}({{edu.educationLevel}}):
              </b>
              {{edu.institution}}
              <span v-if="edu.locationName">
                [{{edu.locationName}}, {{edu.locationUnitName}}]
              </span>
            </p>
            <p>
              <b>მიმართულება: </b>{{edu.directionName}}
            </p>
            <p>
              <b>პერიოდი: </b>
              {{edu.startMonth}}/{{edu.startYear}} -
              <span v-if="edu.endYear && edu.endMonth">{{edu.endMonth}}/{{edu.endYear}}</span>
              <span v-else>დღემდე</span>
            </p>
          </div>
          <div class="right-float">
            <b-btn>რედაქტირება</b-btn>
            <b-btn>წაშლა</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-modal ref="educationModal" ok-title="შენახვა" cancel-title="დახურვა" @ok="submit" @hide="onHide">

      <b-container class="periods">
        <b-row no-gutters>
          <b-col>
            <div class="monthPeriod">
                <label>დასაწყისი</label>
                <month-period
                  :month="currentEducation.startMonth"
                  :year="currentEducation.startYear"
                  @month="onStartMonthChange"
                  @year="onStartYearChange">
                </month-period>
            </div>
          </b-col>
          <b-col>
            <div class="monthPeriod" v-if="!stillLearning">
              <label>დასასრული</label>
              <month-period
                :month="currentEducation.endMonth"
                :year="currentEducation.endYear"
                @month="onEndMonthChange"
                @year="onEndYearChange">
              </month-period>
            </div>
            <div class="period-present-text" v-else>
              დღემდე
            </div>
          </b-col>
        </b-row>
      </b-container>

      <b-form-checkbox v-model="stillLearning">
        ახლაც აქ ვსწავლობ
      </b-form-checkbox>

    </b-modal>
  </div>
</template>

<script>
import monthPeriod from '../common/month-period'
import { bus } from '../common/bus'

const baseUrl = 'api/users/profile/educations'
const headers = {
  username: 'test'
} // temporary headers until um is written

export default {
  name: 'educations',
  data: () => ({
    formalEducationLevelName: 'უმაღლესი - ბაკალავრი',
    educations: [],
    currentEducation: {},
    stillLearning: false
  }),
  async created() {
    try {
      let response = await this.$http.get(baseUrl, {headers})

      this.educations = response.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    submit() {

    },
    onHide() {

    },
    onStartMonthChange() {

    },
    onStartYearChange() {

    },
    onEndMonthChange() {

    },
    onEndYearChange() {

    }
  },
  components: {
    'month-period': monthPeriod
  }
}
</script>

<style scoped>
</style>
