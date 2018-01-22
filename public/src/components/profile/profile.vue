<template>
  <div>

    <maininfo></maininfo>

    <profile-skills></profile-skills>

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


    <experiences></experiences>

  </div>

</template>

<script>
  import maininfo from './maininfo'
  import profileSkills from './profile-skills'
  import utils from '../../utils'
  import experiences from './experiences'

  const baseUrl = '/api/users/profile'
  const headers = {
    username: 'test'
  } // temporary headers until um is written

  export default {
    name: 'profile',
    data() {
      return {
        msg: 'profile page',
        myProfile: {}
      }
    },
    created() {
      this.$http.get(baseUrl, {headers})
        .then(response => {
          this.myProfile = response.data
        })
    },
    methods: {
      keyOfObject(obj) {
        let objString = JSON.stringify(obj)
        return utils.hashOfString(objString)
      }
    },
    components: {
      'maininfo': maininfo,
      'profile-skills': profileSkills,
      'experiences': experiences
    }
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
