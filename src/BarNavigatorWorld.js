import React from 'react';

class BarNavigatorWorld extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {

        const { active, setActive } = this.props;



        return (


            <div style={{
                display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', height: 60,
                fontFamily: "Roboto, sans-serif",
            }}>
                <div style={active === 0 ? styles.active : styles.inactive} onClick={() => setActive(0)}>Casos</div>
                <div style={active === 1 ? styles.active : styles.inactive} onClick={() => setActive(1)}>Mortes</div>
                <div style={active === 2 ? styles.active : styles.inactive} onClick={() => setActive(2)}>Curados</div>




            </div>);



    }


}

const styles = {
    active: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        border: 'solid 2px red',
        backgroundColor: "red",
        fontFamily: "Oswald, sans-serif",
        padding: 10,
        WebkitUserSelect: "none",  
        MozUserSelect:  "none",       
        MsUserSelect: "none",    
        UserSelect: "none"
    },
    inactive: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        backgroundColor: "transparent",
        color: "white",
        border: 'solid 2px red',
        fontFamily: "Oswald, sans-serif",
        padding: 10,
        WebkitUserSelect: "none",  
        MozUserSelect:  "none",       
        MsUserSelect: "none",    
        UserSelect: "none"

    }
}


export default BarNavigatorWorld;
