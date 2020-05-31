import React, { Component } from 'react';
import getWeb3 from "../../getWeb3";

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress';

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
    
    componentDidMount = async () => {
        console.log(this.props);
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
      
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
      
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
      
            const account = accounts[0];
            console.log(account);
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, account }, this.runExample);
          } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("YOU NEED TO GIVE YOUR LOCATION IN ORDER FOR THIS DECENTRALIZED APPLICATION TO FULLY OPERATE");
        }

        console.log(this.state);
        // console.log(this.props);
        // console.log(this.state);

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
                
                // console.log(this.props)
                var raw = JSON.stringify({"address": this.props.account,"hash": MDBHash});
                
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

    handleSubmit = () => {


        this.setState({loading : true})
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "address": this.props.account,
            "latitude": this.state.latitude,
            "longitude": this.state.longitude,
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
        
        fetch("http://localhost:3005/addDriver", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.setState({loading : false})
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
                        <div style={{height : "10px"}}/>
                        {this.state.loading ?
                        <CircularProgress/>
                        :
                        null}
                    </div>
                </div>
            </div>
        );

        
    }
}
 
export default Driver;