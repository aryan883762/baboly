import axios from 'axios'
import _ from 'lodash'

import { AuthModule } from '@/store/modules/authModule'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

const camelCaseObjectKey = (obj) => {
  return _.mapKeys(obj, (value, key) => _.camelCase(key))
}

const camelCaseObject = (obj) => {
  const isArray = Array.isArray(obj)
  if (typeof obj === 'string' || _.isEmpty(obj, true)) {
    return obj
  }
  obj = camelCaseObjectKey(obj)
  const values = _.mapValues(obj, (value) => camelCaseObject(value))
  return isArray ? Object.values(values) : values
}
// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.data = _.mapKeys(config.data, (value, key) => _.snakeCase(key))
    // Add X-Access-Token header to every request, you can add other custom headers here
    config.headers['X-Api-Key'] = process.env.VUE_APP_API_KEY
    if (AuthModule.authToken && AuthModule.authToken !== '') {
      config.headers['X-Access-Token'] = AuthModule.authToken
      config.headers.common['Authorization'] = 'Bearer ' + AuthModule.authToken
    }
    return config
  }, (error) => {
    Promise.reject(error)
  })

// Response interceptors
service.interceptors.response.use(
  (response) => {
    return camelCaseObject(response)
  },
  (err) => {
    const errorData = err.response.data
    return Promise.reject(errorData)
  }
)

export default service
