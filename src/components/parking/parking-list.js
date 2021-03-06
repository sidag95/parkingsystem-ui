import React from 'react'
import R from 'ramda'

import {Overlay} from '@blueprintjs/core'

import ParkingLot from './parking-lot'
import Navigation from './navigate'

class ParkingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parking : {
                id: '',
                data: ''
            }
        }

        this.handleParkingClick = this.handleParkingClick.bind(this)
        this.handleClearState = this.handleClearState.bind(this)
    }

    handleParkingClick(parkingId) {
        const parkingData = this.props.parkings.find((p) => p._id === parkingId)
        if(parkingData) {
            this.setState({
                parking: {...this.state.parking, id: parkingId, data: parkingData}
            })
        }
    }

    handleClearState() {
        this.setState({
            parking: {
                id: '',
                data: ''
            }
        })
    }

    render() {
        const overlayContent = (
            <Navigation
                parking={this.state.parking.data ? this.state.parking.data : {}}
                googleMapsApiScriptLoaded = {this.props.googleMapsApiScriptLoaded}
                onClose={this.handleClearState}
            />
        )
        const data = R.reverse(R.sortBy(R.prop('_id'), this.props.parkings)).map((p) => {
            return (
                <ParkingLot
                    key={p._id}
                    lot={p}
                    googleMapsApiScriptLoaded= {this.props.googleMapsApiScriptLoaded}
                    handleParkingClick={this.handleParkingClick}
                    handleParkingBooking={this.props.handleParkingBooking}
                    spinnerVisible={this.props.spinnerVisible}
                />
            )
        })
        return (
            <div className="container" >
                <Overlay isOpen={this.state.parking.id} isClose={!this.state.parking.id} >
                    {overlayContent}
                </Overlay>
                <div className="parking-lot-overview-container" >{data}</div>
            </div>
        )
    }
}

export default ParkingList
