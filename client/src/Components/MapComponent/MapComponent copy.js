import React, { Component } from 'react';

import "./MapComponent.css"
// import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>))

const google = window.google;

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDeosvjuXnbDOLK0qsW-vBgqUoHIcRCkhY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      

      DirectionsService.route({
        origin: new google.maps.LatLng(43.475610, -80.591570),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          console.log(result)
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })

  
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);






class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="map-c" style={{height : "700px"}}>
                <MapWithADirectionsRenderer
                 isMarkerShown
                 googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDeosvjuXnbDOLK0qsW-vBgqUoHIcRCkhY"
                 loadingElement={<div style={{ height: `100%` }} />}
                 containerElement={<div style={{ height: `700px`, width: "80%" }} />}
                 mapElement={<div style={{ height: `100%`, width : "80%"}} />}
                />
            </div>
        );
    }
}
 
export default MapComponent;