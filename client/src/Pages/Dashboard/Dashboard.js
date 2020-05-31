import React, { Component } from 'react';

import "./Dashboard.css"

import DashboardCard from "../../Components/DashboardCard/Dashboard.js"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="dashboard-div">
                <div className="dashboard-header-div">Dashboard</div>
                <div className="dashboard-requests-div">

                </div>
            </div>
        );
    }
}
 
export default Dashboard;