import Cookies from 'js-cookie'
import axios from 'axios'

/**
 * Java ს String.hashCode() მეთოდის იმპლემენტაცია Javascript ზე.
 * წყარო http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
 * @param {*} str
 */
const hashCode = (str) => {
  var hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

function isNullOrUndefined(value) {
  return value === null || value === undefined
}

function getHeaders() {
  return {
    authorization: Cookies.get('token')
  }
}

async function isTokenValid() {
  if (!Cookies.get('token')) {
    return false
  }

  try {
    await axios.head('/um/authorization', {headers: getHeaders()})

    return true
  } catch (error) {
    return false
  }
}

export default {
  hashOfString: hashCode,
  isNullOrUndefined,
  getHeaders,
  isTokenValid
}
