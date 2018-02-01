<template>
  <div class="educations">
    <b-card title="განათლება">
      <p>
        <b>ფორმალური განათლების დონე: </b>{{formalEducationLevelName}}
      </p>
      <b-btn class="right-float" @click="show(currentEducation)">დამატება</b-btn>
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
            <b-btn @click="show(edu)">რედაქტირება</b-btn>
            <b-btn @click="deleteEducation(edu.id)">წაშლა</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-modal ref="educationModal" ok-title="შენახვა" cancel-title="დახურვა" @ok="submit" @hide="onHide">
      <b-form-group label="განათლების ტიპი">
        <b-form-select v-model="currentEducation.educationType" class="mb-3">
          <option v-for="type in educationTypes">{{type}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="ხარისხი" v-if="showEducationLevelSelect">
        <b-form-select v-model="currentEducation.educationLevel" class="mb-3">
          <option v-for="level in educationLevels">{{level}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="სასწავლებელი" v-if="showOfficialEducationFields">
         <b-form-input v-model="currentEducation.institution" type="text">
         </b-form-input>
      </b-form-group>
      <b-form-group label="მიმართულება">
         <b-form-input v-model="currentEducation.directionName" type="text">
         </b-form-input>
      </b-form-group>
      <b-form-checkbox v-model="currentEducation.locationIsInGeorgia" v-if="showOfficialEducationFields">
        სასწავლებელი საქართველოშია
      </b-form-checkbox>
      <div v-if="currentEducation.locationIsInGeorgia && showOfficialEducationFields">
        <label>
          <b>რეგიონი & რაიონი</b>
        </label>
        <locations v-if="locationList.length>0"
            :locations="locationList"
            :currentLocationName="currentEducation.locationName"
            :currentLocationUnitName="currentEducation.locationUnitName"
            @onLocationChanged="onLocationChanged">
        </locations>
      </div>
      <b-form-group label="მისამართი" v-if="showOfficialEducationFields">
        <b-form-input v-model="currentEducation.additionalAddressInfo" type="text"></b-form-input>
      </b-form-group>
      <div v-if="showOfficialEducationFields">
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
      </div>

    </b-modal>
  </div>
</template>

<script>
import monthPeriod from '../common/month-period'
import locations from '../common/locations'
import { bus } from '../common/bus'
import libs from '../../libs'
import utils from '../../utils'

const baseUrl = 'api/users/profile/educations'
const headers = {
  username: 'test'
} // temporary headers until um is written
const academicEducationType = 'უმაღლესი განათლება'
const informalEducationType = 'არაფორმალური განათლება'

export default {
  name: 'educations',
  data: () => ({
    formalEducationLevelName: 'უმაღლესი - ბაკალავრი',
    educations: [],
    currentEducation: {},
    stillLearning: false,
    educationTypes: [],
    educationLevels: [],
    locationList: [],
    educationToSubmit: {}
  }),
  async created() {
    try {
      let [
        response,
        locations,
        types,
        levels
      ] = await Promise.all([
        this.$http.get(baseUrl, {headers}),
        libs.fetchLocationsOfGeorgia(),
        libs.fetchEducationTypes(),
        libs.fetchEducationLevels()
      ])

      this.educations = response.data
      this.locationList = locations
      this.educationTypes = types
      this.educationLevels = levels
    } catch (error) {
      bus.$emit('error', error)
    }

    this.currentEducation = this.educationStartState()
  },
  methods: {
    educationStartState() {
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
    show(education) {
      this.currentEducation = Object.assign({}, education)

      if (utils.isNullOrUndefined(this.currentEducation.endMonth) &&
        utils.isNullOrUndefined(this.currentEducation.endYear)) this.stillLearning = true
      else {
        this.stillLearning = false
      }

      this.$refs.educationModal.show()
    },
    submit() {
      this.educationToSubmit = this.currentEducation

      this.removeHiddenFields(this.educationToSubmit)

      if (this.educationToSubmit.id) {
        return this.editEducation()
      }

      this.addEducation()
    },
    onHide() {
      this.currentEducation = this.educationStartState()
    },
    async addEducation() {
      try {
        let response = await this.$http.post(
          baseUrl,
          this.educationToSubmit,
          {headers}
        )

        this.educationToSubmit.id = response.data

        this.educations.push(this.educationToSubmit)

        this.educationToSubmit = {}

        bus.$emit('success', 'განათლება წარმატებით დაემატა')
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async editEducation() {
      try {
        let url = baseUrl + '/' + this.educationToSubmit.id

        await this.$http.put(url, this.educationToSubmit, {headers})

        let index = this.educations.findIndex(
          item => item.id === this.educationToSubmit.id
        )

        this.educations[index] = this.educationToSubmit

        this.educationToSubmit = {}

        bus.$emit('success', 'განათლება წარმატებით შეიცვალა')
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async deleteEducation(id) {
      let url = baseUrl + '/' + id

      await this.$http.delete(url, {headers})

      let index = this.educations.findIndex(item => item.id === id)

      this.educations.splice(index, 1)

      bus.$emit('success', 'განათლება წარმატებით წაიშალა')
    },
    onStartMonthChange(value) {
      this.currentEducation.startMonth = value
    },
    onStartYearChange(value) {
      this.currentEducation.startYear = value
    },
    onEndMonthChange(value) {
      this.currentEducation.endMonth = value
    },
    onEndYearChange(value) {
      this.currentEducation.endYear = value
    },
    onLocationChanged(location) {
      this.currentEducation.locationName = location.locationName
      this.currentEducation.locationUnitName = location.locationUnitName
    },
    removeHiddenFields(education) {
      if (education.educationType === academicEducationType) return

      education.educationLevel = undefined

      if (education.educationType !== informalEducationType) return

      education.institution = undefined
      education.locationIsInGeorgia = undefined
      education.locationName = undefined
      education.locationUnitName = undefined
      education.additionalAddressInfo = undefined
      education.startMonth = undefined
      education.startYear = undefined
      education.endMonth = undefined
      education.endYear = undefined
    }
  },
  computed: {
    showEducationLevelSelect() {
      return this.currentEducation.educationType === academicEducationType
    },
    showOfficialEducationFields() {
      return this.currentEducation.educationType !== informalEducationType
    }
  },
  components: {
    'month-period': monthPeriod,
    'locations': locations
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

.period-present-text {
  padding-top: 1.375rem;
  margin-top: 3rem;
}
</style>
