/* eslint-disable no-magic-numbers */
import axios from 'axios'

const api = axios.create({
  baseURL: '', // TODO fill in
  timeout: 30000,
})

export default api
