<template>
  <div class="toolbar">
    <b-button v-if="loggedIn" variant="primary" @click="logout">
      გასვლა
    </b-button>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import utils from '../utils'
import { bus } from './common/bus'

export default {
  name: 'toolbar',
  data: () => ({
    loggedIn: false
  }),
  created() {
    this.loggedIn = !!Cookies.get('token')

    bus.$on('login', () => {
      this.loggedIn = true
    })

    bus.$on('logout', () => {
      this.loggedIn = false
    })
  },
  methods: {
    logout() {
      Cookies.remove('token')

      this.loggedIn = false

      this.$router.push('/vacancies')
    }
  }
}
</script>

<style scoped>
.toolbar {
  background-color: blue;
}
</style>
