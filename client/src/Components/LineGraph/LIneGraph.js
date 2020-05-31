import React, { Component } from 'react';


import '../../../node_modules/react-vis/dist/style.css';

import {XYPlot, LineSeries, YAxis, XAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';

class GraphLine extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <XYPlot 
            height={280} 
            width= {800}
            xType="ordinal"
            className="patient-view-mood-graph-timeline"
            >
                    <XAxis />
                    <YAxis />
                    <LineSeries 
                    data={this.props.data}
                    color="#5d6cf5"
                    curve={'curveMonotoneX'}
                    animation="gentle"
                    />
            </XYPlot>
        );
    }
}
 
export default GraphLine;