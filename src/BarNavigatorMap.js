import React from 'react';
import { GiWorld, GiBrazil } from "react-icons/gi";

class BarNavigator extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {

        const { active, setActive } = this.props;



        return (


            <div style={{
                display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', height: 60,
                fontFamily: "Roboto, sans-serif"
            }}>
                <div style={{
                    ...(active === 0 ? styles.active : styles.inactive), borderTopLeftRadius: 20,borderBottomLeftRadius: 20,
                }} onClick={() => setActive(0)}><GiBrazil size={30} /></div>
                <div style={{...(active === 1 ? styles.active : styles.inactive), borderTopRightRadius: 20, borderBottomRightRadius: 20}} onClick={() => setActive(1)}><GiWorld size={30} /></div>




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
        border: "solid 1px red",
        backgroundColor: "red",
        color: "black",
        fontFamily: "Oswald, sans-serif",
        padding: 5,
        WebkitUserSelect: "none",
        MozUserSelect: "none",
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
        color: "red",
        border: "solid 1px red",
        fontFamily: "Oswald, sans-serif",
        padding: 5,
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        UserSelect: "none"

    }
}


export default BarNavigator;
