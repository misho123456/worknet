<template>
<div class="experiences">
  <b-card title="გამოცდილება">
    <b-btn class="right-float">დამატება</b-btn>
    <b-list-group class="right-clear">
      <b-list-group-item v-for="experience in experiences" :key="keyOfObject(experience)">

        <div>
          <p>
            <b>
                {{experience.jobTitle}}:
              </b> {{experience.organization}} [{{experience.locationName}}, {{experience.locationUnitName}}]
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
import utils from '../../utils'

const baseUrl = '/api/users/profile/experiences'
const headers = {
  username: 'test'
} // temporary headers until um is written

export default {
  name: 'experiences',
  data: () => ({
    experiences: []
  }),
  async created() {
    let response = await this.$http.get(baseUrl, {
      headers
    })

    this.experiences = response.data
  },
  methods: {
    keyOfObject(obj) {
      let objString = JSON.stringify(obj)
      return utils.hashOfString(objString)
    }
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
</style>
