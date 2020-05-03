import React from 'react';



class Card extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const { height, children, order, title } = this.props;

        return (<div style={{ ...styles.container, order: order, height: height }}>

            <div style={styles.titleContainer}>{title}</div>

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
        border: "solid 1px red",
        padding: 10,
        marginBottom: 20
    },

    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        fontFamily: "Oswald, sans-serif", 
        fontSize: 30,
    },


   
    
}
export default Card;
