<template>
  <div>
    <b-card :title="profileTitle">
      <div>
        <img src="https://placekitten.com/500/350" alt="seeker" class="rounded-circle profile-picture">
      </div>
      <div>
        <p>
          <b>დაბადების თარიღი:</b> {{profileData.birthDate}}</p>
        <p>
          <b>რეგისტრაციის მისამართი:</b> {{registrationAddress}}</p>
        <p>
          <b>ფაქტიური მისამართი:</b> {{factAddress}}</p>
        <p>
          <b>ტელეფონი:</b> {{profileData.mobileNumber}}</p>
        <p>
          <b>ელ-ფოსტა:</b> {{profileData.email}}</p>
        <p>
          <b>დამატებითი საკონტაქტო:</b> {{profileData.contactDescription}}</p>
        <b-btn v-b-modal.mainInfoModal>პირადი ინფორმაციის რედაქტირება</b-btn>
      </div>
      <b-modal id="mainInfoModal" title="პირადი ინფორმაცია" ok-title="შენახვა" cancel-title="დახურვა" @ok="tryToSaveMainInfo">
        <label>
          <b>რეგიონი & რაიონი</b>
        </label>
        <locations :currentLocationName="profileData.factLocationName" :currentLocationUnitName="profileData.factLocationUnitName" @onLocationChanged="onFactLocationChanged"></locations>

        <label>
          <b>მისამართი</b>
        </label>
        <b-form-input v-model="profileData.factAddressDescription" type="text" placeholder="მისამართი"></b-form-input>

        <label>
          <b>ელ-ფოსტა</b>
        </label>
        <b-form-input v-model="profileData.email" type="email" placeholder="ელ-ფოსტა"></b-form-input>

        <label>
          <b>ტელეფონი</b>
        </label>
        <b-form-input v-model="profileData.mobileNumber" type="text" placeholder="ტელეფონი"></b-form-input>

        <label>
          <b>დამატებითი საკონტაქტო</b>
        </label>
        <b-form-input v-model="profileData.contactDescription" type="text" placeholder="დამატებითი საკონტაქტო"></b-form-input>

      </b-modal>
    </b-card>
  </div>
</template>
<script>
  import locations from './locations'

  export default {
    name: 'maininfo',
    data() {
      return {
        updatedFactLocation: undefined,
        profileData: {
          'firstName': 'სახელი',
          'lastName': 'გვარი',
          'personalId': '00000000000',
          'birthDate': '1991-01-11T00:00:00',
          'genderName': 'მამრობითი',
          'registrationLocationName': 'აჭარა',
          'registrationLocationUnitName': 'ბათუმი',
          'registrationAddressDescription': 'საქართველო, ქალაქი ბათუმი, პეტრე მელიქიშვილის ქუჩა, N 91, ბინა 43',
          'factLocationName': 'თბილისი',
          'factLocationUnitName': 'ისანი',
          'factAddressDescription': 'დიდი დიღომი 2 ნაბიჯთან',
          'mobileNumber': '591000000',
          'email': 'TTT@gmail.com',
          'contactDescription': 'დამატებითი საკონტაქტო ინფორმაცია ბლაბლა'
        }
      }
    },
    computed: {
      profileTitle() {
        return `${this.profileData.firstName} ${this.profileData.lastName} - ${this.profileData.personalId}`
      },
      registrationAddress() {
        return `${this.profileData.registrationLocationName} ${this.profileData.registrationLocationUnitName} - ${this.profileData.registrationAddressDescription}`
      },
      factAddress() {
        return `${this.profileData.factLocationName} ${this.profileData.factLocationUnitName} - ${this.profileData.factAddressDescription}`
      }
    },
    methods: {
      onFactLocationChanged(location) {
        this.updatedFactLocation = location
      },
      tryToSaveMainInfo() {
        let updatedData = {
          locationName: this.profileData.factLocationName,
          locationUnitName: this.profileData.factLocationUnitName
        }
        if (this.updatedFactLocation !== undefined) {
          updatedData.locationName = this.updatedFactLocation.locationName
          updatedData.locationUnitName = this.updatedFactLocation.locationUnitName
        }

        // TODO call service to save data
      }
    },
    components: { 'locations': locations }
  }
</script>
<style scoped>
  label {
    text-align: left;
    width: 100%;
  }
</style>
