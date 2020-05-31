import React, { Component } from 'react';

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import "./Driver.css"

class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }



    render() { 
        return (
            <div className="driver-page-div">
                <div className="driver-header"> Become a Driver </div>
                <div className="driver-form-div-container">
                    <div className="driver-form-div">
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between", marginTop : "80px"}}>
                            <TextField id="standard-basic" label="First Name" />
                            <TextField id="standard-basic" label="Last Name" />
                        </div>
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between"}}>
                            <TextField id="standard-basic" label="Address" />
                            <TextField id="standard-basic" label="Country" />
                        </div>
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between"}}>
                            <TextField id="standard-basic" label="State" />
                            <TextField id="standard-basic" label="City" />
                        </div>
                        <div style={{margin : "10px", width : "90%", height : "50px", display : "flex", justifyContent : "space-between"}}>
                            <TextField id="standard-basic" label="Number of Seats" />
                            <TextField id="standard-basic" label="Type of Car" />
                        </div>
                        <div style={{height : "40px"}}/>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Driver;