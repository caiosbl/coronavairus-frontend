import React from 'react';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import BarNavigatorWorld from './BarNavigatorWorld';


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

    getType = () => {
        return {
            0: "cases",
            1: "deaths",
            2: "total_recovered"
        }
    }


    render() {

        const { data } = this.props;
        const { filter, type } = this.state;


        const loading = data.length === 0;




        return (

            <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%",
                height: 600, order: this.props.order, fontFamily: "Oswald, sans-serif", border: "solid 2px red", padding: 10, marginBottom: 20
            }}>


                {loading && <GridLoader
                    css={override}
                    size={20}
                    color={"red"}
                    loading={loading}

                />}

                {!loading && <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    fontSize: 20, backgroundColor: "red", width: "100%", marginBottom: 10
                }}><b>Mundo</b></div>}
                



                {!loading && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: 10, marginBottom: 10 }}>

                    <input type="text" value={filter} style={{
                        width: "100%", height: 20, borderColor: "red", fontSize: 20,
                        border: "solid 1px red", backgroundColor: "transparent", color: "red", padding: 10,
                    }}
                        onChange={(e) => this.setState({ filter: e.target.value })} placeholder={"Buscar por um País"} />

                </div>}


                {!loading && <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                    {data.filter(l => l.country_name.toLowerCase().indexOf(filter.toLowerCase()) > -1).sort((a, b) => Number(b[this.getType()[type]].replace(",", "")) - Number(a[this.getType()[type]].replace(",", ""))).map((d, i) =>


                    { 
                        const deaths = Number(d?.deaths?.replace(",",""));
                        const cases = Number(d.cases.replace(",",""));
                        const deltaMortalRate = ((deaths / cases) * 100).toFixed(2);


                        return (<div key={i} style={{
                            display: "flex", flexDirection: "column", alignItems: "center", width: "99%", height: 130, justifyContent: "center",                            borderBottom: 'solid 1px red', borderTop: 'solid 1px red', marginBottom: 10
                        }}>

                            <div style={{ fontSize: 20, marginBottom: 5, marginTop: 5 }}><b>{d.country_name}</b></div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                            <div style={styles.values}>
                                    <div style={styles.value}><b>{cases.toLocaleString()}</b></div>
                                    <div><b>Casos</b></div>
                                </div>

                                <div style={styles.values}>
                                    <div style={styles.value}><b>{deaths.toLocaleString()}</b></div>
                                    <div><b>Mortes</b></div>
                                </div>

                                <div style={styles.values}>
                                    <div style={styles.value}><b>{deltaMortalRate}%</b></div>
                                    <div><b>Mortalidade</b></div>
                                </div>
                            </div>

                           

                        </div>);}
                    )}
                </div>}



            </div>);
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
