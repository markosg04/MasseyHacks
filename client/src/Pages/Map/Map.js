import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


import "./Map.css"
import MapComponent from "../../Components/MapComponent/MapComponent.js"

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
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
                
            })
            
    }

    userConfirm(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"address": this.props.account});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3005/setUserConfirmation", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
            }

    driverConfirm(){

    }
    render() { 
        return (
            <div className="map-page-div">
                <div className="map-page-header">Your Route</div>
                <div style={{width : "80%", height : "fit-content"}}>
                    {this.state.validation === "Passenger" ? <Button onClick={() => this.userConfirm()} variant="contained" color="primary">I Have Arrived at My Destination</Button> : <Button onClick={() => this.driverConfirm()} variant="contained" color="primary">I Have Picked Up My Passenger</Button>}
                    
                    <div style={{height : "20px"}}></div>
                    <MapComponent/>
                </div>
            </div>
        );
    }
}
 
export default Map;