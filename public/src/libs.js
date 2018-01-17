import axios from 'axios'

/**
 * მისამართების ჩატვირთვა (რეგიონები და რაიონები)
 */
async function fetchLocationsOfGeorgia() {
  if (this.locationsOfGeorgia) return this.locationsOfGeorgia
  let response = await axios.get('api/libs/locationsOfGeorgia')
  this.locationsOfGeorgia = response.data
  return this.locationsOfGeorgia
}

export default {
  locationsOfGeorgia: undefined,
  fetchLocationsOfGeorgia
}
