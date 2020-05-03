import React from 'react';

class Insights extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        const { data, decrease, metric, doubleCases } = this.props;
        const mortality = metric === 'mortalidade';

        return (

            doubleCases ?

                <div style={styles.boxStyle}>
                    <div>
                        O número de <span style={{ fontSize: '1.2em', color: 'red' }}>casos</span> confirmados por dia no Brasil está <span style={{ fontSize: '1.3em', color: 'red' }}>dobrando</span> em <span style={{ fontSize: '1.3em', color: 'red' }}>{data} dias</span>.
                </div>
                </div>

                :
                <div style={styles.boxStyle}>
                    <div>
                        <span style={{ fontSize: '1.3em', color: 'red' }}>{data.stateName} </span>
                        teve {decrease ? 'uma queda' : 'um aumento'} de <span style={{ fontSize: '1.2em', color: 'red' }}>{Math.abs(data.increaseRate).toFixed(2)}%</span>
                    </div>
                    <div>na <span style={{ color: 'red' }}>{mortality ? 'taxa' : 'ocorrência'} de {metric}</span> de Covid-19 nos últimos 7 dias, {decrease ? 'a' : 'o'} maior do Brasil no período.</div>
                </div>);


    }
}

export default Insights;

const styles = {

    boxStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'left',
        border: 'solid 1px red',
        width: '90%',
        height: 100,
        padding: 10,
        minHeight: 100,
        marginTop: 15
    }

}
