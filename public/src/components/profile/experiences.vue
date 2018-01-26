<template>
<div class="experiences">
  <b-card title="გამოცდილება">
    <b-btn class="right-float" @click="show(currentExperience)">დამატება</b-btn>
    <b-list-group class="right-clear">
      <b-list-group-item v-for="experience in experiences" :key="experience.id">

        <div>
          <p>
            <b>
                {{experience.jobTitle}}:
              </b> {{experience.organization}}
              <span v-if="experience.locationName">
                [{{experience.locationName}}, {{experience.locationUnitName}}]
              </span>
          </p>
          <p>
            <b>პერიოდი: </b>
            {{experience.startMonth}}/{{experience.startYear}} -
            <span v-if="experience.endYear && experience.endMonth">{{experience.endMonth}}/{{experience.endYear}}</span>
            <span v-else>დღემდე</span>
          </p>

        </div>
        <div class="right-float">
          <b-btn @click="show(experience)">რედაქტირება</b-btn>
          <b-btn @click="deleteExperience(experience.id)">წაშლა</b-btn>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-card>

  <div class="experience-modal">
    <b-modal ref="experienceModal" ok-title="შენახვა" cancel-title="დახურვა" @ok="submit" @hide="onHide">
      <b-form-group label="პოზიცია">
        <b-form-input v-model="currentExperience.jobTitle" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="ორგანიზაცია">
        <b-form-input v-model="currentExperience.organization" type="text"></b-form-input>
      </b-form-group>
      <b-form-checkbox v-model="currentExperience.locationIsInGeorgia">
        ორგანიზაცია საქართველოშია
      </b-form-checkbox>
      <div v-if="currentExperience.locationIsInGeorgia">
        <label>
          <b>რეგიონი & რაიონი</b>
        </label>
        <locations v-if="locationList.length>0"
            :locations="locationList"
            :currentLocationName="currentExperience.locationName"
            :currentLocationUnitName="currentExperience.locationUnitName"
            @onLocationChanged="onLocationChanged">
        </locations>
        <b-form-group label="მისამართი">
          <b-form-input v-model="currentExperience.additionalAddressInfo" type="text"></b-form-input>
        </b-form-group>
      </div>
      <div class="monthPeriod">
        <label>დასაწყისი</label>
        <month-period
          :month="currentExperience.startMonth"
          :year="currentExperience.startYear"
          @month="onStartMonthChange"
          @year="onStartYearChange">
        </month-period>
      </div>
      <div class="monthPeriod" v-if="!workNow">
        <label>დასასრული</label>
        <month-period
          :month="currentExperience.endMonth"
          :year="currentExperience.endYear"
          @month="onEndMonthChange"
          @year="onEndYearChange">
        </month-period>
      </div>
      <b-form-checkbox v-model="workNow">
        ახლაც აქ ვმუშაობ
      </b-form-checkbox>

    </b-modal>
  </div>
</div>
</template>

<script>
import locations from '../common/locations'
import monthPeriod from '../common/month-period'
import utils from '../../utils'
import libs from '../../libs'

const baseUrl = '/api/users/profile/experiences'
const headers = {
  username: 'test'
} // temporary headers until um is written

export default {
  name: 'experiences',
  data: () => ({
    experiences: [],
    currentExperience: {},
    workNow: true,
    locationList: [],
    experienceToSubmit: {}
  }),
  async created() {
    this.currentExperience = this.experienceStartState()

    let response = await this.$http.get(baseUrl, {
      headers
    })

    this.experiences = response.data

    this.locationList = await libs.fetchLocationsOfGeorgia()
  },
  methods: {
    experienceStartState() {
      return {
        startMonth: null,
        startYear: null,
        endMonth: null,
        endYear: null,
        locationIsInGeorgia: true,
        locationName: null,
        locationUnitName: null
      }
    },
    keyOfObject(obj) {
      let objString = JSON.stringify(obj)
      return utils.hashOfString(objString)
    },
    onLocationChanged(location) {
      this.currentExperience.locationName = location.locationName
      this.currentExperience.locationUnitName = location.locationUnitName
    },
    onStartMonthChange(value) {
      this.currentExperience = Object.assign(this.currentExperience, {startMonth: value})
    },
    onStartYearChange(value) {
      this.currentExperience = Object.assign(this.currentExperience, {startYear: value})
    },
    onEndMonthChange(value) {
      this.currentExperience = Object.assign(this.currentExperience, {endMonth: value})
    },
    onEndYearChange(value) {
      this.currentExperience = Object.assign(this.currentExperience, {endYear: value})
    },
    show(experience) {
      this.currentExperience = Object.assign({}, experience)

      if (utils.isNullOrUndefined(this.currentExperience.endMonth) &&
        utils.isNullOrUndefined(this.currentExperience.endYear)) this.workNow = true
      else {
        this.workNow = false
      }

      this.$refs.experienceModal.show()
    },
    hide() {
      this.$refs.experienceModal.hide()
    },
    submit() {
      this.experienceToSubmit = this.currentExperience

      if (this.experienceToSubmit.id) {
        return this.editExperience()
      }

      this.addExperience()
    },
    onHide() {
      this.currentExperience = this.experienceStartState()
    },
    async addExperience() {
      let response = await this.$http.post(baseUrl, this.experienceToSubmit, {headers})

      this.experienceToSubmit.id = response.data

      this.experiences.push(this.experienceToSubmit)

      this.experienceToSubmit = {}
    },
    async editExperience() {
      let url = baseUrl + '/' + this.experienceToSubmit.id

      await this.$http.put(url, this.experienceToSubmit, {headers})

      let expToEdit = this.experiences.find(item => item.id === this.experienceToSubmit.id)

      Object.assign(expToEdit, this.experienceToSubmit)

      this.experienceToSubmit = {}
    },
    async deleteExperience(id) {
      let url = baseUrl + '/' + id

      await this.$http.delete(url, {headers})

      let index = this.experiences.findIndex(item => item.id === id)

      this.experiences.splice(index, 1)
    }
  },
  components: {
    'locations': locations,
    'month-period': monthPeriod
  }
}
</script>

<style scoped>
p {
  text-align: left;
}

.right-float {
  float: right
}

.right-clear {
  clear: right;
}

.card {
  background: whitesmoke;
}

.card-title {
  background-color: darkslategray;
  color: whitesmoke;
  border: solid darkslategray 10px;
  border-radius: 15px;
}

.list-group-item {
  border-bottom: solid darkseagreen;
}

#H1_AjDwHf {
  background-color: red;
}
</style>
