import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


import "./Map.css"
import MapComponent from "../../Components/MapComponent/MapComponent.js"

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="map-page-div">
                <div className="map-page-header">Your Route</div>
                <div style={{width : "80%", height : "fit-content"}}>
                    <Button variant="contained" color="primary">I Have Picked Up My Passenger</Button>
                    <div style={{height : "20px"}}></div>
                    <MapComponent/>
                </div>
            </div>
        );
    }
}
 
export default Map;