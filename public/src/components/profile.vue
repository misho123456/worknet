<template>
  <div>

    <b-card :title="profileTitle">
      <div>
        <img src="https://placekitten.com/500/350" alt="seeker" class="rounded-circle profile-picture">
      </div>
      <div>
        <p>
          <b>დაბადების თარიღი:</b> {{myProfile.birthDate}}</p>
        <p>
          <b>რეგისტრაციის მისამართი:</b> {{registrationAddress}}</p>
        <p>
          <b>ფაქტიური მისამართი:</b> {{factAddress}}</p>
        <p>
          <b>ტელეფონი:</b> {{myProfile.mobileNumber}}</p>
        <p>
          <b>ელ-ფოსტა:</b> {{myProfile.email}}</p>
        <p>
          <b>დამატებითი საკონტაქტო:</b> {{myProfile.contactDescription}}</p>
        <b-btn>პირადი ინფორმაციის რედაქტირება</b-btn>
      </div>
    </b-card>

    <b-card title="უნარები">
      <skills :editable="true" :list="skillList" @onAddNewSkill="onAddNewSkill" @onRemoveSkill="onRemoveSkill"></skills>
    </b-card>

    <b-card title="განათლება">
      <p>
        <b>ფორმალური განათლების დონე: </b>{{myProfile.formalEducationLevelName}}
      </p>
      <b-btn class="right-float">დამატება</b-btn>
      <b-list-group class="right-clear">
        <b-list-group-item v-for="edu in myProfile.educations" :key="keyOfObject(edu)">

          <div>
            <p>
              <b>
                {{edu.educationType}}({{edu.educationLevel}}):
              </b>
              {{edu.institution}} [{{edu.locationName}}, {{edu.locationUnitName}}]
            </p>
            <p>
              <b>მიმართულება: </b>{{edu.directionName}}</p>
            <p>
              <b>პერიოდი: </b>{{edu.startMonth}}/{{edu.startYear}} - {{edu.endMonth}}/{{edu.endYear}}</p>
          </div>
          <div class="right-float">
            <b-btn>რედაქტირება</b-btn>
            <b-btn>წაშლა</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>


    <b-card title="გამოცდილება">
      <b-btn class="right-float">დამატება</b-btn>
      <b-list-group class="right-clear">
        <b-list-group-item v-for="experience in myProfile.jobExperiences" :key="keyOfObject(experience)">

          <div>
            <p>
              <b>
                {{experience.jobTitle}}:
              </b>
              {{experience.organization}} [{{experience.locationName}}, {{experience.locationUnitName}}]
            </p>
            <p>
              <b>პერიოდი: </b>{{experience.startMonth}}/{{experience.startYear}} - {{experience.endMonth}}/{{experience.endYear}}
            </p>

          </div>
          <div class="right-float">
            <b-btn>რედაქტირება</b-btn>
            <b-btn>წაშლა</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>

  </div>

</template>

