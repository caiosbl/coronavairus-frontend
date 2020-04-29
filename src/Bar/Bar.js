import React from 'react';
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




    render() {

        const { total, title, Brazil, loading, formatter = "" } = this.props;

        return (

            <div style={styles.container}>

                {loading && <ScaleLoader
                    css={override}
                    size={20}
                    color={"red"}
                    loading={loading}
                />}

                <div style={styles.title}><b>{String(title)}</b></div>

                {!loading && <div style={styles.insideContainer}>

                    <div style={styles.containerBox}>
                        <div style={styles.location}><b>Brasil</b></div>
                        <div style={styles.value}>{Brazil.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + formatter}</div>
                    </div>

                    <div style={styles.containerBox}>
                        <div style={styles.location}><b>Mundo</b></div>
                        <div style={styles.value}>{total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + formatter}</div>
                    </div>

                </div>}



            </div>);
    }
}


export default Bar;

const styles = {
    container: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 250,
        fontFamily: "Oswald, sans-serif",
        borderRadius: 10
    },
    insideContainer: {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    containerBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Oswald, sans-serif",
        width: "100%",
        borderBottom: "solid 1px red",
        padding: 10,

    },
    title: {

        color: "red",
        fontSize: 30
    },
    value: {
        fontSize: 50
    },
    location: {
        fontSize: 25
    },

}