import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigatorHistogram from './../BarNavigatorHistogram';
import Card from '../Components/Card';
import { CoronavairusApi } from '../Services/Api';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Histogram extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeData: 0,
      dates: [],
      cases: [],
      deaths: [],
      casesByDay: [],
      deathsByDay: []
     
    }

  }


 

  componentDidMount() {
    CoronavairusApi.get("/brazil").then(res => {

      let timeline = res.data;
      if (timeline.slice(-2)[0].totalCases === timeline.slice(-1)[0].totalCases)
        timeline = timeline.slice(0, timeline.length - 1);

      const dates = timeline.map(d => `${d.date.split("-")[2].split("T")[0]}/${d.date.split("-")[1]}`);
      const cases = timeline.map(d => d.totalCases);
      const deaths = timeline.map(d => d.totalDeaths);
      let casesByDay = timeline.map(d => d.newCases);;
      let deathsByDay = timeline.map(d => d.newDeaths);;

      this.setState({ dates, cases,  deaths, casesByDay, deathsByDay });

    }).catch(e => console.log(e))
  }


  histogramOptions = () => {
    const { activeData } = this.state;
    const {dates, cases, deaths, casesByDay, deathsByDay} = this.state;

    return ({
      chart: { backgroundColor: "#000000", lineColor: "red", style: { color: "red" } },
      title: {
        text: this.getTitle(this.state.activeData),
        style: { color: "red", fontFamily: "Oswald, sans-serif", fontSize: 20 },
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: `Número de ${activeData === 0 ? "Casos" : "Mortes"}`,
          style: { color: "red", fontFamily: "Oswald, sans-serif", fontSize: 17 }
        },

        labels: {
          style: {
            color: "white"
          }
        },
        gridLineColor: "red"

      },
      xAxis: {
        categories: dates,
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
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        column: {
          pointPadding: 1,
          borderWidth: 1,
          borderColor: "black",
          groupPadding: 1,
          backgroundColor: "red",
          shadow: false,
          color: "red"
        }
      },

      series: [{
        name: activeData === 0 ? "Casos confirmados" : "Mortes confirmadas",
        data: [...this.getMapData()],
        lineColor: "red", marker: { fillColor: "red" },
        type: "column"
      }],



    })
  }

  getMapData = () => {
    const { casesByDay, deathsByDay, activeData } = this.state;
    const index = activeData;

    return {
      0: casesByDay,
      1: deathsByDay
    }[index]
  }

  getTitle = (index) => {
    return {
      0: "Casos de Coronavírus confirmados por dia no Brasil",
      1: "Mortes por Coronavírus confirmados por dia no Brasil"
    }[index]
  }



  render() {

    const { activeData, cases } = this.state;
    const {order} = this.props;
    const loading = cases.length === 0;


    return (

      <Card order={order} minHeight={300} loading={loading}>

        {!loading &&
          <BarNavigatorHistogram active={activeData}
            setActive={(active) => this.setState({ activeData: active, actualData: this.getMapData(active) })}
            options={["Casos por Dia", "Mortes por Dia"]} />}

        {!loading &&
          <HighchartsReact
            constructorType={'chart'}
            highcharts={Highcharts}
            options={this.histogramOptions()}
            containerProps={styles.containerChart}
          />}

      </Card>);

  }
}
export default Histogram;

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
  containerChart: {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    }
  }
}
