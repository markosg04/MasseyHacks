import React, { Component } from 'react';

import "./History.css"

import HistoryCard from "../../Components/HistoryComponent/HistoryComponent.js"
import LineGraph from "../../Components/LineGraph/LIneGraph.js"
import OtherGraph from "../../Components/OtherGraph/OtherGraph.js"

var data = [
    {x: "January", y: 75},
    {x: "Feburary", y: 35},
    {x: "March", y: 45},
    {x: "April", y: 55},
    {x: "May", y: 15},
    {x: "June", y: 75},
    {x: "July", y: 45},
    {x: "August", y: 55},
    {x: "September", y: 15},
    {x: "October", y: 5},
    {x: "November", y: 85},
    {x: "December", y: 45},
]

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div style={{width : "80%", height : "100vh", display: "flex", flexDirection : "column", alignItems : "center"}}>
                <div className="history-header">
                    Your History
                </div>
                <div style={{width: "80%", height : "fit-content", display: "flex"}}>
                    <div className="history-card-container">
                        <HistoryCard name="daniel" />
                        <HistoryCard name="daniel" />
                        <HistoryCard name="daniel" />
                        <HistoryCard name="daniel" />
                        <HistoryCard name="daniel" />
                        <HistoryCard name="daniel" />
                        <HistoryCard name="daniel" />
                   
                    </div>
                    <div className="history-graphs">
                    <div>
                        <div className="line-graph-header">Usage Over Past Year</div>
                        <LineGraph data={data}/>
                    </div>
                    <div>
                        <div className="line-graph-header">Average Costs of Rides</div>
                        <OtherGraph/>
                    </div>
                </div>
                </div>
                
            </div>
            );
    }
}
 
export default History