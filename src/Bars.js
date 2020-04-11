import React from 'react';
import { FaAmbulance, FaBriefcaseMedical, FaSkullCrossbones, FaPercent, FaPercentage } from 'react-icons/fa';
import Bar from './Bar/Bar';
import BarRate from './BarRate';



class Bars extends React.Component {

  constructor(props) {
    super(props);
  
  }



  toNumber = (number) => Number(number.replace(",", ""));


  render() {

    const { countries } = this.props;

    const totalCases = countries.reduce((acu, actual) => acu + this.toNumber(actual.cases), 0);
    const totalCasesBrasil = countries.length > 0 ? countries.filter(c => c.country_name === "Brasil")[0]["cases"] : 0
    const totalNewDeaths = countries.reduce((acu, actual) => acu + this.toNumber(actual.new_deaths), 0);
    const totalDeaths = countries.reduce((acu, actual) => acu + this.toNumber(actual.deaths), 0);
    const totalDeathsBrasil = countries.length > 0 ? countries.filter(c => c.country_name === "Brasil")[0]["deaths"] : 0
    const totalRecovered = countries.reduce((acu, actual) => acu + this.toNumber(actual.total_recovered), 0);
    const totalRecoveredBrasil = countries.length > 0 ? countries.filter(c => c.country_name === "Brasil")[0]["total_recovered"] : 0;

    const mortalRate = countries.length > 0  ? ((Number(totalDeaths) / Number(totalCases)) * 100).toFixed(2): 0;
    const brasilMortalRate = countries.length > 0  ? ((Number(totalDeathsBrasil.replace(",","")) / Number(totalCasesBrasil.replace(",",""))) * 100).toFixed(2) : 0;


    return (<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
     fontFamily: 'Roboto, sans-serif', width: "100%", height: "100%", order: this.props.order, padding: 14, marginBottom: 20 }}>
      
        <div style={{width: "100%", height:"100%", marginBottom: 20}}><Bar total={totalCases} brasil={totalCasesBrasil}  title={'Casos'}  color={'#ff001e'} loading={countries.length === 0}/></div>
        <div style={{width: "100%", height:"100%", marginBottom: 20}}> <Bar total={totalDeaths} brasil={totalDeathsBrasil} title={'Mortes'} loading={countries.length === 0} /></div>
        <div style={{width: "100%", height:"100%", marginBottom: 20}}><Bar total={mortalRate} brasil={brasilMortalRate} title={'Taxa de Mortalidade'} loading={countries.length === 0} formatter={"%"} /></div>
        <div style={{width: "100%", height:"100%", marginBottom: 20}}><Bar total={totalRecovered} brasil={totalRecoveredBrasil} title={'Curados'} loading={countries.length === 0} /></div>
        
        

    </div>);


  }
}
export default Bars;
