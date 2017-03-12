import React from 'react'
import R from 'ramda'

import UserLogin from '../containers/user/user-login'
import UserDetails from '../containers/user/user-details'

import {getAjax$} from '../utils/api'

const POLL_FREQUENCY = 20*1000
 
class ParkingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parkings: [],
        }

        this.handlePolling = this.handlePolling.bind(this)
    }

    componentDidMount() {
        this.handlePolling()
    }

    handlePolling () {
        const hello = () =>  getAjax$('http://localhost:8081/api/parking')
        .then((response) => {
            this.setState({
                parkings: response
            })
            setTimeout(hello, POLL_FREQUENCY)
            return response
        })

        hello()
    }

    render() {
        console.log(this.state)

    const data = R.reverse(R.sortBy(R.prop('_id'), this.state.parkings)).map((p) => {
        console.log(p)
        return <div><span>Hi</span><span>{p.name}</span></div>
    })
        return (
            <div>
            Hello World
            {data}
            </div>
        )
    }
} 
export default ParkingList