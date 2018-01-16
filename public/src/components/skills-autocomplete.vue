<template>
<div style="position:relative" :class="{'open':openSuggestion}">
  <input class="form-control" type="text"
    :value="value"
    @input="updateValue"
    @keydown.enter='enter'
    @keydown.down='down'
    @keydown.up='up'>
  <ul class="dropdown-menu" style="width:100%">
    <li v-for="(suggestion, index) in matches" :class="{'active': isActive(index)}" @click="suggestionClick(index)">
      <a href="#">{{ suggestion }}</a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'skills-autocomplete',
  props: {
    value: {
      type: String,
      required: true
    },
    suggestions: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    open: false,
    current: 0
  }),
  methods: {
    methodName() {

    }
  },
  computed: {

  }
}
</script>

<style scoped>
</style>
