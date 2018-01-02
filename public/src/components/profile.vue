<template>
  <div>
    <h2>{{msg}}</h2>
    <ul>
      <li v-for="item in skillList">{{item}}</li>
    </ul>
    <skills :editable="true" :list="skillList" @onAddNewSkill="onAddNewSkill" @onRemoveSkill="onRemoveSkill"></skills>



  </div>

</template>

<script>
  import skills from './skills'

  export default {
    name: 'profile',
    data() {
      return {
        msg: 'profile page',
        skillList: ['javascript', 'nodejs', 'css', 'etc']
      }
    },
    methods: {
      onAddNewSkill(skill) {
        let indexOfSkill = this.skillList.indexOf(skill)
        if (indexOfSkill !== -1) {
          // TODO alert or notify
          console.log('this skill already exists')
          return
        }
        this.skillList.push(skill)
      },
      onRemoveSkill(skill) {
        let indexOfSkill = this.skillList.indexOf(skill)
        if (indexOfSkill === -1) {
          // TODO alert or notify
          console.log('can\'t find index of skill')
          return
        }
        this.skillList.splice(indexOfSkill, 1)
      }
    },
    components: { 'skills': skills }
  }
</script>


<style scoped>
</style>
