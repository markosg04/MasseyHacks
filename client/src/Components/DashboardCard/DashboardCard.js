import React, { Component } from 'react';

import "./DashboardCard.css"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = {
    accept: {
        background: "#5f9650",
        margin: "5px",
        color: "white",
        "&:hover": {
            background: "#335c28"
        }
    },
    report: {
        background: "#a82f2f",
        margin: "5px",
        color: "white",
        "&:hover": {
            background: "#701a1a"
        }
    },
}


class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    onSubmitNo = () => {
        this.props.no()
    }
    onSubmitYes = () => {
        this.props.yes()
    }

    render() { 
        const { classes } = this.props;

        return (
            <div className="dashboard-card-div">
                <div className="driver-card-left">
                    <div className="driver-card-picture-div">
                        <div className="driver-card-picture-icon"></div>
                    </div>
                    <div className="driver-card-text-content-div">
                        <div className="dashboard-card-title">{this.props.name}</div>
                        <div className="driver-card-last-check">5 kilometers away</div>
                        <div className="driver-card-last-appointment">Destination: 20km away</div>
                    </div>
                </div>
                <div className="history-card-right">
                    <Button variant="contained" classes={{ root: classes.accept }} onClick={this.onSubmitYes}> Yes </Button>
                    <Button variant="contained" classes={{ root: classes.report }} onClick={this.onSubmitNo}> No </Button>
                    <div style={{width: "20px"}}/>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(DashboardCard);
