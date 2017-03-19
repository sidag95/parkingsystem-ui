import React from 'react'

export default function ParkingLot({lot, handleParkingClick}) {
    return (<div className="parking-lot" data-id={lot._id} onClick={handleParkingClick} >
                <div className="parking-header">
                    <span>{lot._id}</span>
                    <span>{lot.name}</span>
                </div>
                <div className="parking-body">
                    {lot.spaces.map((s) => {
                    return <div className="" key={`${lot._id} ${s._id}`} >{s.status}</div>})}
                </div>
            </div>)
}