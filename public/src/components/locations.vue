<template>
  <div class="container">
    <div class="row">
      <b-form-select v-model="selectedLocationName" :options="locationsList" value-field="locationName" text-field="locationName"
        @input="locationChanged" class="mb-3 col-6">
        <template slot="first">
          <option :value="null">- აირჩიე რეგიონი -</option>
        </template>
      </b-form-select>
      <b-form-select v-model="selectedLocationUnitName" :options="selectedLocation.units" value-field="locationUnitName" text-field="locationUnitName"
        @input="locationUnitChanged" class="mb-3 col-6">
        <template slot="first">
          <option :value="null">- აირჩიე რაიონი -</option>
        </template>
      </b-form-select>
    </div>
  </div>
</template>

<script>
  /**
   * კომპონენტი მისამართისთვის (რეგიონი & რაიონი) location , unit
   * გადაწოდებულ მისამართების მასივს (locations) უნდა ქონდეს შემდეგი სტრუქტურა
   * locationsList: [
          {
            locationName: 'თბილისი',
            units: [
              { locationUnitName: 'ვაკე' },
              { locationUnitName: 'ისანი' }
            ]
          }
        ]
  */

  export default {
    name: 'locations',
    props: ['locations', 'editable', 'currentLocationName', 'currentLocationUnitName'],
    data() {
      return {
        selectedLocationName: '',
        selectedLocationUnitName: '',
        selectedLocation: {},
        locationsList: [
          {
            locationName: 'თბილისი',
            units: [
              { locationUnitName: 'ვაკე' },
              { locationUnitName: 'ისანი' },
              { locationUnitName: 'კრწანისი' },
              { locationUnitName: 'მთაწმინდა' },
              { locationUnitName: 'გლდანი' },
              { locationUnitName: 'დიდუბე' },
              { locationUnitName: 'ნაძალადევი' },
              { locationUnitName: 'ჩუღურეთი' },
              { locationUnitName: 'საბურთალო' },
              { locationUnitName: 'სამგორი' }
            ]
          },
          { locationName: 'გურიის', units: [{ locationUnitName: '' }] },
          { locationName: 'რაჭა-ლეჩხუმისა და ქვემო სვანეთის', units: [{ locationUnitName: '' }] },
          { locationName: 'კახეთის', units: [{ locationUnitName: '' }] },
          { locationName: 'იმერეთის', units: [{ locationUnitName: '' }] },
          { locationName: 'მცხეთა-მთიანეთის  ', units: [{ locationUnitName: '' }] },
          { locationName: 'სამეგრელო-ზემო სვანეთის', units: [{ locationUnitName: '' }] },
          { locationName: 'სამცხე-ჯავახეთის ', units: [{ locationUnitName: '' }] },
          { locationName: 'ქვემო ქართლის ', units: [{ locationUnitName: '' }] },
          { locationName: 'შიდა ქართლის ', units: [{ locationUnitName: '' }] },
          { locationName: 'აჭარის ავტონომიური რესპუბლიკა', units: [{ locationUnitName: '' }] },
          { locationName: 'აფხაზეთი`', units: [{ locationUnitName: '' }] },
          { locationName: 'თბილისი', units: [{ locationUnitName: '' }] }
        ]
      }
    },
    created() {
      this.locationChanged(this.currentLocationName)
      this.selectedLocationName = this.currentLocationName
      this.selectedLocationUnitName = this.currentLocationUnitName
    },
    methods: {
      locationChanged(locationName) {
        let location = this.locationsList.find(t => t.locationName === locationName)
        if (location === undefined) {
          this.selectedLocation = {}
          this.selectedLocationUnitName = null
          return
        }
        this.selectedLocation = location
      },
      locationUnitChanged(unitName) {
        this.$emit('onLocationChanged', {
          locationName: this.selectedLocationName,
          locationUnitName: this.selectedLocationUnitName
        })
      }
    }
  }
</script>

<style scoped>
</style>
