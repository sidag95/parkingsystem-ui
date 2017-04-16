import axios from 'axios'

var config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};

export function getAjax$(url) {
    return axios.get(url)
            .then(({data}) => {
                return data
            })
            .catch((err) => {
                console.log(err)
            })
}