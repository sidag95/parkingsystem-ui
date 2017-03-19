import React from 'react'
import R from 'ramda'

import {Overlay, Button, Collapse} from '@blueprintjs/core'

import ParkingLot from './parking-lot'

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

    handleParkingClick(e) {
        const parkingId = parseInt(e.currentTarget.dataset.id)
        const parkingData = this.props.parkings.find((p) => p._id === parkingId)
        if(parkingData) {
            this.setState({
                parking: {...this.state.parking.expandedParking, id: parkingId, data: parkingData}
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
        console.log(this.state.parking)
        const overlayContent = <div><Button text="Close"  onClick={this.handleClearState} /><h1>Hello World</h1></div>
        const data = R.reverse(R.sortBy(R.prop('_id'), this.props.parkings)).map((p) => {
            return (<ParkingLot key={p._id} lot={p} handleParkingClick={this.handleParkingClick} />)
        })
        return (
            <div className="container" >
                <Overlay isOpen={this.state.parking.id} isClose={!this.state.parking.id} >
                    {overlayContent}
                </Overlay>
                <div>{data}</div>
            </div>
        )
    }
}

export default ParkingList