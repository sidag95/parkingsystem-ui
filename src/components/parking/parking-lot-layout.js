import React from 'react'
import {Button, Overlay, Spinner} from '@blueprintjs/core'

function fillColorBasedOnStatus (space) {
  if ((space.status === 'PARKING_OCCUPIED') || (space.status === 'PARKING_OUT_OF_SERVICE')) {
    return <rect x={space.x} y={space.y} width={space.width} height={space.height} fill="#ff0000" />
  }

  if ((space.status === 'PARKING_RESERVED') || (space.status === 'PARKING_BOOKED')) {
    return <rect x={space.x} y={space.y} width={space.width} height={space.height} fill="#0000ff" />
  }

  return <rect x={space.x} y={space.y} width={space.width} height={space.height} fill="#00ff00" />
}

function buildSvgLayout (parkingLot, parkingSpaceClick) {
  const parkingSpaces = parkingLot.spaces
  const parkingSpacesCount = parkingSpaces.length
  let xAxis = 25
  let yAxis = -2
  //remove after adding this data to db
  const parkingSpacesLayoutVerticle = parkingSpaces.slice(0,parkingSpacesCount/2).map((s) => {
    yAxis += 12
    const xText = 10 + (20/2)
    const yText = yAxis + (12/2)
    return {...s, x:"10%", y:`${yAxis}%`, width:"20%", height:"12%", xText:`${xText}%`, yText:`${yText}%`}
  })
  const parkingSpacesLayoutHorizontal = parkingSpaces.slice((parkingSpacesCount/2)).map((s) => {
    xAxis += 12
    const xText = xAxis + (12/2)
    const yText = 10 + (20/2)
    return {...s, x:`${xAxis}%`, y:"10%", width:"12%", height:"20%", xText:`${xText}%`, yText:`${yText}%`}
  })

  const legendLayout = (function () {
    return (<g>
      <rect width="33.33%" height="8%" stroke="#000000" fill="#ffffff" />
      <circle cx="3%" cy="4%" r="5" fill="#00ff00"></circle>
      <text x="6%" y="5%" fill="#000000" >Free</text>

      <rect x="33.33%" width="33.33%" height="8%" stroke="#000000" fill="#ffffff" />
      <circle cx="36%" cy="4%" r="5" fill="#ff0000"></circle>
      <text x="38%" y="5%" fill="#000000" >Occupied</text>

      <rect x="66.66%" width="33.33%" height="8%" stroke="#000000" fill="#ffffff" />
      <circle cx="70%" cy="4%" r="5" fill="#0000ff"></circle>
      <text x="73%" y="5%" fill="#000000" >Booked</text>
    </g>)
  })()

  const horizontalLayout = parkingSpacesLayoutHorizontal.map((s) => {
    const ySecondRow = String(parseInt(s.yText) + 2) + "%"
    return (
      <g
        className={`${s.status === 'PARKING_FREE' ? 'parking-space-grid' : ''}`}
        data-id={`${parkingLot._id}-${s._id}`}
        onClick={parkingSpaceClick}
        key={`${parkingLot._id}-${s._id}`}
      >
        <rect x={s.x} y={s.y} width={s.width} height={s.height} fill="#c3c3c3" stroke="#000000" />
        {fillColorBasedOnStatus(s)}
        <text x={s.xText} y={s.yText} textAnchor="middle" fill="black" >{s._id}</text>
        {s.status === "PARKING_FREE" ?
          <text x={s.xText} y={ySecondRow} textAnchor="middle" fill="black" >Book</text> : null
        }
      </g>
    )})

  const verticalLayout = parkingSpacesLayoutVerticle.map((s) => {
    const ySecondRow = String(parseInt(s.yText) + 2) + "%"
    return (
      <g
        className={`${s.status === 'PARKING_FREE' ? 'parking-space-grid' : ''}`}
        data-id={`${parkingLot._id}-${s._id}`}
        onClick={parkingSpaceClick}
        key={`${parkingLot._id}-${s._id}`}>
        <rect x={s.x} y={s.y} width={s.width} height={s.height} fill="#c3c3c3" stroke="#000000" />
        {fillColorBasedOnStatus(s)}
        <text x={s.xText} y={s.yText} textAnchor="middle" fill="black" >{s._id}</text>
        {s.status === "PARKING_FREE" ?
          <text x={s.xText} y={ySecondRow} textAnchor="middle" fill="black" >Book</text> : null
        }
      </g>
    )
  })

  return <g key={parkingLot._id}>{legendLayout}{horizontalLayout}{verticalLayout}<g>CarSvg</g></g>
}

class ParkingLotLayout extends React.Component {
  render() {
    if (this.props.spinnerVisible) {
      return (
        <div className="pt-overlay-content">
          <div className="parking-lot-layout-spinner">
            <Spinner />
          </div>
        </div>
      )
    }
    const {onNavigationClick, parkingLot, onClose, handleParkingBooking} = this.props
    return (
      <div className="pt-overlay-content">
        <div className="layout-container">
          <div id="parking-lot-layout">
            <div className="layout-header">
              <div className="title"><span>{parkingLot.name}</span></div>
              <div className="button-group">
                <Button
                  text="Navigate"
                  data-id={parkingLot._id}
                  onClick={onNavigationClick}
                />
                <Button text="Close" iconName="cross" onClick={onClose} />
              </div>
            </div>
            <div className="layout-body">
              <div id="svg-layout">
                <svg
                  width={"100%"}
                  height={"100%"}
                >
                  <rect width="100%" height="100%" fill="white" />
                  {buildSvgLayout(parkingLot, handleParkingBooking)}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ParkingLotLayout
