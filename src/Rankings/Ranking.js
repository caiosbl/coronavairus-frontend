import React from 'react';
import Card from '../Components/Card';
import { CoronavairusApi } from '../Services/Api';

class Ranking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filter: "",
            type: 0
        }

    }

    componentDidMount = async () => {
        this.getData();
    }

    getData = async () => {
        CoronavairusApi.get("/state/last").then(res => {
            const data = res.data;
            this.setState({ data: data });
        });
    }

    getType = () => {
        return {
            0: "cases",
            1: "deaths",
            2: "suspects"
        }
    }

    getDeltaColor = (value) => {
        return value > 0 ? 'red' : value < 0 ? 'green' : 'black';
    }

    formatDelta = (value) => {
        const number = Number(value.toFixed(2));
        return number !== 0 ? number > 0 ? `+${number}%` : `${number}%` : "-";
    }

    formatValue = (value) => {
        return value > 0 ? `+${value.toLocaleString()}` : '-';
    }

    getFilteredData = () => {
        const { data, type, filter } = this.state;
        return data.sort((a, b) => b[this.getType()[type]] - a[this.getType()[type]]).filter(l => l.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }


    render() {

        const { order } = this.props;
        const { data, filter } = this.state;
        const loading = data.length === 0;

        return (

            <Card height={600} order={order} title={'Brasil'} loading={loading}>


                {!loading && <div style={styles.findContainer}>
                    <input type="text" value={filter} style={styles.findInput} onChange={(e) => this.setState({ filter: e.target.value })} placeholder={"Buscar por um Estado"} />
                </div>}

                {!loading && <div style={styles.container}>

                    {this.getFilteredData().map((d, i) => {

                        const cases = d.cases;
                        const deaths = d.deaths;
                        const mortalRate = d.mortalityRate;
                        const newCases = d.newCases;
                        const newDeaths = d.newDeaths;
                        const deltaMortalRate = d.deltaMortalityRate;
                        const name = d.name;


                        return (<div key={i} style={styles.stateContainer}>

                            <div style={styles.title}><b>{name}</b></div>

                            <div style={styles.valuesContainer}>

                                <div style={styles.values}>
                                    <div style={{ ...styles.newValues, color: this.getDeltaColor(newCases) }}>{this.formatValue(newCases)}</div>
                                    <div style={styles.value}><b>{cases.toLocaleString()}</b></div>
                                    <div><b>Casos</b></div>
                                </div>

                                <div style={styles.values}>
                                    <div style={{ ...styles.newValues, color: this.getDeltaColor(newDeaths) }}>{this.formatValue(newDeaths)}</div>
                                    <div style={styles.value}><b>{deaths.toLocaleString()}</b></div>
                                    <div><b>Mortes</b></div>
                                </div>

                                <div style={styles.values}>
                                    <div style={{ ...styles.newValues, color: this.getDeltaColor(Number(deltaMortalRate.toFixed(2))) }}>{this.formatDelta(deltaMortalRate)}</div>
                                    <div style={styles.value}><b>{mortalRate.toFixed(2)}%</b></div>
                                    <div><b>Mortalidade</b></div>
                                </div>

                            </div>

                        </div>
                        )
                    })}
                </div>}

            </Card>);
    }

}


export default Ranking;

const styles = {
    container: {
        height: "100%",
        width: "100%",
        overflow: "auto"
    },

    stateContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "99%",
        height: 130,
        borderBottom: 'solid 1px red',
        borderTop: 'solid 1px red',
        marginBottom: 10
    },

    findContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 20,
        marginBottom: 20

    },

    valuesContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },

    findInput: {
        width: "100%",
        height: 20,
        borderColor: "red",
        fontSize: 20,
        border: "solid 1px red",
        backgroundColor: "transparent",
        color: "red",
        padding: 10,
    },

    title: {
        fontSize: 20,
        marginBottom: 5,
        marginTop: 5
    },


    values: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "30%",
    },

    value: {
        fontSize: 23,
    },

    newValues: {
        textAlign: "center",
        width: "60%",
        color: "red",
        fontSize: 17
    },
    subtitle: {
        width: "100%",
        fontSize: 15,
    }
}