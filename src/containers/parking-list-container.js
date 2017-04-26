import React from 'react'

import {getAjax$, postAjax$} from '../utils/api'
import {getItemFromLocalStorage, setItemToLocalStorage} from '../utils/localStorage'

import Navbar from '../components/navbar'
import ParkingList from '../components/parking/parking-list'

import {successToast, errorToast} from '../utils/toast'

const POLL_FREQUENCY = 5*1000
const API_KEY = 'AIzaSyCcLF4KXS3cw0gZqiWvhpCyBXxKTBvybN8'
const localParkingBaseUri = 'http://localhost:3000/api/parking'
const localUserBaseUri = 'http://localhost:3000/api/users'
const remoteParkingBaseUri = 'https://parkingsystem-api.herokuapp.com/api/parking'
const remoteUserBaseUri = 'https://parkingsystem-api.herokuapp.com/api/users'

class ParkingListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      spinnerVisible: false,
      userDetails: {
        userId: "",
        name: "",
      },
      parkings: [],
      googleMapsApiScriptLoaded : document.getElementById('googleMapsApiScript') ? true : false,
    }

    this.handlePolling = this.handlePolling.bind(this)
    this.handleUserLogin = this.handleUserLogin.bind(this)
    this.handleUserSignUp = this.handleUserSignUp.bind(this)
    this.handleParkingBooking = this.handleParkingBooking.bind(this)
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

  handleUserLogin () {

  }

  handleUserSignUp (username, password, name) {
    postAjax$(localUserBaseUri+'/signup', {
      name: name,
      username: username,
      password: password
    })
      .then((response) => {
        setItemToLocalStorage("token", response.data.token)
        console.log("Token set", getItemFromLocalStorage("token"))
    })
  }

  handleParkingBooking (e) {
    this.setState({
      spinnerVisible: true,
    })
    const parkingData = e.currentTarget.dataset.id.split('-')
    const lotId = parkingData[0]
    const spaceId = parkingData[1]
    postAjax$(localParkingBaseUri + '/book', {
      lotId: lotId,
      spaceId: spaceId
    })
      .then(function(response){
        this.setState({
          spinnerVisible: false,
        })
        console.log('then', response)
        successToast("Successfully booked parking. Please reach the spot within 20 minutes")
      }.bind(this))
      .catch(function(err) {
        this.setState({
          spinnerVisible: false,
        })
        errorToast("Error booking parking. Please try some other space.")
        console.log(err)
      }.bind(this))
  }

  handlePolling () {
    if (window.EventSource) {
      var source = new EventSource(localParkingBaseUri);
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
      const poll = () =>  getAjax$(localParkingBaseUri)
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
        <Navbar
          handleUserLogin={this.handleUserLogin}
          handleUserSignUp = {this.handleUserSignUp}
        />
        <div className="app-container" >
          <div className="greet-user"> Welcome Guest. Below is the list of all the parking lots in your vicinity. Click any one to have a detailed view.</div>
          <ParkingList
            handleParkingBooking={this.handleParkingBooking}
            parkings={this.state.parkings}
            googleMapsApiScriptLoaded={this.state.googleMapsApiScriptLoaded}
            spinnerVisible={this.state.spinnerVisible}
          />
        </div>
      </div>
    )
  }
}
export default ParkingListContainer
