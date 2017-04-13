import React from 'react'
import R from 'ramda'
import {Button} from '@blueprintjs/core'

function initMap(parkingLotLocation) {
    const map = new google.maps.Map(document.getElementById('map'), {
    center: parkingLotLocation,
    scrollwheel: false,
    zoom: 16
    });

    const infoWindow = new google.maps.InfoWindow({map: map});

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location) {
          const currentLocation = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }
          const directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
          });
          const request = {
            destination: parkingLotLocation,
            origin: currentLocation,
            travelMode: 'DRIVING'
          };
          const directionsService = new google.maps.DirectionsService();
          directionsService.route(request, function(response, status) {
            if (status == 'OK') {
              // Display the route on the map.
              directionsDisplay.setDirections(response);
            }
        });
      },
      function() {
            handleLocationError(true, infoWindow, map.getCenter());
        })
    }
    else {
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }
}

class Map extends React.Component { 
    shouldComponentUpdate (nextProps) {
        if(R.equals(this.props, nextProps)) {
            return false
        }
        return true
    }

    render () {
        console.log(this.props.parkingLotLocation)
        if (this.props.parkingLotLocation) {
            if (this.props.googleMapsApiScriptLoaded) {
                setTimeout(function() {
                    initMap(this.props.parkingLotLocation)
                }.bind(this), 100)
                return null
            }
            return (<h1>Loading ......</h1>)
        }

        return (<h1>Location Unavailable</h1>)
    }
}

export default Map