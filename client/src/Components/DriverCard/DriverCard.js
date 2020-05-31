import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import "./DriverCard.css"

class DriverCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="driver-card-div">
                <div className="driver-card-left">
                    <div className="driver-card-picture-div">
                        <div className="driver-card-picture-icon"></div>
                    </div>
                    <div className="driver-card-text-content-div">
                        <div className="driver-card-title">{this.props.name}</div>
                        <div className="driver-card-last-check">Rating: 4.7/5</div>
                        <div className="driver-card-last-appointment">5 kilometers away</div>
                    </div>
                </div>
                <div className="driver-card-right">
                    Status : Pending
                    <div style={{width: "10px"}}/>
                </div>
            </div>
        );
    }
}
 
export default DriverCard;