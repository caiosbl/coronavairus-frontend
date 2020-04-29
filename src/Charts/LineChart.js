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
      actualData: [],
      showData: { 0: true, 1: true, 2: true, 3: true }
    }

  }

  componentWillReceiveProps(nextProps, nextContent) {
    if (this.state.actualData.length === 0) this.setState({ actualData: nextProps.cases })
  }


  chartOptions = () => {

    const { active, showData } = this.state;
    const { prediction, predictionDeaths, cases, deaths } = this.props;
    let lastCase = cases?.slice(-1)[0];
    let lastDeath = deaths?.slice(-1)[0];



    const series = []



    if (showData[0] && showData[1]) series.push({
      name: "Previsão de Casos",
      data: this.props.cases.concat([...prediction.map(v => {

        const predict = lastCase + v.y;
        lastCase = predict;
        return predict;


      })]),
      lineColor: "yellow",
      marker: { fillColor: "yellow" },
      showInLegend: false,
      color: "yellow",
      labelrank: -1,
      marker: { enabled: false, symbol: "circle" }
    })

    if (showData[2] && showData[3]) series.push({
      name: "Previsão de Mortes",
      data: this.props.deaths.concat([...predictionDeaths.map(v => {

        const predict = lastDeath + v.y;
        lastDeath = predict;
        return predict;


      })]),
      lineColor: "#f826d6",
      marker: { fillColor: "#f826d6" },
      showInLegend: false,
      color: "#f826d6",
      labelrank: -1,
      marker: { enabled: false, symbol: "circle" }
    })

    if (showData[0]) series.push({
      name: "Casos",
      data: [...this.props.cases],
      lineColor: "red",
      marker: { fillColor: "red" },
      showInLegend: false,
      color: "red",
      labelrank: -1000,
      marker: { enabled: false, symbol: "circle" }

    })


    if (showData[2]) series.push({
      name: "Mortes",
      data: [...this.props.deaths], lineColor: "white", marker: { fillColor: "white" }, showInLegend: false,
      color: "white",
      marker: { enabled: false, symbol: "circle" }
    })


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
        categories: this.props.dates.concat(prediction.map(v => v.x)),
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

      series: series


    })

  }



  getData = (index) => {
    return {
      0: this.props.cases,
      1: this.props.deaths
    }[index]
  }


  render() {

    const { cases, prediction, predictionDeaths } = this.props;
    const { active, showData } = this.state;
    const showCases = showData[0];
    const showPredict = showData[1];
    const showDeaths = showData[2];
    const showPredictDeath = showData[3];
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

        {!loading && <div style={{ fontFamily: "Oswald, Sans Serif", fontSize: 13 }}>
          Clique na legenda para exibir ou ocultar
          </div>}
        <div style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: 'center',
          width: "100%",
        }}>

          {!loading && <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: "40%",
            minWidth: 200
          }}>

            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", margin: 5,
              justifyContent: "center", width: "10%", height: "70%", minWidth: 150,
              border: "solid 2px red", color: "red", fontFamily: "Oswald, Sans Serif",
              userSelect: 'none'
            }} onClick={() => this.setState({ showData: { ...showData, 0: !showCases } })}>Casos</div>


            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", margin: 5,
              justifyContent: "center", width: "10%", height: "70%", minWidth: 150,
              border: "solid 2px white", color: "white", fontFamily: "Oswald, Sans Serif",
              userSelect: 'none'
            }} onClick={() => this.setState({ showData: { ...showData, 2: !showDeaths } })}>Mortes</div>



          </div>}



          {!loading && <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: "40%",
            minWidth: 200
          }}>

            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", margin: 5,
              justifyContent: "center", width: "10%", height: "70%", minWidth: 150,
              border: "solid 2px yellow", color: "yellow", fontFamily: "Oswald, Sans Serif",
              userSelect: 'none'
            }} onClick={() => this.setState({ showData: { ...showData, 1: !showPredict } })}>Previsão de Casos</div>

            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", margin: 5,
              justifyContent: "center", width: "10%", height: "70%", minWidth: 150,
              border: "solid 2px #f826d6", color: "#f826d6", fontFamily: "Oswald, Sans Serif",
              userSelect: 'none'
            }} onClick={() => this.setState({ showData: { ...showData, 3: !showPredictDeath } })}>Previsão de Mortes</div>



          </div>}

        </div>

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
