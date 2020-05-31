import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
  DiscreteColorLegend
} from 'react-vis';


const greenData = [{x: '$0-$5', y: 10}, {x: '$5-$10', y: 5}, {x: '$10-$15', y: 15}, {x: '$15-$20', y: 15}];

const blueData = [{x: '$0-$5', y: 12}, {x: '$5-$10', y: 2}, {x: '$10-$15', y: 11}, {x: '$15-$20', y: 12}];

const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y)
}));

const ITEMS = [
    {title: 'Night', color: "#8793ff"},
    {title: 'Day', color: '#5d6cf5' }
  ];


export default class Example extends React.Component {
  state = {
    useCanvas: false
  };

  render() {
    const {useCanvas} = this.state;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
        <XYPlot xType="ordinal" width={800} height={300} xDistance={100}>
            <DiscreteColorLegend orientation="vertical" width={300} items={ITEMS}/>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" color="#8793ff" data={greenData} />
          <BarSeries data={blueData} color="#5d6cf5"/>
        </XYPlot>
      </div>
    );
  }
}