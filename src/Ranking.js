import React from 'react';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigator from './BarNavigator';
import Card from './Components/Card';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;





class Ranking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            title: "",
            data: [],
            filter: "",
            type: 0
        }

    }

    getType = () => {
        return {
            0: "cases",
            1: "deaths",
            2: "suspects"
        }
    }


    render() {

        const { data, color, initial, end, order } = this.props;
        const { filter, type } = this.state;
        const loading = data.length === 0;

        return (

            <Card height={600} order={order} title={'Brasil'}>

                {loading && <GridLoader
                    css={override}
                    size={20}
                    color={"red"}
                    loading={loading}

                />}

             
                {!loading && <div style={styles.findContainer}>
                    <input type="text" value={filter} style={styles.findInput} onChange={(e) => this.setState({ filter: e.target.value })} placeholder={"Buscar por um Estado"} />
                </div>}

                {!loading && <div style={{ height: "100%", width: "100%", overflow: "auto" }}>

                    {data.sort((a, b) => b.latest[this.getType()[type]] - a.latest[this.getType()[type]]).filter(l => l.name.toLowerCase().indexOf(filter.toLowerCase()) > -1).map((d, i) => {

                        const actualDay = Object.values(d.data).slice(-1)[0];
                        const previousDay = Object.values(d.data).slice(-2, -1)[0];

                        const cases = actualDay.cases;
                        const deaths = actualDay.deaths;
                        const mortalRate = (deaths / cases) * 100;

                        const newCases = cases - (previousDay.cases);
                        const newDeaths = deaths - (previousDay.deaths);
                        const deltaMortalRate = mortalRate - ((previousDay.deaths / previousDay.cases) * 100)

                        const name = d.name;


                        return (<div key={i} style={styles.stateContainer}>

                            <div style={{ fontSize: 20, marginBottom: 5, marginTop: 5 }}><b>{name}</b></div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>

                                <div style={styles.values}>
                                    <div style={{ ...styles.newValues, color: newCases > 0 ? 'red' : 'black' }}>{newCases > 0 ? "+" + newCases.toLocaleString() : "-"}</div>
                                    <div style={styles.value}><b>{cases.toLocaleString()}</b></div>
                                    <div><b>Casos</b></div>
                                </div>

                                <div style={styles.values}>
                                    <div style={{ ...styles.newValues, color: newDeaths > 0 ? 'red' : 'black' }}>{newDeaths > 0 ? "+" + newDeaths.toLocaleString() : "-"}</div>
                                    <div style={styles.value}><b>{deaths.toLocaleString()}</b></div>
                                    <div><b>Mortes</b></div>
                                </div>

                                <div style={styles.values}>
                                    <div style={{ ...styles.newValues, color: Number(deltaMortalRate.toFixed(2)) > 0.00 ? 'red' : Number(deltaMortalRate.toFixed(2)) < 0.00 ? 'green' : 'black' }}>{Number(deltaMortalRate.toFixed(2)) !== 0.00 ? (Number(deltaMortalRate.toFixed(2)) > 0.000 ? `+${deltaMortalRate.toFixed(2)}%` : `${deltaMortalRate.toFixed(2)}%`) : "-"}</div>
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
    values: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "30%",
    },

    title: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        backgroundColor: "red",
        width: "100%",
        marginBottom: 5
    },

    findContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
        marginBottom: 15
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
        width: "100%", fontSize: 15,
    }
}