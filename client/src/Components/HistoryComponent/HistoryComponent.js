import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import "./HistoryComponent.css"

class HistoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="history-card-div">
                <div className="history-card-left">
                    <div className="history-card-picture-div">
                        <div className="history-card-picture-icon"></div>
                    </div>
                    <div className="history-card-text-content-div">
                        <div className="history-card-title">{this.props.name}</div>
                        <div className="history-card-last-check">{this.props.dist} Kilometers Travelled</div>
                        <div className="history-card-last-appointment">Rating Given: {this.props.rat}</div>
                    </div>
                </div>
                <div className="history-card-right">
                    ${this.props.pri}
                    <div style={{width: "20px"}}/>
                </div>
                
            </div>
        );
    }
}
 
export default HistoryComponent;