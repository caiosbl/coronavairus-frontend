import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigatorHistogram from './../BarNavigatorHistogram';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';
import ScaleLoader from "react-spinners/ScaleLoader";
import Card from '../Components/Card';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const options = {
    title: {
        display: false,
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        display: false,
        position: "bottom",
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, chart){
              
                const datasetLabel = chart.labels[tooltipItem.index] || '';
                const value = chart.datasets[0].data[tooltipItem.index] || '';
                return datasetLabel + ': ' + value.toLocaleString();
            }
        }
    }
}

class Doughnut extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeData: 0,
            actualData: []
        }
        this.chartReference = React.createRef();

    }




    data = () => {

        const { total, recovered, deaths } = this.props;



        const activeCases = total - (recovered + deaths);

        return {
            datasets: [{
                data: [deaths, activeCases, recovered],
                backgroundColor: ["red", "white", "green"],
                borderColor: ["red", "white", "green"],

            }],


            labels: [
                'Mortes',
                'Ativos',
                'Curados'
            ]
        };
    }


    render() {

        const { total, recovered, deaths, title } = this.props;
        const active = total - (recovered + deaths);

        const loading = !total || !recovered || !deaths;


        return (

            <Card title={title} height={'100%'} loading={loading}>

                    {!loading && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: '150%', marginTop: 20 }}>

                    <DoughnutChart ref={this.chartReference} data={this.data()} options={options} />

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: '-30%', marginBottom: '25%', fontFamily: "Oswald, sans-serif", }}>
                        <div style={{fontSize: '150%'}}>{total.toLocaleString()}</div>
                        <div style={{fontSize: '130%'}}>Casos</div>
                    </div>
                </div>}


                {!loading && <div style={{ width: "100%" }}>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontFamily: "Oswald, sans-serif", }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "30%" }}><div style={{ width: '20%', height: 15, backgroundColor: 'white', marginRight: 5 }}> </div>  <div>Ativos</div></div>
                        <div>{active.toLocaleString()}</div> <div>{((active / total) * 100).toFixed(2)}%</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontFamily: "Oswald, sans-serif" }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "30%" }}><div style={{ width: '20%', height: 15, backgroundColor: 'green', marginRight: 5 }}> </div>  <div>Curados</div></div>
                        <div>{recovered.toLocaleString()}</div> <div>{((recovered / total) * 100).toFixed(2)}%</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontFamily: "Oswald, sans-serif" }}>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "30%" }}><div style={{ width: '20%', height: 15, backgroundColor: 'red', marginRight: 5 }}> </div>  <div>Mortes</div></div>

                        <div>{deaths.toLocaleString()}</div> <div>{((deaths / total) * 100).toFixed(2)}%</div>
                    </div>


                </div>}

                </Card>
        );

    }
}
export default Doughnut;
