<template>
<div class="desirable-jobs">
  <b-card title="სასურველი სამსახური">
    <skills ref="skillInput" :editable="true" :list="skillList" @onAddNewSkill="onAddNewSkill" @onRemoveSkill="onRemoveSkill"></skills>
  </b-card>
</div>
</template>

<script>
import skills from '../common/skills'
import { bus } from '../common/bus'
import utils from '../../utils'

const baseUrl = '/api/users/profile/skills'

export default {
  name: 'desirable-jobs',
  data: () => ({
    skills: []
  }),
  async created() {
    try {
      let response = await this.$http.get(baseUrl, {headers: utils.getHeaders()})

      this.skills = response.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    async onAddNewSkill(skill) {
      let indexOfSkill = this.skills.findIndex(t => t.skillName.toLowerCase() === skill.toLowerCase())
      if (indexOfSkill !== -1) {
        // TODO alert or notify
        console.error('this skill already exists')
        return
      }

      let skillObject = {
        skillName: skill
      }

      try {
        await this.$http.post(baseUrl, skillObject, {
          headers: utils.getHeaders()
        })

        this.skills.push(skillObject)
        this.$refs.skillInput.clear()
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async onRemoveSkill(skill) {
      let indexOfSkill = this.skills.findIndex(t => t.skillName === skill)
      if (indexOfSkill === -1) {
        // TODO alert or notify
        console.error('can\'t find index of skill')
        return
      }

      try {
        const url = baseUrl + `/${skill}`

        await this.$http.delete(url, {
          headers: utils.getHeaders()
        })

        this.skills.splice(indexOfSkill, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    }
  },
  computed: {
    skillList() {
      return this.skills.map(item => item.skillName)
    }
  },
  components: {
    skills
  }
}
</script>

<style scoped>
</style>
