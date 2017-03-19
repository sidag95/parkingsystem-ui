import React from 'react'
import R from 'ramda'

import UserLogin from '../containers/user/user-login'
import UserDetails from '../containers/user/user-details'

import {getAjax$} from '../utils/api'

import ParkingList from '../components/parking/parking-list'

const POLL_FREQUENCY = 20*1000
 
class ParkingListContainer extends React.Component {
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
        const hello = () =>  getAjax$('https://parkingsystem-api.herokuapp.com/api/parking')
        .then((response) => {
            this.setState({
                parkings: response
            })
            setTimeout(hello, POLL_FREQUENCY)
            return response
        })
        .catch((err) => {console.log(err)})

        hello()
    }

    render() {
        return (
            <ParkingList parkings={this.state.parkings} />
        )
    }
} 
export default ParkingListContainer