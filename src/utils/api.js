import axios from 'axios'
import {getItemFromLocalStorage} from './localStorage'

var config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+getItemFromLocalStorage("token")
  }
};

export function getAjax$(url) {
  return axios.get(url, config)
}

export function postAjax$(url, body) {
  return axios.post(url, body, config)
}
