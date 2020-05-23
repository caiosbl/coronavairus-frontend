import React from 'react';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import Card from './Components/Card';
import {GiWorld} from 'react-icons/gi';
import { countriesPortuguese } from './portuguese';
import { CoronavairusApi } from './Services/Api';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



class RankingWorld extends React.Component {

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

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        CoronavairusApi.get("/country").then(res => {
            const data = res.data;
            let translated = [];
      
            data.forEach(country => {
      
              const translateMap = Object.values(countriesPortuguese).filter(v => v.alpha2.toUpperCase() === country.isoA2);
      
              if (translateMap.length > 0)
                translated.push({ ...country, Country: translateMap[0]["name"] });
              else
                translated.push(country);
            });
      
            this.setState({ data: translated } )
      
          }).catch(e => console.log(e))
    }

    getType = () => {
        return {
            0: "totalCases",
            1: "totalDeaths",
            2: "totalRecovered"
        }
    }


    render() {

        const {  order } = this.props;
        const { filter, type, data } = this.state;


        const loading = data.length === 0;




        return (

           <Card height={600} order={order} title={'Mundo'} icon={<GiWorld size={20} />} loading={loading}>

            
                {!loading && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20, marginBottom: 20 }}>

                    <input type="text" value={filter} style={{
                        width: "100%", height: 20, borderColor: "red", fontSize: 20,
                        border: "solid 1px red", backgroundColor: "transparent", color: "red", padding: 10,
                    }}
                        onChange={(e) => this.setState({ filter: e.target.value })} placeholder={"Buscar por um País"} />

                </div>}


                {!loading && <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                    {data.filter(l => l.name.toLowerCase().indexOf(filter.toLowerCase()) > -1).sort((a, b) => Number(b[this.getType()[type]]) - Number(a[this.getType()[type]])).map((d, i) => {


                        const deaths = d.totalDeaths;
                        const cases = d.totalCases;
                        const newCases = d.newCases;
                        const newDeaths = d.newDeaths;
                        const mortalRate = cases > 0 ? ((deaths / cases) * 100).toFixed(2) : 0;
                        const mortalRateYesterday = ((deaths - newDeaths) / (cases - newCases)) * 100;
                        const deltaMortalRate = mortalRate - mortalRateYesterday;


                        return (<div key={i} style={{
                            display: "flex", flexDirection: "column", alignItems: "center", width: "99%", height: 130,
                            borderBottom: 'solid 1px red', borderTop: 'solid 1px red', marginBottom: 10
                        }}>

                            <div style={{ fontSize: 20, marginBottom: 5, marginTop: 5 }}><b>{d.Country}</b></div>

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
                                    <div style={{ ...styles.newValues, color: deltaMortalRate.toFixed(2) > 0.00 ? 'red' : deltaMortalRate.toFixed(2) < 0.00 ? 'green' : 'black' }}>
                                        {Number(deltaMortalRate.toFixed(2)) !== 0.00 ? (Number(deltaMortalRate.toFixed(2)) > 0.000 ? `+${deltaMortalRate.toFixed(2)}%` : `${deltaMortalRate.toFixed(2)}%`) : "-"}</div>
                                    <div style={styles.value}><b>{mortalRate}%</b></div>
                                    <div><b>Mortalidade</b></div>
                                </div>

                            </div>



                        </div>);
                    }
                    )}
                </div>}



            </Card>);
    }

}


export default RankingWorld;

const styles = {
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
        width: "100%", fontSize: 15,
    }
}
