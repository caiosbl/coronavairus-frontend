import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { GeoJson, CoronavairusApi } from '../../Services/Api';
import BarNavigator from '../../BarNavigator';
require('highcharts/modules/map')(Highcharts);



class BrazilMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoJson: [],
      cases: [],
      deaths: [],
      mortalRate: [],
      tests: [],
      type: 0,
    }
  }
  async componentDidMount() {
    this.getData();
    this.props.handleLoading(true);
  }


  componentWillUpdate(nextProps, nextState, nextContext) {
    const {cases,deaths,mortalRate, tests, geoJson} = this.state;
    const loading = cases.length === 0 || deaths.length === 0 || mortalRate.length === 0 || tests.length === 0 || geoJson.length === 0;
    const nextLoading = nextState.cases.length === 0 || nextState.deaths.length === 0 || nextState.mortalRate.length === 0 || nextState.tests.length === 0 || nextState.geoJson.length === 0;

    if (loading && !nextLoading) this.props.handleLoading(false);
  }

  getData = async () => {

    GeoJson.get("").then(res => {
      const geodata = res.data;
      this.setState({ geoJson: geodata })
    }).catch(e => console.log(e));


    CoronavairusApi.get("/state/last").then(res => {
      const data = res.data;

      const cases = data.map(state => [`br-${String(state.uf).toLowerCase()}`, state.cases]);
      const deaths = data.map(state => [`br-${String(state.uf).toLowerCase()}`, state.deaths]);
      const mortalRate = data.map(state => { return [`br-${String(state.uf).toLowerCase()}`, state.mortalityRate] });

      this.setState({ cases, deaths, mortalRate });

    }).catch(e => console.log(e));

    CoronavairusApi.get("/test/last").then(res => {

      const dataReq = res.data;
      const tests = dataReq.map(state => [`br-${String(state.uf).toLowerCase()}`, state.numberOfTests]);

      this.setState({ tests });

    }).catch(e => console.log(e));

  }


  getLegend = () => {
    const types = {
      0: "Casos",
      1: "Mortes",
      2: "Taxa de Mortalidade",
      3: "Testes Rápidos de Covid-19"
    }

    return types[this.state.type];
  }


  getMapData = () => {

    const { cases, deaths, mortalRate, tests } = this.state;

    return {
      0: cases.filter(v => v[1] > 0),
      1: deaths.filter(v => v[1] > 0),
      2: mortalRate.filter(v => v[1] > 0),
      3: tests.filter(v => v[1] > 0)
    }
  }

  getMapDetails = () => {
    return {
      0: { title: "Casos de Coronavírus por Estado", details: "Casos de Coronavírus" },
      1: { title: "Mortes pelo Coronavírus por Estado", details: "Mortes por Coronavírus" },
      2: { title: "Mortalidade do Coronavírus por Estado", details: "Taxa de Mortalidade" },
      3: { title: "Testes Rápidos de Coronavírus distribuídos pelo Ministério da Saúde", details: "Testes Rápidos" },
    }
  }

  getScale = () => {
    return {
      0: "logarithmic",
      1: "logarithmic",
      2: "logarithmic",
      3: "logarithmic",
    }
  }

  mapOptions = () => {
    const format = (number) => this.state.type === 2 ? number.toFixed(2) + "%" : number.toLocaleString();
    const { geoJson, type } = this.state;

    return {
      chart: {
        map: geoJson,
        backgroundColor: "#000000",
      },

      credits: {
        enabled: false
      },

      title: {
        text: "",
      },

      colorAxis: {
        type: this.getScale()[type],
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
          return `<div><b>${this.name}: </b> <div>${format(this.value)}</div><br/></div>`
        },


      },
      series: [{
        data: [...this.getMapData()[type]],
        name: this.getMapDetails()[type]["details"],
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

  render() {

    const { geoJson, type, cases, deaths, mortalRate, tests } = this.state;
    const loading = cases.length === 0 || deaths.length === 0 || mortalRate.length === 0 || tests.length === 0 || geoJson.length === 0;

    return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

      {!loading && <BarNavigator active={type} setActive={(type) => this.setState({ type })} brazil />}
      {!loading && <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "red", marginTop: 20 }}>{this.getMapDetails()[type]["title"]}</div>}

      {!loading && <HighchartsReact
        constructorType={'mapChart'}
        highcharts={Highcharts}
        options={this.mapOptions()}
        allowChartUpdate={true}
        containerProps={{ style: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "stretch", height: 500, width: "100%" } }}
      />}



    </div>);


  }
}
export default BrazilMap;
