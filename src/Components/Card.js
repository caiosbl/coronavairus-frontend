import React from 'react';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;




class Card extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const { height, children, order, title, loading, minHeight } = this.props;

        return (<div style={{ ...styles.container, order: order, height: height, minHeight: minHeight }}>

            {!loading && <div style={styles.titleContainer}><span style={{marginLeft: 5}}>{title}</span></div>}


            {loading && <div style={{ marginTop: '50%', marginBottom: '50%' }}><GridLoader
                css={override}
                size={20}
                color={"red"}
                loading={loading}

            /> </div>}

            {children}
        </div>);
    }
}


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        fontFamily: "Oswald, sans-serif",
        border: 'solid 1px red',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5
    },

    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: 'center',
        width: "100%",
        fontFamily: "Oswald, sans-serif",
        fontSize: 30,
        borderLeft: 'solid 4px red',
      color: 'red'
    
        
    },




}
export default Card;
