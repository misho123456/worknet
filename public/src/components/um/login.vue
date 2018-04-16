<template>
  <div class="login">
    <b-form-group label="მომხმარებლის სახელი">
       <b-form-input v-model="userName"
                    type="text"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="პაროლი">
       <b-form-input v-model="password"
                    type="text"
      ></b-form-input>
    </b-form-group>
    <b-button variant="primary" @click="login">
      შესვლა
    </b-button>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'login',
  data: () => ({
    userName: '',
    password: ''
  }),
  methods: {
    async login() {
      let response = await this.$http.post('/um/login', {
        userName: this.userName,
        password: this.password
      })

      Cookies.set('token', response.data)

      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped>
</style>
