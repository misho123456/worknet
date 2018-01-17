<template>
  <div>

    <maininfo></maininfo>

    <b-card title="უნარები">
      <skills ref="skillInput" :editable="true" :list="skillList" @onAddNewSkill="onAddNewSkill" @onRemoveSkill="onRemoveSkill"></skills>
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
  import maininfo from './maininfo'
  import utils from '../utils'

  const baseUrl = '/api/users/profile'
  const headers = {
    username: 'test'
  } // temporary headers until um is written

  export default {
    name: 'profile',
    data() {
      return {
        msg: 'profile page',
        myProfile: {
          skills: []
        }
      }
    },
    created() {
      this.$http.get(baseUrl, {headers})
        .then(response => {
          this.myProfile = response.data
        })
    },
    computed: {
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
        let skillObject = { skillName: skill }
        this.$http.post(baseUrl + '/skills', skillObject, {headers})
          .then(() => {
            this.myProfile.skills.push(skillObject)
            this.$refs.skillInput.clear()
          })
      },
      onRemoveSkill(skill) {
        let indexOfSkill = this.myProfile.skills.findIndex(t => t.skillName === skill)
        if (indexOfSkill === -1) {
          // TODO alert or notify
          console.log('can\'t find index of skill')
          return
        }

        const url = baseUrl + `/skills/${skill}`

        this.$http.delete(url, {headers})
          .then(() => {
            this.myProfile.skills.splice(indexOfSkill, 1)
          })
      },
      keyOfObject(obj) {
        let objString = JSON.stringify(obj)
        return utils.hashOfString(objString)
      }
    },
    components: { 'skills': skills, 'maininfo': maininfo }
  }
</script>


<style>
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
