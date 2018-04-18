<template>
  <div>
    <b-card title="ენების ცოდნა">
      <div class="mb-4">
        <div style="position:relative">
          <autocomplete synchronous :value="newLanguage" :list="languagesSelect" @input="onAutocompleteInput" @enter="addLanguage(newLanguage)">
            <div slot="input" slot-scope="{onInput, inputValue}">
              <b-input-group>
                <b-form-input type="text"
                  autocomplete="off"
                  :value="inputValue"
                  @input="onInput">
                </b-form-input>
                <b-input-group-button slot="right">
                  <b-btn @click="addLanguage(newLanguage)">დამატება</b-btn>
                </b-input-group-button>
              </b-input-group>
            </div>
          </autocomplete>
        </div>
      </div>

      <language
        :language="language"
        @levelChange="onLevelChange(language, $event)"
        @delete="removeLanguage(language.languageName)"
        v-for="language in languages"
        :key="language.languageName">
      </language>

      <!-- <b-list-group class="right-clear">
        <b-list-group-item v-for="language in languages" :key="language.languageName">
          <b-row>
            <b-col cols="3">
              <h4 style="margin-top: 10%;">{{language.languageName}}: </h4>
            </b-col>
            <b-col cols="5">
              <b-form-group label="რა დონეზე ფლობთ?">
                <b-form-input v-model="language.languageLevel"
                  type="text"
                  placeholder="">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="right-float">
            <b-btn @click="removeLanguage(language.languageName)">წაშლა</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group> -->
    </b-card>
  </div>
</template>

<script>
import autocomplete from '../common/autocomplete'
import utils from '../../utils'
import { bus } from '../common/bus'
import language from './language'

const baseUrl = '/api/users/profile/languages'

export default {
  name: 'languages',
  data: () => ({
    languages: [],
    languagesSelect: [
      'ქართული',
      'ინგლისური',
      'რუსული',
      'ფრანგული',
      'გერმანული',
      'ესპანური',
      'არაბული'
    ],
    newLanguage: ''
  }),
  async created() {
    let response = await this.$http.get(baseUrl, {headers: utils.getHeaders()})

    this.languages = response.data
  },
  methods: {
    async addLanguage(languageName) {
      let index = this.languages.findIndex(item => item.languageName === languageName)

      if (index > -1) return

      let language = {
        languageName: languageName,
        languageLevel: ''
      }

      try {
        await this.$http.post(baseUrl, language, {headers: utils.getHeaders()})

        this.languages.push(language)

        this.newLanguage = ''
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async removeLanguage(languageName) {
      let index = this.languages.findIndex(item => item.languageName === languageName)

      if (index === -1) {
        console.error('can\'t find index of language')
        return
      }

      let url = baseUrl + '/' + languageName

      try {
        await this.$http.delete(url, {headers: utils.getHeaders()})

        this.languages.splice(index, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    onAutocompleteInput(value) {
      this.newLanguage = value
    },
    onLevelChange(language, level) {
      language.languageLevel = level
    }
  },
  components: {
    autocomplete,
    language
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

p {
  text-align: left;
}

.right-float {
  float: right
}

.right-clear {
  clear: right;
}

.card {
  background: whitesmoke;
}

.card-title {
  background-color: darkslategray;
  color: whitesmoke;
  border: solid darkslategray 10px;
  border-radius: 15px;
}

.list-group-item {
  border-bottom: solid darkseagreen;
}

.period-present-text {
  padding-top: 1.375rem;
  margin-top: 3rem;
}
</style>
