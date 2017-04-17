import React from 'react'
import R from 'ramda'

import UserLogin from '../containers/user/user-login'
import UserDetails from '../containers/user/user-details'

import {getAjax$} from '../utils/api'

import Navbar from '../components/navbar'
import ParkingList from '../components/parking/parking-list'

const POLL_FREQUENCY = 5*1000
const API_KEY = 'AIzaSyCcLF4KXS3cw0gZqiWvhpCyBXxKTBvybN8'

class ParkingListContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parkings: [],
            googleMapsApiScriptLoaded : document.getElementById('googleMapsApiScript') ? true : false,
        }

        this.handlePolling = this.handlePolling.bind(this)
        this.addGoogleMapsApi = this.addGoogleMapsApi.bind(this)
    }

    componentDidMount() {
        this.handlePolling()
        this.addGoogleMapsApi()
    }

    addGoogleMapsApi() {
        if (!document.getElementById('googleMapsApiScript')) {
            const googleMapsApiScript = document.createElement('script');
            googleMapsApiScript.id = 'googleMapsApiScript'
            googleMapsApiScript.setAttribute('src',`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`);
            googleMapsApiScript.async = false
            googleMapsApiScript.defer = false
            document.head.appendChild(googleMapsApiScript)
            googleMapsApiScript.addEventListener('load', function () {
                this.setState({
                    googleMapsApiScriptLoaded: true
                })
            }.bind(this))
        }
        return ''
    }

    handlePolling () {
      if (window.EventSource) {
        var source = new EventSource('https://parkingsystem-api.herokuapp.com/api/parking');
        source.addEventListener('message', function(e) {
          this.setState({
            parkings: JSON.parse(e.data)
          })
        }.bind(this), false)

        source.addEventListener('open', function(e) {
          console.log("Connection was opened")
        }, false)

        source.addEventListener('error', function(e) {
          if (e.readyState == EventSource.CLOSED) {
            console.log("Connection was closed")
          }
        }, false)
      } else {
        const poll = () =>  getAjax$('https://parkingsystem-api.herokuapp.com/api/parking')
          .then((response) => {
            this.setState({
              parkings: response
            })
            setTimeout(poll, POLL_FREQUENCY)
            return response
          })
          .catch((err) => {console.log(err)})

        poll()
      }

    }

    render() {
        return (
            <div className="app">
                <Navbar />
                <div className="app-container" >
                    <div className="greet-user"> Welcome "USER". Below is the list of all the parking lots in your vicinity. Click any one to have a detailed view.</div>
                    <ParkingList parkings={this.state.parkings} googleMapsApiScriptLoaded={this.state.googleMapsApiScriptLoaded} />
                </div>
            </div>
        )
    }
}
export default ParkingListContainer
