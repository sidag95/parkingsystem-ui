import axios from 'axios'


export function getAjax$(url) {
    return axios.get('url')
    .then(({response}) => response)
    .catch((err) => err)
}