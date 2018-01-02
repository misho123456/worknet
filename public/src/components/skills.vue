<template>
  <div>
    <h2>skills component</h2>
    <div class="skills-container">
      <b-input-group v-if="editable">
        <b-form-input type="text" v-model="newSkill" placeholder="მაგ. ანალიტიკოსი"></b-form-input>
        <b-input-group-button slot="right">
          <b-btn @click="addSkill(newSkill)">დამატება</b-btn>
        </b-input-group-button>
      </b-input-group>
      <div class="chip" v-for="item in list">
        {{item}}
        <span v-if="editable" class="closebtn" @click="removeSkill(item)">&times;</span>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: 'skills',
    props: ['list', 'editable'],
    data() {
      return {
        newSkill: ''
      }
    },
    methods: {
      addSkill(skill) {
        this.$emit('onAddNewSkill', skill)
      },
      removeSkill(skill) {
        this.$emit('onRemoveSkill', skill)
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
