import React from 'react'
import R from 'ramda'
import {Button} from '@blueprintjs/core'
import Map from './maps'

class Navigation extends React.Component {
    render () {
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
                            googleMapsApiScriptLoaded = {this.props.googleMapsApiScriptLoaded} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation