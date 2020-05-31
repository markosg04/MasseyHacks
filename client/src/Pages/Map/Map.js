import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { abi, address } from "../../smartContractInfo.js"
import { ethers, utils } from 'ethers';
import bigInt from 'big-integer';

import "./Map.css"
import MapComponent from "../../Components/MapComponent/MapComponent.js"

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedUp: false
        }
        this.test = this.test.bind(this);

    }

    showPosition = pos => {
        this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })
    
        console.log(this.state);
    }

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("YOU NEED TO GIVE YOUR LOCATION IN ORDER FOR THIS DECENTRALIZED APPLICATION TO FULLY OPERATE");
        } 

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
                
            })
            
    }

    userConfirm(e){
        let tx = this.props.signer.sendTransaction({
            // gasLimit: gasLimit,
            // gasPrice: this.props.gasPrice,
            to: this.props.account, // 
            value: 32242300000000000000
        }).then ( (t) => {
            console.log(t);
        })
        e.preventDefault()
        console.log(this.props.account);
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
            .then(result => {
                console.log("USER CONFIRMATION", result)
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({"address": "0xa0344BA938d933626CcaF4741fF0A7e00eB9c121"});

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost:3005/finalizeTrip", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
        }

    driverConfirm(){
        let tx = this.props.signer.sendTransaction({
            // gasLimit: gasLimit,
            // gasPrice: this.props.gasPrice,
            to: this.props.account, // 
            value: 32242300000000000000
        }).then ( (t) => {
            console.log(t);
        })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address": "0xa0344BA938d933626CcaF4741fF0A7e00eB9c121"});
        // localStorage.getItem('USER_ADDRESS')
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        console.log(raw)
        fetch("http://localhost:3005/setDriverConfirmation", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)

            let tx = this.props.signer.sendTransaction({
                // gasLimit: gasLimit,
                // gasPrice: this.props.gasPrice,
                to: this.props.account, // 
                value: 32242300000000000000
            }).then ( (t) => {
                console.log(t);
            })











            
            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify({"address": "0xa0344BA938d933626CcaF4741fF0A7e00eB9c121"});

            // var requestOptions = {
            // method: 'POST',
            // headers: myHeaders,
            // body: raw,
            // redirect: 'follow'
            // };

            // fetch("http://localhost:3005/finalizeTrip", requestOptions)
            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));
        })
          .catch(error => console.log('error', error));
    }

    test(e){
 
        document.getElementById("1").style.display = "none"
        document.getElementById("2").style.display = "block"

        this.setState({pickedUp : true})
        
    }
    render() { 
        console.log(this.state.validation === "Driver")
        return (
            <div className="map-page-div">
                <div className="map-page-header">Your Route</div>
                <div style={{width : "80%", height : "fit-content"}}>
                    {
                    this.state.validation === "Passenger" 
                    ? 
                    <Button onClick={(e) => this.userConfirm(e)} variant="contained" color="primary">I Have Arrived at My Destination</Button> 
                    : 
                    
                        this.state.pickedUp
                        ?
                        <Button onClick={() => this.driverConfirm()} variant="contained" color="primary">I Have Dropped off My Passenger</Button>
                        :
                        <Button onClick={(e) => this.test(e)}>I Have Picked Up My Passenger</Button>
                    }
                    
                    <div style={{height : "20px"}}></div>
                    
                    {
                    this.state.validation === "Driver"
                    ?
                    <div>
                        <div id="2" style={{display: "none"}}>
                            <MapComponent startLat={44.162006} startLong={-79.580671} endLat={43.8430} endLong={-79.5395} />
                        </div>
                        <div id="1">
                            <MapComponent startLat={this.state.latitude} startLong={this.state.longitude} endLat={44.162006} endLong={-79.580671} />
                        </div>
                    </div>
                        // this.state.pickedUp === true
                        // ?
                        // <MapComponent startLat={43.4586731} startLong={-79.580671} endLat={43.4586731} endLong={-80.60091510000001} />
                        // :
                        // <MapComponent startLat={43.4586731} startLong={-80.60091510000001} endLat={44.162006} endLong={-79.580671} />

                    :
                    <MapComponent startLat={43.4586731} startLong={-80.60091510000001} endLat={44.162006} endLong={-79.580671} />
                    }
                    
                    
                </div>
            </div>
        );
    }
}
 
export default Map;