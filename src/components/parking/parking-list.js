import React from 'react'
import R from 'ramda'

class ParkingLot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parking : {
                id: '',
                data: ''
            }
        }

        this.handleParkingClick = this.handleParkingClick.bind(this)
    }

    handleParkingClick(e) {
        console.log(e.currentTarget.dataset.id)
        const parkingId = e.currentTarget.dataset.id
        const parkingData = this.props.data.find((p) => p._id === parkingId)
        if(data) {
            this.setState({
                parking: {id: parkingId, data: parkingData}
            })
        }
    }

    render() {
        console.log(this.props.parkings)
        const data = R.reverse(R.sortBy(R.prop('_id'), this.props.parkings)).map((p) => {
            return <div key={p._id} >
                        <button data-id={p._id} onClick={this.handleParkingClick} >
                            <span>{p._id}</span>
                            <span>{p.name}</span>
                            {p.spaces.map((s) => {
                                return <div key={`${p._id} ${s._id}`} >{s.status}</div>})}
                        </button>
                    </div>
        })
        return (
            <div>{data}</div>
        )
    }
}

export default ParkingLot