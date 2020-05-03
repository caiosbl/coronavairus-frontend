import React from 'react';
import { FaAmbulance, FaBriefcaseMedical, FaSkullCrossbones, FaPercent, FaPercentage } from 'react-icons/fa';
import Doughnut from './Charts/Doughnut'
import Bar from './Bar/Bar';
import BarRate from './BarRate';
import Card from './Components/Card';
import Insights from './Insights/Insights';





class Bars extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    const { world, brazil } = this.props;

    const totalCases = world?.totalCases;
    const totalCasesBrazil = brazil?.totalCases;
    const totalDeaths = world?.totalDeaths;
    const totalDeathsBrazil = brazil?.totalDeaths;
    const totalRecovered = world?.totalRecovered;
    const totalRecoveredBrazil = brazil?.totalRecovered;

    const mortalRate = world ? (totalDeaths / totalCases) * 100 : 1;
    const BrazilMortalRate = brazil ? (totalDeathsBrazil / totalCasesBrazil) * 100 : 1;

    const activeCasesBrazil = brazil?.totalCases - (totalRecoveredBrazil + totalDeathsBrazil);


    return (<div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      fontFamily: 'Roboto, sans-serif', width: "100%", height: "100%", order: this.props.order, padding: 14, marginBottom: 20
    }}>


      <Doughnut total={totalCasesBrazil} recovered={totalRecoveredBrazil} deaths={totalDeathsBrazil} title={'Brasil'} />
      <Doughnut total={totalCases} recovered={totalRecovered} deaths={totalDeaths} title={'Mundo'} />
    
    <Insights />




    </div >);


  }
}
export default Bars;
