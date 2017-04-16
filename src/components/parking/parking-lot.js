import React from 'react'
import {Spinner} from '@blueprintjs/core'

const PARKING_FREE = 'PARKING_FREE'

class ParkingLotOverview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            distance: '',
            loaded: false,
        }
        this.calculateDistance = this.calculateDistance.bind(this)
    }
    
    componentDidMount() {
        this.calculateDistance()
    }

    calculateDistance() {
        if(navigator.geolocation && this.props.googleMapsApiScriptLoaded) {
            navigator.geolocation.getCurrentPosition(function(location) {
                const origin = `${location.coords.latitude},${location.coords.longitude}`
                const destination = `${this.props.lot.location[0]},${this.props.lot.location[1]}`
                const matrix = new google.maps.DistanceMatrixService();
                matrix.getDistanceMatrix({
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING
                }, function(res, status) {
                    if (status === 'OK') {
                        this.setState({
                            distance: res.rows[0].elements[0].distance.text,
                            loaded: true,
                        })
                    } else {
                        console.log(status)
                    }
                }.bind(this))                                
            }.bind(this))
        }
        else {
            this.setState({
                distance: 'Unable to find current location.',
                loaded: true,
            })
        }
    }

    render () {
        const freeParkings = this.props.lot.spaces.filter((s) => s.status === PARKING_FREE).length
        const totalParkings = this.props.lot.spaces.length

        return (
            <div className="pt-card  pt-interactive parking-lot-overview" data-id={this.props.lot._id} onClick={this.props.handleParkingClick} >
                <div className="parking-header">{this.props.lot.name}</div>
                <div className="parking-body">
                    <div className="parking-count" >
                        <div className="parking-count-free" >
                            <div className="parking-count-number" >{`${freeParkings}`}</div>
                            <div className="parking-count-text" >(Free)</div>
                        </div>
                        <div className="parking-count-number" >/</div>
                        <div className="parking-count-total" >
                            <div className="parking-count-number" >{`${totalParkings}`}</div>
                            <div className="parking-count-text" >(Total)</div>
                        </div>
                    </div>
                    <div className="parking-distance" >
                        <div>Distance : </div>
                        {this.state.loaded ? this.state.distance : <Spinner className="pt-small" />}
                    </div>
                </div>
            </div>
        )
    } 
}

export default ParkingLotOverview