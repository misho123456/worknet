<template>
  <div>
    <maininfo></maininfo>

    <profile-skills></profile-skills>

    <educations></educations>

    <experiences></experiences>

    <desirable-jobs/>

    <languages></languages>
  </div>
</template>

<script>
  import maininfo from './maininfo'
  import profileSkills from './profile-skills'
  import utils from '../../utils'
  import experiences from './experiences'
  import educations from './educations'
  import desirableJobs from './desirable-jobs'
  import languages from './languages'

  const baseUrl = '/api/users/profile'

  export default {
    name: 'profile',
    data() {
      return {
        msg: 'profile page',
        myProfile: {}
      }
    },
    created() {
      this.$http.get(baseUrl, {headers: utils.getHeaders()})
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
      'experiences': experiences,
      'educations': educations,
      'desirable-jobs': desirableJobs,
      'languages': languages
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
