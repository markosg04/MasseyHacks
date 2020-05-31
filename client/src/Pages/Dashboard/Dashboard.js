import React, { Component } from 'react';

import "./Dashboard.css"

import DashboardCard from "../../Components/DashboardCard/DashboardCard.js"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fullName : ""
        }
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
                console.log(MDBHash);
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

                        if (this.state.validation === "Driver"){
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            var raw = JSON.stringify({"address": this.props.account});
                            
                            var requestOptions = {  
                              method: 'POST',
                              headers: myHeaders,
                              body: raw,
                              redirect: 'follow'
                            };
                            
                            fetch("http://localhost:3005/stageDriverStatus", requestOptions)
                              .then(response => response.text())
                              .then(result => {
                                  console.log(result)

                                  var requestOptions = {
                                    method: 'GET',
                                    redirect: 'follow'
                                  };
                                  
                                  fetch("http://localhost:3005/returnDriverStatus", requestOptions)
                                    .then(response => response.text())
                                    .then(result => {
                                        console.log("ghdsfiuosahdif" , result)
                                        const USER_ADDRESS = result;
                                        localStorage.setItem('USER_ADDRESS', USER_ADDRESS);
                                        // localStorage.getItem('USER_ADDRESS');
                                        var requestOptions = {
                                            method: 'GET',
                                            redirect: 'follow'
                                          };
                                          
                                          fetch("http://localhost:3005/clearDriverStatus", requestOptions)
                                            .then(response => response.text())
                                            .then(result => {
                                                console.log(result)
                                                console.log(MDBHash, USER_ADDRESS);
                                                console.log(USER_ADDRESS !== "0x0000000000000000000000000000000000000000");
                                                if (USER_ADDRESS !== "0x0000000000000000000000000000000000000000"){
                                                    this.setState({passengerAddress: USER_ADDRESS})
                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Content-Type", "application/json");
                                                    
                                                    var raw = JSON.stringify({"hash": MDBHash ,"address": this.props.account});
                                                    
                                                    var requestOptions = {
                                                      method: 'POST',
                                                      headers: myHeaders,
                                                      body: raw,
                                                      redirect: 'follow'
                                                    };
                                                    
                                                    fetch("http://localhost:3005/getDriverData", requestOptions)
                                                      .then(response => response.text())
                                                      .then(result => {
                                                          result = JSON.parse(result);
                                                          console.log(result);
                                                          console.log(result);  
                                                          this.setState({
                                                            fullName : result.fullname
                                                          })
                               
                                                        })
                                                      .catch(error => console.log('error', error));

                                                }
                                            })
                                            .catch(error => console.log('error', error));

                                    })
                                    .catch(error => console.log('error', error));


                                })
                              .catch(error => console.log('error', error));
                        }



                    })
                    .catch(error => console.log('error', error));
      
            })
            .catch(error => console.log('error', error));
    }



    clickNo(){
        this.setState({fullName : ""})
    }

    clickYes(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"driver": this.props.account,"user": this.state.passengerAddress});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/finalizeDriver", requestOptions)
          .then(response => response.text())
          .then(result => {
              console.log(result)
            })
          .catch(error => console.log('error', error));
    }

    render() { 
        return (
            <div className="dashboard-div">
                <div className="dashboard-header-div">Dashboard</div>
                {/* {this.state.validation === "Driver" && this.state.fullName === ""
                ?  */}
                <div className="dashboard-requests-div">
                    <DashboardCard no={() => this.clickNo()} yes={() => this.clickYes()} name={this.state.fullName}/>
                </div>
                {/* :
                <div style={{width: "80%"}}>
                  <div className="tes">Welcome to Peer Pool Decentralized Carpooling Services!</div>
                  <div style={{height : "20px"}}></div>
                  <div className="tes">Your Ride Status: In-Progress</div>
                </div>

                } */}
            </div>
        );
    }
}
 
export default Dashboard;