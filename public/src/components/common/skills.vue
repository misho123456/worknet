<template>
  <div>
    <div class="skills-container">
      <div style="position:relative">
        <autocomplete :value="newSkill" :list="autocompleteSkills" @input="onAutocompleteInput" @enter="addSkill(newSkill)">
          <div slot="input" slot-scope="{onInput, inputValue}">
            <b-input-group v-if="editable">
              <b-form-input type="text"
                autocomplete="off"
                placeholder="მაგ. ანალიტიკოსი"
                :value="inputValue"
                @input="onInput">
              </b-form-input>
              <b-input-group-button slot="right">
                <b-btn @click="addSkill(newSkill)">დამატება</b-btn>
              </b-input-group-button>
            </b-input-group>
          </div>
        </autocomplete>
      </div>
      <div class="chip" v-for="item in list">
        {{item}}
        <span v-if="editable" class="closebtn" @click="removeSkill(item)">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import autocomplete from './autocomplete'

  const minimumChars = 2
  const searchUrl = '/api/skills/search'

  export default {
    name: 'skills',
    props: ['list', 'editable'],
    data() {
      return {
        newSkill: '',
        autocompleteSkills: []
      }
    },
    methods: {
      addSkill() {
        if (!this.newSkill) return

        this.$emit('onAddNewSkill', this.newSkill)
      },
      removeSkill(skill) {
        this.$emit('onRemoveSkill', skill)
      },
      clear() {
        this.newSkill = ''
      },
      async onAutocompleteInput(value) {
        if (this.newSkill === value) return

        this.newSkill = value

        if (value.length < minimumChars) return

        let {data} = await this.$http.get(searchUrl, {params: {query: value}})

        this.autocompleteSkills = data || []
      }
    },
    components: {
      autocomplete
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
