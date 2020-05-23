import React from 'react';

class TimelineItem extends React.Component {

    constructor(props) {
        super(props);

    }


    formatCases = (value) => (Number(value.split("k")[0]) * 1000).toLocaleString()

    render() {


        const { date, cases, deaths, recovered } = this.props;

        return (


            <div>
                {cases && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginLeft: '-14%', marginTop: 20 }}>

                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: 50, height: 50, textAlign: 'center',
                        borderRadius: 50, backgroundColor: 'red',
                    }}>

                        <div>{`${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`}</div>
                    </div>


                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%',
                        height: 50, border: 'solid 1px red', padding: 5, borderTopLeftRadius: 50, borderBottomLeftRadius: 50
                    }}>

                        <div style={{ width: '80%', height: '80%' }}>
                            <span>{cases === "1" ? 'Brasil registra o primeiro caso de Coronavírus' : `Brasil supera os ${this.formatCases(cases)} casos de Coronavírus`}</span>
                        </div>

                    </div>

                </div>}

                {deaths && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginLeft: '-14%', marginTop: 20 }}>

                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    width: 50, height: 50, textAlign: 'center',
                    borderRadius: 50, backgroundColor: 'red',
                }}>

                    <div>{`${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`}</div>
                </div>


                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%',
                    height: 50, border: 'solid 1px red', padding: 5, borderTopLeftRadius: 50, borderBottomLeftRadius: 50
                }}>

                    <div style={{ width: '80%', height: '80%' }}>
                        <span>{deaths === "1" ? 'Brasil registra a primeira morte por Coronavírus' : `Brasil supera as ${this.formatCases(deaths)} mortes por Coronavírus`}</span>
                    </div>

                </div>

            </div>}

            {recovered && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginLeft: '-14%', marginTop: 20 }}>

                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    width: 50, height: 50, textAlign: 'center',
                    borderRadius: 50, backgroundColor: 'red',
                }}>

                    <div>{`${new Date(date).getDate()}/${new Date(date).getMonth() + 1}`}</div>
                </div>


                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%',
                    height: 50, border: 'solid 1px red', padding: 5, borderTopLeftRadius: 50, borderBottomLeftRadius: 50
                }}>

                    <div style={{ width: '80%', height: '80%' }}>
                        <span>{recovered === "1" ? 'Brasil registra o primeiro caso curado de Coronavírus' : `Brasil supera ${this.formatCases(recovered)} casos curados de Coronavírus`}</span>
                    </div>

                </div>

            </div>}

            </div>
        );


    }
}
export default TimelineItem;

