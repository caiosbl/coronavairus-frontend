import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigator from './../BarNavigator';
import BarNavigatorMap from './../BarNavigatorMap';
import WorldMap from './../WorldMap';
import { GeoJson, GeoJsonWorld } from './../Services/Api';


require('highcharts/modules/map')(Highcharts);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;




const INITIAL_GRADIENT = "#ffeded";
const MEDIUM_GRADIENT = "rgb(170,59,55)";
const END_GRADIENT = "#db0909";


const colorScale = [
  [0, 'rgb(243,211,194)'],
  [0.01, 'rgb(243, 197, 194)'],
  [0.02, 'rgb(242, 163, 157)'],
  [0.03, 'rgb(245, 140, 132)'],
  [0.04, 'rgb(240, 99, 89)'],
  [0.05, 'rgb(237, 82, 71)'],

  [0.1, 'rgb(237, 62, 50)'],
  [0.3, 'rgb(232, 43, 30)'],
  [0.6, 'rgb(237, 35, 21)'],
  [1, 'rgb(255, 17, 0)']
]



class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoJson: [],
      geoJsonWorld: [],
      mapActual: [],
      type: 0,
      mapType: 0,
      worldType: 0,
      world: { cases: [], deaths: [], recovered: [] },

    }
  }
  async componentDidMount() {
    this.getData();
  }

  async componentWillReceiveProps(nextProps, nextContent) {
    if (this.state.mapActual.length === 0) {
      this.setState({ mapActual: nextProps.brazil.map.cases });
    }
  }

  getLegend = () => {
    const types = {
      0: "Casos",
      1: "Mortes",
      2: "Taxa de Mortalidade"
    }

    return types[this.state.type];
  }
  mapOptions = () => {
    const format = (number) => this.state.type === 2 ? number.toFixed(2) + "%" : number;
    return {
      chart: {
        map: this.state.geoJson,
        backgroundColor: "#000000",
      },
      credits: {
        enabled: false
      },
      title: {
        text: "",

      },
      colorAxis: {
        type: this.getScale()[this.state.type],
        minColor: "#ffeded",
        maxColor: "#db0909",


      },

      legend: {
        enabled: true
      },
      mapNavigation: {
        enabled: true,
        enableButtons: false,
      },
      xAxis: {
        labels: {
          enabled: false
        }
      },

      tooltip: {
        pointFormatter: function () {
          return `<div><b>${this.name}: </b> <b>${format(this.value)}</b><br/></div>`
        },
      

      },
      series: [{
        data: [...this.state.mapActual],
        name: this.mapDetails()[this.state.type]["details"],
        borderColor: "white",
        borderWidth: 0.5,
        states: {
          hover: {
            borderColor: 'red',
            borderWidth: 5
          }
        },
        dataLabels: {
          enabled: true,
          allowOverlap: true,
          formatter: function () {
            return this.point.properties['hc-a2'];
          },
          style: {
            fontSize: '1.5vmin',

          }
        }
      }]
    }
  }



  mapData = () => {

    const { cases, deaths, suspects, mortalRate } = this.props.brazil.map;
    return {
      0: cases,
      1: deaths.filter(v => v[1] > 0),
      2: mortalRate.filter(v => v[1] > 0)
    }
  }

  mapDetails = () => {
    return {
      0: { title: "Casos de Coronavírus por Estado", details: "Casos de Coronavírus" },
      1: { title: "Mortes pelo Coronavírus por Estado", details: "Mortes por Coronavírus" },
      2: { title: "Mortalidade do Coronavírus por Estado", details: "Taxa de Mortalidade" },

    }
  }

  getScale = () => {
    return {
      0: "logarithmic",
      1: "logarithmic",
      2: "logarithmic",


    }
  }

  worldDetails = () => {
    return {
      0: { title: "Casos de Coronavírus no Mundo", details: "Casos de Coronavírus" },
      1: { title: "Mortes pelo Coronavírus no Mundo", details: "Mortes por Coronavírus" },
      2: { title: "Casos curados de Coronavírus no Mundo", details: "Casos Curados de Coronavírus" },

    }
  }


  getData = () => {

    GeoJson.get("").then(res => {
      const geodata = res.data;
      this.setState({ geoJson: geodata })
    }).catch(e => console.log(e));

    GeoJsonWorld.get("").then(res => {
      const geodata = res.data;
      this.setState({ geoJsonWorld: geodata })
    }).catch(e => console.log(e));

  }

  toNumber = (number) => Number(number.replace(",", ""));



  render() {

    const { geoJson, type, mapType, mapActual, worldType, geoJsonWorld } = this.state;
    const { world, brazil } = this.props;



    const data = mapActual;
    const brazilMap = mapType === 0;

    const loading = data.length === 0 || geoJson.length === 0;
    const loadingWorld = world.cases === 0 || geoJsonWorld.length === 0;



    return (<div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%",
      height: "100%", minHeight: 500, padding: 14, marginBottom: 30, order: this.props.order, border: "solid 2px red"
    }}>

      <div style={{ display: "flex", flexFlow: "row wrap", alignItems: "center", width: "100%" }}>
        {!loading && <div><BarNavigatorMap active={mapType} setActive={(type) => this.setState({ mapType: type })} /></div>}
        {!loading && brazilMap && <BarNavigator active={type} setActive={(type) => this.setState({ type: type, mapActual: this.mapData()[type] })} />}
        {!loading && !brazilMap && <BarNavigator active={worldType} options={["Casos", "Mortes", "Curados"]} setActive={(type) => this.setState({ worldType: type })} />}

      </div>


      {loading && <GridLoader
        css={override}
        size={20}
        color={"red"}
        loading={loading}
      />}

      {!loading && brazilMap && <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "red", marginTop: 20 }}>{this.mapDetails()[type]["title"]}</div>}
      {!loadingWorld && !brazilMap && <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "red", marginTop: 20 }}>{this.worldDetails()[worldType]["title"]}</div>}

      {!loading && brazilMap && <HighchartsReact
        constructorType={'mapChart'}
        highcharts={Highcharts}
        options={this.mapOptions()}
        allowChartUpdate={true}
        containerProps={{ style: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "stretch", height: 500, width: "100%" } }}
      />}

      {!loadingWorld && !brazilMap && <WorldMap type={worldType}
        cases={world.cases} deaths={world.deaths} recovered={world.recovered} geoJson={geoJsonWorld}

      />}


    </div >);


  }
}
export default Map;
