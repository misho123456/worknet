<template>
<div class="searchArea">
  <div class="form-group flex" @keyup.enter="onSearchClick">
    <input type="text" class="form-control" v-model="query">
  </div>
  &nbsp;
  <b-button class="searchButton" variant="primary" size="" @click="onSearchClick">
    <i class="fa fa-search fa-2x" aria-hidden="true"></i>
  </b-button>
</div>
</template>

<script>
export default {
  name: 'search-area',
  props: ['query'],
  data: () => ({

  }),
  methods: {
    onSearchClick() {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style scoped>
.searchArea {
  display: flex;
  flex-direction: row;
  width: 60%;
  margin: auto;
  padding: 20px;
  vertical-align: center;
}

.form-group {
  margin-top: 16px;
}

.searchButton {
  border-radius: 50%;
  margin: 16px;
  margin-top: 9px;
  margin-bottom: 9px;
}

.flex {
  flex: 1;
}
</style>