<script>
  import skills from './skills'
  import utils from '../utils'

  export default {
    name: 'profile',
    data() {
      return {
        msg: 'profile page',
        myProfile: {
          'firstName': 'სახელი',
          'lastName': 'გვარი',
          'personalId': '00000000000',
          'birthDate': '1991-01-11T00:00:00',
          'genderName': 'მამრობითი',
          'registrationRegionName': 'აჭარა',
          'registrationLocationName': 'ბათუმი',
          'registrationAddressDescription': 'საქართველო, ქალაქი ბათუმი, პეტრე მელიქიშვილის ქუჩა, N 91, ბინა 43',
          'factRegionName': 'თბილისი',
          'factLocationName': 'ისანი',
          'factAddressDescription': 'დიდი დიღომი 2 ნაბიჯთან',
          'mobileNumber': '591000000',
          'email': 'TTT@gmail.com',
          'contactDescription': 'დამატებითი საკონტაქტო ინფორმაცია ბლაბლა',
          'educations': [
            {
              'educationType': 'უმაღლესი განათლება',
              'educationLevel': 'ბაკალავრი',
              'institution': '       გორკის    სახ. აფხაზეთის სახელმწიფო უნივერსიტეტი',
              'locationIsInGeorgia': true,
              'locationName': 'თბილისი',
              'locationUnitName': 'ისანი',
              'additionalAddressInfo': 'სასწავლებელზე დამატებითი ინფორმაცია',
              'startMonth': 1,
              'startYear': 2011,
              'endMonth': 5,
              'endYear': 2015,
              'directionName': 'ბიზნესის ადმინისტრირება'
            }
          ],
          'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
          'formalEducationLevelId': '3',
          'languages': [
            {
              'languageName': 'აფხაზური',
              'languageLevel': 'არ ვფლობ'
            },
            {
              'languageName': 'ქართული',
              'languageLevel': 'თავისუფლად'
            }
          ],
          'skills': [
            {
              'skillName': 'Javascript',
              'endorsements': 0,
              'users': [
                'user_id1',
                'user_id2',
                'user_id3'
              ]
            },
            {
              'skillName': 'CSS',
              'endorsements': 0,
              'users': [
                'user_id1',
                'user_id2',
                'user_id3'
              ]
            }
          ],
          'jobExperiences': [
            {
              'jobTitle': 'js developer',
              'organization': 'შ.პ.ს. დელფოს გრუპი',
              'description': 'სრული და ვრცეეელი  აღწერა',
              'locationIsInGeorgia': true,
              'locationName': 'თბილისი',
              'locationUnitName': 'ისანი',
              'additionalAddressInfo': 'სამსახურზე დამატებითი ინფორმაცია',
              'startMonth': 1,
              'startYear': 2012,
              'endMonth': 2,
              'endYear': 2015,
              'hasDocument': true
            },
            {
              'jobTitle': 'მცხობელი მზარეული',
              'organization': 'შ.პ.ს. მაქს-ფუდი',
              'locationIsInGeorgia': false,
              'locationName': 'თბილისი',
              'locationUnitName': 'ისანი',
              'additionalAddressInfo': 'ხელიაქვს აუუფ',
              'startMonth': 1,
              'startYear': 2013,
              'endMonth': 2,
              'endYear': 2016,
              'hasDocument': false
            }
          ],
          'hasDrivingLicence': true,
          'drivingLicenceA': true,
          'drivingLicenceB': true,
          'drivingLicenceC': true,
          'drivingLicenceD': true,
          'drivingLicenceE': true,
          'drivingLicenceT1': true,
          'drivingLicenceT2': true,
          'airLicence': true,
          'seaLicence': true,
          'railwayLicence': true,
          'militaryObligation': false,
          'desirableJobs': [
            {
              'name': 'მთავარი მზარეულები '
            },
            {
              'name': 'ფინანსთა მენეჯერები'
            },
            {
              'name': 'საინფორმაციო ტექნოლოგიის ტრენერები'
            },
            {
              'name': 'პროგრამული უზრუნველყოფის შემუშავება-განვითარების სპეციალისტები'
            }
          ],
          'desirableJobLocations': [
            {
              'locationName': 'თბილისი',
              'locationUnitName': 'ისანი'
            },
            {
              'locationName': 'თბილისი',
              'locationUnitName': 'ვაკე'
            }
          ],
          'desirableTrainings': [
            {
              'trainigName': 'კომპიუტერული პროგრამები და ბუღალტერია',
              'locationName': 'თბილისი',
              'locationUnitName': 'ვაკე'
            },
            {
              'trainigName': ' კულინარია, მზარეული',
              'locationName': 'თბილისი',
              'locationUnitName': 'ვაკე'
            }
          ],
          'desirableSalary': 5000,
          'fullTime': true,
          'partTime': true,
          'shiftBased': true,
          'interestedInInternship': true,
          'interestedToBeVolunteer': true,
          'interestedInTemporaryJob': true,
          'interestedInDangerousJob': true,
          'interestedInTraining': true,
          'unemployed': false,
          'useMediationService': true
        }
      }
    },
    computed: {
      profileTitle() {
        return `${this.myProfile.firstName} ${this.myProfile.lastName} - ${this.myProfile.personalId}`
      },
      registrationAddress() {
        return `${this.myProfile.registrationRegionName} ${this.myProfile.registrationLocationName} - ${this.myProfile.registrationAddressDescription}`
      },
      factAddress() {
        return `${this.myProfile.factRegionName} ${this.myProfile.factLocationName} - ${this.myProfile.factAddressDescription}`
      },
      skillList() {
        return this.myProfile.skills.map(t => t.skillName)
      }
    },
    methods: {
      onAddNewSkill(skill) {
        let indexOfSkill = this.myProfile.skills.findIndex(t => t.skillName.toLowerCase() === skill.toLowerCase())
        if (indexOfSkill !== -1) {
          // TODO alert or notify
          console.log('this skill already exists')
          return
        }
        this.myProfile.skills.push({ skillName: skill })
      },
      onRemoveSkill(skill) {
        let indexOfSkill = this.myProfile.skills.findIndex(t => t.skillName === skill)
        if (indexOfSkill === -1) {
          // TODO alert or notify
          console.log('can\'t find index of skill')
          return
        }
        this.myProfile.skills.splice(indexOfSkill, 1)
      },
      keyOfObject(obj) {
        let objString = JSON.stringify(obj)
        return utils.hashOfString(objString)
      }
    },
    components: { 'skills': skills }
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


  .profile-picture {
    width: 200px;
    height: 200px;
  }

  .education-list {
    clear: right;
  }
</style>
