import axios from 'axios'


export function getAjax$(url) {
    return axios.get(url)
            .then(({data}) => {
                console.log(data)
                return data
            })
            .catch((err) => {
                console.log(err)
            })
}