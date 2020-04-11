import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigatorHistogram from "./../BarNavigatorHistogram";



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      actualData: []
    }

  }

  componentWillReceiveProps(nextProps, nextContent) {
    if (this.state.actualData.length === 0) this.setState({ actualData: nextProps.cases })
  }


  chartOptions = () => {

    const { active } = this.state;

    return ({
      chart: { backgroundColor: "#000000", lineColor: "red", style: { color: "red" }, type: "line" },
      title: {
        text: 'Evolução do Coronavírus no Brasil',
        style: { color: "red", fontFamily: "Oswald, sans-serif", fontSize: 20 },
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: "",
          style: { color: "red", fontFamily: "Oswald, sans-serif", fontSize: 17 }
        },
        lineColor: '#FF0000',
        lineWidth: 1,
        labels: {
          style: {
            color: "white"
          }
        },
        gridLineColor: "red"

      },
      xAxis: {
        categories: this.props.dates,
        tickColor: "red",
        lineColor: '#FF0000',
        lineWidth: 1,
        labels: {
          style: {
            color: "white"
          }
        }
      },


      labels: {
        style: { color: "red" }
      },
      legend: {

        itemStyle: { color: "red", cursor: "default", fontFamily: "Oswald, Sans-serif", fontSize: 20, squareSymbol: true },
        itemHoverStyle: { color: "white" },
        borderWidth: 2,
        borderColor: "red",
        symbolHeight: 100,
        symbolWidth: 30,
        symbolRadius: 50,
        symbolColor: "white"


      },

      series: [{
        name: "Casos",
        data: [...this.props.cases], lineColor: "red", marker: { fillColor: "red" }, showInLegend: true,
        color : "red"

      }, {
        name: "Mortes",
        data: [...this.props.deaths], lineColor: "white", marker: { fillColor: "white" }, showInLegend: true,
        color: "white"
      }],



    })
  }



  getData = (index) => {
    return {
      0: this.props.cases,
      1: this.props.deaths
    }[index]
  }


  render() {

    const { cases } = this.props;
    const { active } = this.state;
    const loading = cases.length === 0;


    return (

      <div style={{ ...styles.container, order: this.props.order }}>

        {loading ? <GridLoader
          css={override}
          size={20}
          color={"red"}
          loading={loading}

        /> :
          <HighchartsReact
            constructorType={'chart'}
            highcharts={Highcharts}
            options={this.chartOptions()}
            containerProps={styles.chartContainer}
          />}

      </div>);

  }
}
export default LineChart;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 300,
    border: "solid 2px red",
    marginBottom: 20,
    padding: 14,
  },
  chartContainer: {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    }
  }


}
