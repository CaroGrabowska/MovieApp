// API CONFIG
import axios from 'axios'
import apiConfig from './config';
import apiDefaults from './defaults'

const http = (endpoint) => {
  return axios.create({ baseURL: `${apiConfig.URL}${endpoint}` })
}

const paramDefault = {
  api_key: apiConfig.KEY,
  language: apiDefaults.LANG
};

export { http, paramDefault }
