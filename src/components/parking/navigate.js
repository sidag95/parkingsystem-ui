import React from 'react'
import R from 'ramda'
import {Button} from '@blueprintjs/core'
import Map from './maps'

const API_KEY = 'AIzaSyCcLF4KXS3cw0gZqiWvhpCyBXxKTBvybN8'

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            googleMapsApiScriptLoaded : document.getElementById('googleMapsApiScript') ? true : false
        }

        this.addGoogleMapsApi = this.addGoogleMapsApi.bind(this)
    }


    componentDidMount() {
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

    render () {
        console.log(this.props)
        if (R.isEmpty(this.props.location)) {
            return (<div className="pt-overlay-content"><Button text="Close"  onClick={this.props.onClose} /><h1>Location unavailable</h1></div>)
        }

        const parkingLotLocation = {
            lat: this.props.parking.location[0],
            lng: this.props.parking.location[1],
        }

        return  (
            <div className="pt-overlay-content">
                <div className="map-container">
                    <div className="map-header">
                        <div className="title"><span>{this.props.parking.name}</span></div>
                        <Button 
                            className="closeMap"
                            text="Close"  
                            onClick={this.props.onClose}
                            iconName="cross" 
                        />
                    </div>
                    <div id="map">
                        <Map
                            parkingLotLocation = {parkingLotLocation}
                            googleMapsApiScriptLoaded = {this.state.googleMapsApiScriptLoaded} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation