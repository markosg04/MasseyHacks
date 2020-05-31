import React, { Component } from 'react';


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
                <div style={{width : "80%", height : "fit-content;"}}>
                    <MapComponent/>
                </div>
            </div>
        );
    }
}
 
export default Map;