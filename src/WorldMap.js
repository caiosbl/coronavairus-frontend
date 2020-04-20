import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

require('highcharts/modules/map')(Highcharts);




const colorScale = [
    [0, 'rgb(243,211,194)'],
    [0.03, '#f3c2c2'],
    [0.04, '#db9e9e'],
    [0.05, '#c48080'],
    [0.1, '#a65e5e'],
    [0.3, '#a84a4a'],
    [0.6, '#a83838'],
    [1, '#b01c1c']
]

const INITIAL_GRADIENT = "#ffeded";
const END_GRADIENT = "#db0909";




class WorldMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            countryNames: [],
            cases: [],
            deaths: [],
            recovered: [],
            geoJson: [],
            showData: [],
            showIndex: 1,
            mapActual: [],
            lastData: new Date()
        }
    }

    async componentDidMount() {
        this.chartRef = React.createRef();

    }
    mapDetails = () => {




        return {
            0: { title: "Casos de Coronavírus no Mundo", details: "Casos de Coronavírus" },
            1: { title: "Mortes pelo Coronavírus no Mundo", details: "Mortes por Coronavírus" },
            2: { title: "Casos curados de Coronavírus no Mundo", details: "Casos Curados de Coronavírus" },

        }
    }



    mapData = () => {
        return {
            0: this.props.cases.filter(v => v[1] >0),
            1: this.props.deaths.filter(v => v[1] >0),
            2: this.props.recovered.filter(v => v[1] >0)
        }
    }
    mapOptions = () => {
        return {
            chart: {
                map: this.props.geoJson,
                backgroundColor: "#000000",
                events: {
                    load: function () {
                        this.mapZoom(0.5, 100, 100);
                    }
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: "",

            },
            colorAxis: {
                type: this.getScale()[this.props.type],
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
                data: [...this.mapData()[this.props.type]],
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
                name: this.mapDetails()[this.props.type]["details"],

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



    getScale = () => {
        return {
          0: "logarithmic",
          1: "logarithmic",
          2:"logarithmic",
        }
      }


    toNumber = (number) => Number(number.replace(",", ""));



    render() {

        const { type } = this.props;

        const data = this.mapData()[type];
        const map = data.map(d => d[1]);
        let values = [0, 0, 0];
        const min = Math.min(...map);
        const max = Math.max(...map);
        if ((data.length > 0)) values = [min, max / 2, max];



        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 400 }}>



                <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={this.mapOptions()}
                    allowChartUpdate={true}
                    ref={this.chartRef}
                    containerProps={{ style: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 500, width: "100%" } }}
                />



            </div>);


    }
}


export default WorldMap;