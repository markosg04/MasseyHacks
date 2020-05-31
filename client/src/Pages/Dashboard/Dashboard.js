import React, { Component } from 'react';

import "./Dashboard.css"

import DashboardCard from "../../Components/DashboardCard/DashboardCard.js"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://localhost:3005/get", requestOptions)
            .then(response => response.text())
            .then(result => {
                const MDBHash = result;
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"address": this.state.address,"hash": MDBHash});
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("http://localhost:3005/validateUser", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        this.setState({
                            validation: result
                        })
                        console.log(this.state);
                    })
                    .catch(error => console.log('error', error));
      
            })
            .catch(error => console.log('error', error));
    }

    render() { 
        return (
            <div className="dashboard-div">
                <div className="dashboard-header-div">Dashboard</div>
                <div className="dashboard-requests-div">
                    <DashboardCard account="fhjafnsaidlufhasdiufhsdioufhsdi"/>
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>

                </div>
            </div>
        );
    }
}
 
export default Dashboard;