import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigatorHistogram from './../BarNavigatorHistogram';

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
      actualData: []
    }

  }


  componentWillReceiveProps(nextProps, nextContent) {
    if (this.state.actualData.length === 0) this.setState({ actualData: nextProps.casesByDay })
  }


  histogramOptions = () => {
    const { activeData } = this.state;

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
        data: [...this.state.actualData],
        lineColor: "red", marker: { fillColor: "red" },
        type: "column"
      }],



    })
  }

  getData = (index) => {
    const { casesByDay, deathsByDay } = this.props;

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

    const { activeData, actualData } = this.state;
    const loading = actualData.length === 0;


    return (

      <div style={{ ...styles.container, order: this.props.order }}>

        {!loading &&
          <BarNavigatorHistogram active={activeData}
           setActive={(active) => this.setState({ activeData: active, actualData: this.getData(active) })}
            options={["Casos por Dia", "Mortes por Dia"]} />}

        {loading ? <GridLoader
          css={override}
          size={20}
          color={"red"}
          loading={loading}

        /> :
          <HighchartsReact
            constructorType={'chart'}
            highcharts={Highcharts}
            options={this.histogramOptions()}
            containerProps={styles.containerChart}
          />}

      </div>);

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
