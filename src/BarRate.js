import React from 'react';
import './App.css';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Bar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            title: "",
            data: []
        }

    }

    toNumber = (number) => Number(number.replace(",", ""));
   


    render() {

        const { total, title, keyName, color, icon, newIndex, brasil, loading } = this.props;
        const { data } = this.state;

        


        return (

       
                <div style={{
                    display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", width: '95%', height: 100,
                    border: 'solid 2px red', padding: 20, fontFamily: "Roboto, sans-serif", margin: 5,
                }}>
                    {loading && <ScaleLoader
                        css={override}
                        size={20}
                        color={"red"}
                        loading={loading}
                    />}


                    {!loading && <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", alignItems: "center", justifyContent: "space-around" }}>

                        <div>{icon}</div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",  fontFamily: "Oswald, sans-serif", }}>
                            <div style={{ marginBottom: 5, color: "red", fontSize: 20 }}><b>{String(title)}</b></div>

                            <div style={{
                                display: "flex", flexDirection: "row", alignItems: "center", width: 130, height: "100%",
                                border: "solid 2px red", color: "white", padding: 5, justifyContent: "space-between", marginBottom: 5
                            }}>
                                <div style={{}}><b>Brasil</b></div>
                                <div style={{}}>{this.toNumber(brasil).toLocaleString() + '%'}</div>
                            </div>

                            <div style={{
                                display: "flex", flexDirection: "row", alignItems: "center", width: 130, height: "100%",
                                border: "solid 2px red", color: "white", padding: 5, justifyContent: "space-between"
                            }}>
                                <div style={{}}><b>Mundo</b></div>
                                <div style={{}}>{total.toLocaleString() + "%"}</div>
                            </div>




                        </div>



                    </div>}

                </div> );



    }


}


export default Bar;
