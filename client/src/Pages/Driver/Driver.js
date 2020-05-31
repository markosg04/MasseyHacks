import React, { Component } from 'react';

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import "./Driver.css"

class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            address: null,
            country: null,
            state: null,
            city: null,
            seats: null,
            carName: null
        }
        console.log(this.props);
    }
    showPosition = pos => {
        this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })
    
        console.log(this.state);
    }
    
    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("YOU NEED TO GIVE YOUR LOCATION IN ORDER FOR THIS DECENTRALIZED APPLICATION TO FULLY OPERATE");
        }
        console.log(this.props);
    }

    handleSubmit = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
        
    fetch("http://localhost:3005/get", requestOptions)
        .then(response => response.text())
        .then(result => {
            const hash = result;
            var raw = JSON.stringify({
                "address": this.state.account,
                "latitude": this.state.latitude,
                "longitude": this.state.longitude,
                "hash": hash,
                "carName": this.state.carName,
                "seats": this.state.seats,
                "city": this.state.city,
                "state": this.state.state,
                "country": this.state.country,
                "fullname": this.state.firstname + this.state.lastname
            });
            
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            fetch("http://localhost:3005/addDriver", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const MDBHash = result;
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    
                    var raw = JSON.stringify({"hash": MDBHash});
                    
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                    
                    fetch("http://localhost:3005/set", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
        
                })
                .catch(error => console.log('error', error));

        })
        .catch(error => console.log('error', error));


    }

    render() { 
        return (
            <div className="driver-page-div">
                <div className="driver-header"> Become a Driver </div>
                <div className="driver-form-div-container">
                    <div className="driver-form-div">
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between", marginTop : "80px"}}>
                            <TextField onChange={(e) => {this.setState({firstname: e.target.value})}} id="standard-basic" label="First Name" />
                            <TextField onChange={(e) => {this.setState({lastname: e.target.value})}} id="standard-basic" label="Last Name" />
                        </div>
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between"}}>
                            <TextField onChange={(e) => {this.setState({address: e.target.value})}} id="standard-basic" label="Address" />
                            <TextField onChange={(e) => {this.setState({country: e.target.value})}} id="standard-basic" label="Country" />
                        </div>
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between"}}>
                            <TextField onChange={(e) => {this.setState({state: e.target.value})}} id="standard-basic" label="State" />
                            <TextField onChange={(e) => {this.setState({city: e.target.value})}} id="standard-basic" label="City" />
                        </div>
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between"}}>
                            <TextField onChange={(e) => {this.setState({seats: e.target.value})}} id="standard-basic" label="Number of Seats" />
                            <TextField onChange={(e) => {this.setState({carName: e.target.value})}} id="standard-basic" label="Type of Car" />
                        </div>
                        <div style={{height : "40px"}}/>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Driver;