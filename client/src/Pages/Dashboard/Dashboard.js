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
                                        var address = result
                                        var requestOptions = {
                                            method: 'GET',
                                            redirect: 'follow'
                                          };
                                          
                                          fetch("http://localhost:3005/clearDriverStatus", requestOptions)
                                            .then(response => response.text())
                                            .then(result => {
                                                console.log(result)
                                                if (address !== "0x0000000000000000000000000000000000000000"){
                                                    this.setState({request : true})
                                                    this.setState({passengerAddress : address})


                                                    var myHeaders = new Headers();
                                                    myHeaders.append("Content-Type", "application/json");
                                                    
                                                    var raw = JSON.stringify({"hash": MDBHash ,"address": address});
                                                    
                                                    var requestOptions = {
                                                      method: 'POST',
                                                      headers: myHeaders,
                                                      body: raw,
                                                      redirect: 'follow'
                                                    };
                                                    
                                                    fetch("http://localhost:3005/getDriverData", requestOptions)
                                                      .then(response => response.text())
                                                      .then(result => {
                                                          console.log(result)
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
        this.setState({request : false})
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
                {this.state.validation === "Driver" && this.state.request  === true
                ? 
                <div className="dashboard-requests-div">
                    <DashboardCard no={this.clickNo()} yes={this.clickYes()} account={this.state.passengerAddress}/>

                </div>
                :
                null
                }
            </div>
        );
    }
}
 
export default Dashboard;