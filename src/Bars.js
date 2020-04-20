import React from 'react';
import { FaAmbulance, FaBriefcaseMedical, FaSkullCrossbones, FaPercent, FaPercentage } from 'react-icons/fa';
import Bar from './Bar/Bar';
import BarRate from './BarRate';



class Bars extends React.Component {

  constructor(props) {
    super(props);
  
  }


  componentDidMount() {
    
  }





  render() {

    const { world, brazil } = this.props;


    const totalCases =   world?.TotalConfirmed || 1;
    const totalCasesBrazil =  brazil?.TotalConfirmed || 1;
    const totalDeaths =  world?.TotalDeaths || 1
    const totalDeathsBrazil = brazil?.TotalDeaths || 1;
    const totalRecovered =   world?.TotalRecovered || 1;
    const totalRecoveredBrazil =  brazil?.TotalRecovered || 1;

    const mortalRate = world ? (totalDeaths / totalCases) * 100  : 1;
    const BrazilMortalRate = brazil ? (totalDeathsBrazil / totalCasesBrazil) * 100 : 1;


    return (<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
     fontFamily: 'Roboto, sans-serif', width: "100%", height: "100%", order: this.props.order, padding: 14, marginBottom: 20 }}>
      
        <div style={{width: "100%", height:"100%", marginBottom: 20}}><Bar total={totalCases} Brazil={totalCasesBrazil}  title={'Casos'}  color={'#ff001e'} loading={!world || !brazil}/></div>
        <div style={{width: "100%", height:"100%", marginBottom: 20}}> <Bar total={totalDeaths} Brazil={totalDeathsBrazil} title={'Mortes'} loading={!world || !brazil} /></div>
        <div style={{width: "100%", height:"100%", marginBottom: 20}}><Bar total={mortalRate} Brazil={BrazilMortalRate} title={'Taxa de Mortalidade'} loading={!world || !brazil} formatter={"%"} /></div>
        <div style={{width: "100%", height:"100%", marginBottom: 20}}><Bar total={totalRecovered} Brazil={totalRecoveredBrazil} title={'Curados'} loading={!world || !brazil} /></div>
        
        

    </div>);


  }
}
export default Bars;
