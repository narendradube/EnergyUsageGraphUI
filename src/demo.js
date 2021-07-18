import * as React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
//import { consolidatedUsages   } from './consolidatedUsages';
//import { born as data } from './demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get(`https://localhost:44369/api/v1/consolidated/consumption/totalByMeter`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
  }
  render() {
    const { data: chartData } = this.state;
    return (
      <Paper>
        <Chart
          data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={17} />
          <BarSeries
            valueField="totalUsage"
            argumentField="meterCode"
          />
          <Title text="Energy Consumption (Total Usage, MeterCode)" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}