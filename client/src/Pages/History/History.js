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
                        <HistoryCard name="Daniel" dist="2.3" rat="3.5" pri="6"/>
                        <HistoryCard name="Robert" dist="10.4" rat="4.3" pri="10"/>
                        <HistoryCard name="Aditya" dist="2.6" rat="3.2" pri="7"/>
                        <HistoryCard name="Evan" dist="5.0" rat="4.8" pri="15"/>
                        <HistoryCard name="Tyrone" dist="3.8" rat="4.5" pri="8"/>
                        <HistoryCard name="Markos" dist="1.3" rat="4.2" pri="4"/>
                        <HistoryCard name="George" dist="19.3" rat="3.1" pri="40"/>
                   
                    </div>
                    <div className="history-graphs">
                    <div>
                        <div className="line-graph-header">Usage Over Past Year</div>
                        <LineGraph data={data}/>
                    </div>
                    <div style={{height : "30px"}}/>
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