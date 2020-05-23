import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigatorHistogram from "./../BarNavigatorHistogram";
import Card from '../Components/Card';
import { CoronavairusApi } from '../Services/Api';



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
      showData: { 0: true, 1: true, 2: true, 3: true },
      dates: [],
      cases: [],
      deaths: [],
      prediction: [],
      predictionDeaths: []
    }

  }


  componentDidMount() {
    this.getData();
  }

  getData = () => {
    CoronavairusApi.get("/brazil").then(res => {

      let timeline = res.data;
      if (timeline.slice(-2)[0].totalCases === timeline.slice(-1)[0].totalCases)
        timeline = timeline.slice(0, timeline.length - 1);

      const dates = timeline.map(d => `${d.date.split("-")[2].split("T")[0]}/${d.date.split("-")[1]}`);
      const cases = timeline.map(d => d.totalCases);
      const deaths = timeline.map(d => d.totalDeaths);
      let casesByDay = timeline.map(d => d.newCases);;
      let deathsByDay = timeline.map(d => d.newDeaths);;

      this.setState({ dates, cases, deaths, casesByDay, deathsByDay });

    }).catch(e => console.log(e));

    CoronavairusApi.get("/prediction/last").then(res => {

      const formatDate = (date) => { return `${date.split("-")[2].split("T")[0]}/${date.split("-")[1]}` };

      const data = res.data;
      const prediction = data.map(prediction => { return { x: formatDate(prediction.date), y: prediction.cases.casesHighPrediction } });
      const predictionDeaths = data.map(prediction => { return { x: formatDate(prediction.date), y: prediction.deaths.deathsHighPrediction } });

      this.setState({ prediction: prediction, predictionDeaths: predictionDeaths });

    }).catch(e => console.log(e))
  }


  chartOptions = () => {

    const { active, showData, dates, cases, deaths, prediction, predictionDeaths } = this.state;
    let lastCase = cases?.slice(-1)[0];
    let lastDeath = deaths?.slice(-1)[0];

    const series = []

    if (showData[0] && showData[1]) series.push({
      name: "Previsão de Casos",

      data: cases.concat([...prediction.map(v => {
        const predict = lastCase + v.y;
        lastCase = predict;
        return predict;
      })]),

      lineColor: "red",
      marker: { fillColor: "red" },
      showInLegend: false,
      color: "red",
      labelrank: -1,
      marker: { enabled: false, symbol: "circle" },
      dashStyle: 'Dot'
    })

    if (showData[2] && showData[3]) series.push({
      name: "Previsão de Mortes",
      data: deaths.concat([...predictionDeaths.map(v => {

        const predict = lastDeath + v.y;
        lastDeath = predict;
        return predict;
      })]),

      lineColor: "white",
      marker: { fillColor: "white" },
      showInLegend: false,
      color: "white",
      labelrank: -1,
      marker: { enabled: false, symbol: "circle" },
      dashStyle: 'Dot'
    })

    if (showData[0]) series.push({
      name: "Casos",
      data: [...cases],
      lineColor: "red",
      marker: { fillColor: "red" },
      showInLegend: false,
      color: "red",
      labelrank: -1000,
      marker: { enabled: false, symbol: "circle" },
      dashStyle: 'Solid'


    })


    if (showData[2]) series.push({
      name: "Mortes",
      data: [...deaths], lineColor: "white", marker: { fillColor: "white" }, showInLegend: false,
      color: "white",
      marker: { enabled: false, symbol: "circle" },
      dashStyle: 'Solid'
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
        gridLineColor: "red",

      },
      xAxis: {
        categories: dates.concat(prediction.map(v => v.x)),
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




  render() {

    const {  order } = this.props;
    const {cases, prediction, predictionDeaths, active, showData } = this.state;
    const showCases = showData[0];
    const showPredict = showData[1];
    const showDeaths = showData[2];
    const showPredictDeath = showData[3];
    const loading = cases.length === 0;



    return (

      <Card order={order} minHeight={250} loading={loading}>

        {!loading &&
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
              border: "solid 1px red", color: "red", fontFamily: "Oswald, Sans Serif",
              userSelect: 'none', borderStyle: 'dotted'
            }} onClick={() => this.setState({ showData: { ...showData, 1: !showPredict } })}>Previsão de Casos</div>

            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", margin: 5,
              justifyContent: "center", width: "10%", height: "70%", minWidth: 150,
              border: "solid 1px white", color: "white", fontFamily: "Oswald, Sans Serif",
              userSelect: 'none', borderStyle: 'dotted'
            }} onClick={() => this.setState({ showData: { ...showData, 3: !showPredictDeath } })}>Previsão de Mortes</div>



          </div>}

        </div>

      </Card>);

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
