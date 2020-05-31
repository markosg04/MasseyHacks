import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import {BrowserRouter, Switch, Route} from "react-router-dom"





import "./App.css";

import Navbar from "./Components/Navbar/Navbar.js"
import Map from "./Pages/Map/Map.js"
import Order from "./Pages/Order/Order.js"
import Dashboard from "./Pages/Dashboard/Dashboard.js"
import History from "./Pages/History/History"
import Driver from "./Pages/Driver/Driver"


import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const THEME = createMuiTheme({
  typography: {
   "fontFamily": "'Ubuntu', sans-serif",

  },
  palette : {
    primary : {
      main: '#3A719B',
    },
    secondary : {
      main: '#3A719B',
    }
  }
});

class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      account: null,
      contract: null,
      longitude: null,
      latitude: null,
      validation: null
    }
  }

  showPosition = pos => {
    this.setState({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    })
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const account = accounts[0];

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
          })
          .catch(error => console.log('error', error));

      })
      .catch(error => console.log('error', error));

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <MuiThemeProvider theme={THEME}>

        <BrowserRouter>
          <div className="App">
            <Navbar/>
            <div className="app-content-div">
              <Switch>
                <Route path="/map">
                  <Map/>
                </Route>
                <Route path="/order">
                  <Order/>
                </Route>
                <Route path="/dashboard">
                  <Dashboard/>
                </Route>
                <Route path="/history">
                  <History/>
                </Route>
                <Route path="/driver">
                  <Driver account={this.state.account} />
                </Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
