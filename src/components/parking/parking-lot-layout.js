import React from 'react'
import * as d3 from 'd3'
import {Button} from '@blueprintjs/core'
import CarSvg from '../../assets/car-top-view.svg'

// function rotateSvg (parkingLot, deg, parking) {
//   console.log(document)
//   if (document) {
//     const rect = document.getBoundingClientRect();
//     console.log(rect.width)
//   }
//   return null
// }

function buildSvgLayout (parkingLot) {
  const parkingSpaces = parkingLot.spaces
  const parkingSpacesCount = parkingSpaces.length
  let xAxis = 25
  let yAxis = -2
  //remove after adding this data to db
  const parkingSpacesLayoutVerticle = parkingSpaces.slice(0,parkingSpacesCount/2).map((s) => {
    yAxis += 12
    const xText = 10 + (24/2)
    const yText = yAxis + (12/2)
    return {...s, x:"10%", y:`${yAxis}%`, width:"24%", height:"12%", xText:`${xText}%`, yText:`${yText}%`}
  })
  const parkingSpacesLayoutHorizontal = parkingSpaces.slice((parkingSpacesCount/2)).map((s) => {
    xAxis += 12
    const xText = xAxis + (12/2)
    const yText = 10 + (24/2)
    return {...s, x:`${xAxis}%`, y:"10%", width:"12%", height:"24%", xText:`${xText}%`, yText:`${yText}%`}
  })


  console.log(parkingSpacesLayoutHorizontal)
  console.log(parkingSpacesLayoutVerticle)

  const horizontalLayout = parkingSpacesLayoutHorizontal.map((s) => (
    <g key={`${parkingLot._id} ${s._id}`}>
      <rect x={s.x} y={s.y} width={s.width} height={s.height} fill="#c3c3c3" stroke="#000000" />
      {s.status === 'PARKING_OCCUPIED' ?
        (<image
          id={`image-${parkingLot._id}-${s._id}`}
          x={s.x}
          y={s.y}
          width={s.width}
          height={s.height}
          xlinkHref={CarSvg}
        >
          {/*{(s.height > s.width) ? rotateSvg(parkingLot, 90,s) : null}*/}
          </image>) : null
      }
      <text x={s.xText} y={s.yText} textAnchor="middle" fill="black" >{s._id}</text>
    </g>
  ))

  const verticalLayout = parkingSpacesLayoutVerticle.map((s) => (
    <g key={`${parkingLot._id} ${s._id}`}>
      <rect x={s.x} y={s.y} width={s.width} height={s.height} fill="#c3c3c3" stroke="#000000" />
      {s.status === 'PARKING_OCCUPIED' ?
        (<image
          x={s.x}
          y={s.y}
          width={s.width}
          height={s.height}
          xlinkHref={CarSvg}
        />) : null
      }
      <text x={s.xText} y={s.yText} textAnchor="middle" fill="black" >{s._id}</text>
    </g>
))

return <g key={parkingLot._id}>{horizontalLayout}{verticalLayout}<g>CarSvg</g></g>

  // const rectangles = svgConatiner.selectAll('rect')
  //   .data(parkingSpaces)
  //   .enter()
  //   .append('rect')
  //
  // const rectAttributes = rectangles
  //   .attr("width", "20%")
  //   .attr("height", "18%")
  //   .attr("fill", "#c2c2c2")
}

function ParkingLotLayout ({onNavigationClick, parkingLot, onClose}) {
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
                {buildSvgLayout(parkingLot)}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ParkingLotLayout
