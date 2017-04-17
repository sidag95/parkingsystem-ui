import React from 'react'
import * as d3 from 'd3'
import {Button} from '@blueprintjs/core'

function buildSvgLayout (parkingSpaces) {
  const svgConatiner = d3.select("#svg-layout")
    .append('svg')
    .attr("width", "100%")
    .attr("height", "100%")

  const rectangles = svgConatiner.selectAll('rect')
    .data(parkingSpaces)
    .enter()
    .append('rect')

  const rectAttributes = rectangles
    .attr("width", function (d) {
      console.log(d)
      return "20%"
    })
    .attr("height", "18%")

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
            <div id="svg-layout"></div>
            {buildSvgLayout(parkingLot.spaces)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ParkingLotLayout
