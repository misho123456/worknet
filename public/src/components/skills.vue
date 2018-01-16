<template>
  <div>
    <div class="skills-container">
      <div style="position:relative">
        <b-input-group v-if="editable">
          <b-form-input type="text"
          placeholder="მაგ. ანალიტიკოსი"
          :value="newSkill"
          @input="onInput"
          @keyup.enter.native="addSkill(newSkill)"
          @keydown.enter.native='enter'
          @keydown.down.native='down'
          @keydown.up.native='up'></b-form-input>
          <b-input-group-button slot="right">
            <b-btn @click="addSkill(newSkill)">დამატება</b-btn>
          </b-input-group-button>
        </b-input-group>
        <b-list-group v-if="openSuggestion">
          <b-list-group-item v-for="(skill, index) in autocompleteSkills" :active="isActive(index)" @click="suggestionClick(index)">
            {{ skill }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="chip" v-for="item in list">
        {{item}}
        <span v-if="editable" class="closebtn" @click="removeSkill(item)">&times;</span>
      </div>
    </div>
  </div>


</template>

<script>
  const minimumChars = 2
  const searchUrl = '/api/skills/search'

  export default {
    name: 'skills',
    props: ['list', 'editable'],
    data() {
      return {
        newSkill: '',
        autocompleteSkills: [],
        open: false,
        current: 0
      }
    },
    methods: {
      addSkill(skill) {
        this.$emit('onAddNewSkill', skill)
      },
      removeSkill(skill) {
        this.$emit('onRemoveSkill', skill)
      },
      clear() {
        this.newSkill = ''
      },
      enter() {
        this.open = false

        this.newSkill = this.autocompleteSkills[this.current]
      },
      up() {
        if (this.current > 0) {
          this.current--
        }
      },
      down() {
        if (this.current < this.autocompleteSkills.length - 1) {
          this.current++
        }
      },
      isActive(index) {
        return index === this.current
      },
      suggestionClick(index) {
        this.open = false

        this.newSkill = this.autocompleteSkills[this.current]
      },
      async onInput(value) {
        this.newSkill = value

        if (value.length < minimumChars) return

        let {data} = await this.$http.get(searchUrl, {params: {query: value}})

        this.autocompleteSkills = data
        console.log(data);

        if (this.open === false) {
          this.open = true
          this.current = 0
        }
      }
    },
    computed: {
      openSuggestion () {
        return this.newSkill.length >= minimumChars &&
          this.autocompleteSkills.length !== 0 &&
          this.open === true
      }
    }
  }
</script>

<style scoped>
  .chip {
    display: inline-block;
    padding: 0 25px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-radius: 25px;
    background-color: gold;
    margin: 5px;
  }

  .closebtn {
    padding-left: 10px;
    color: #888;
    font-weight: bold;
    float: right;
    font-size: 20px;
    cursor: pointer;
  }

  .closebtn:hover {
    color: #000;
  }
</style>
