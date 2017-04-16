import React from 'react'

export default function ParkingLotOverview({lot, handleParkingClick}) {
    return (
            <div className="pt-card  pt-interactive parking-lot-overview" data-id={lot._id} onClick={handleParkingClick} >
                <div className="parking-header">{lot.name}</div>
                <div className="parking-body">
                    <div></div>
                    <div></div>
                    {lot.spaces.map((s) => {
                    return <div className="" key={`${lot._id} ${s._id}`} >{s.status}</div>})}
                </div>
            </div>
        )
}