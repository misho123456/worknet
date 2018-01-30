<template>
  <div class="autocomplete">
    <slot name="input" :onInput="onInput"
      @keydown.enter.native='enter'
      @keydown.down.native='down'
      @keydown.up.native='up'>
      <b-form-input type="text" autocomplete="off"
        :value="inputValue"
        @input="onInput">
      </b-form-input>
    </slot>
    <b-list-group v-if="openSuggestion" class="autocomplete-list">
      <b-list-group-item v-for="(item, index) in autocompleteSkills" :active="isActive(index)" @click="suggestionClick(index)" :key="item">
        <slot name="list-item" :item="item">
          {{ item }}
        </slot>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'autocomplete',
  props: {
    list: {required: true},
    value: {},
    minimumChars: {
      type: Number,
      default: 2
    }
  },
  data: () => ({
    open: false,
    current: 0,
    inputValue: ''
  }),
  methods: {
    onInput(value) {
      this.inputValue = value

      this.$emit('input', this.inputValue)

      if (this.open === false) {
        this.open = true
        this.current = 0
      }
    },
    up() {
      if (this.current > 0) {
        this.current--
      }
    },
    down() {
      if (this.current < this.list.length - 1) {
        this.current++
      }
    },
    isActive(index) {
      return index === this.current
    },
    suggestionClick(index) {
      this.open = false

      this.inputValue = this.list[index]

      this.$emit('input', this.inputValue)
    },
    enter() {
      this.opne = false

      this.inputValue = this.list[this.current]

      this.$emit('input', this.inputValue)
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    }
  },
  computed: {
    openSuggestion () {
      return this.inputValue.length >= this.minimumChars &&
        this.list.length !== 0 &&
        this.open === true
    }
  }
}
</script>

<style scoped>
.autocomplete-list {
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  z-index: 10;
}
</style>
