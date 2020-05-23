import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import BarNavigator from '../../BarNavigator';
import { GeoJsonWorld as GeoJson, CoronavairusApi } from '../../Services/Api';
require('highcharts/modules/map')(Highcharts);

class WorldMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            deaths: [],
            recovered: [],
            geoJson: [],
            type: 0,
            lastData: new Date()
        }
    }

    async componentDidMount() {
        this.chartRef = React.createRef();
        this.getData();
        this.props.handleLoading(true);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const {cases,deaths,recovered, geoJson} = this.state;
        const loading = cases.length === 0 || deaths.length === 0 ||  recovered.length === 0 || geoJson.length === 0;
        const nextLoading = nextState.cases.length === 0 || nextState.deaths.length === 0 || nextState.recovered.length === 0 || nextState.geoJson.length === 0;
    
        if (loading && !nextLoading) this.props.handleLoading(false);
      }

    getData = () => {
        CoronavairusApi.get("/country").then(res => {
            const data = res.data;
            const cases = data.map(state => [state.isoA2, state.totalCases]);
            const deaths = data.map(state => [state.isoA2, state.totalDeaths]);
            const recovered = data.map(state => [state.isoA2, state.totalRecovered]);

            this.setState({ cases, deaths, recovered, });

        }).catch(e => console.log(e))

        GeoJson.get("").then(res => {
            const geodata = res.data;
            this.setState({ geoJson: geodata })
        }).catch(e => console.log(e));
    }

    getMapDetails = () => {

        return {
            0: { title: "Casos de Coronavírus no Mundo", details: "Casos de Coronavírus" },
            1: { title: "Mortes pelo Coronavírus no Mundo", details: "Mortes por Coronavírus" },
            2: { title: "Casos curados de Coronavírus no Mundo", details: "Casos Curados de Coronavírus" },

        }
    }

    getScale = () => {
        return {
            0: "logarithmic",
            1: "logarithmic",
            2: "logarithmic",
        }
    }

    getMapData = () => {

        const { cases, deaths, recovered } = this.state;

        return {
            0: cases.filter(v => v[1] > 0),
            1: deaths.filter(v => v[1] > 0),
            2: recovered.filter(v => v[1] > 0)
        }
    }

    getMapOptions = () => {

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
                enabled: true,
            },
            mapNavigation: {
                enabled: true,
                enableDoubleClickZoomTo: true,
                enableTouchZoom: true
            },

            xAxis: {
                labels: {
                    enabled: false
                }
            },
            series: [{
                data: [...this.getMapData()[type]],
                borderColor: "black",
                borderWidth: 0.5,
                states: {
                    hover: {
                        borderColor: 'red',
                        borderWidth: 5
                    }
                },
                keys: ['iso-a2', 'value', 'name'],
                joinBy: "iso-a2",
                name: this.getMapDetails()[type]["details"],

                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return "";
                    },
                    style: {
                        fontSize: '1.5vmin',

                    }
                }
            }]
        }
    }



    render() {
        const { cases, geoJson, type } = this.state;

        const loading = cases.length === 0 || geoJson.length === 0;


        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                {!loading && <BarNavigator active={type} options={["Casos", "Mortes", "Curados"]} setActive={(type) => this.setState({type: type })} />}
                {!loading && <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 20, color: "red", marginTop: 20 }}>{this.getMapDetails()[type]["title"]}</div>}
                {!loading && <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={this.getMapOptions()}
                    allowChartUpdate={true}
                    ref={this.chartRef}
                    containerProps={{ style: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 500, width: "100%" } }}
                />}

            </div>);


    }
}


export default WorldMap;