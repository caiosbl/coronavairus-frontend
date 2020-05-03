import React from 'react';
import Card from '../Components/Card';
import { IoMdInformationCircle } from 'react-icons/io';
import { CoronavairusApi } from '../Services/Api';
import InsightItem from './InsightItem';

class Insights extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brazilDoubleCasesDays: null,
            greatestCasesIncrease: null,
            greatestDeathsIncrease: null,
            greatestMortalityIncrease: null,
            lowestMortalityIncrease: null,
            loading: true

        }
    }

    componentDidMount() {
        CoronavairusApi.get("/insight/last").then(res => {

            const { brazilDoubleCasesDays, greatestCasesOcurrenceIncrease, greatestDeathOcurrenceIncrease, greatestMortalityIncrease, lowestMortalityIncrease } = res.data.content;

            this.setState({
                brazilDoubleCasesDays: brazilDoubleCasesDays,
                greatestCasesIncrease: greatestCasesOcurrenceIncrease,
                greatestDeathsIncrease: greatestDeathOcurrenceIncrease,
                greatestMortalityIncrease: greatestMortalityIncrease,
                lowestMortalityIncrease: lowestMortalityIncrease,
                loading: false
            })

        }).catch(e => console.log(e))
    }

    
    render() {

        const { brazilDoubleCasesDays, greatestCasesIncrease, greatestDeathsIncrease, greatestMortalityIncrease, lowestMortalityIncrease, loading } = this.state;

        return (
            <Card height={800} title={'Insights'} >

                {!loading && <InsightItem data={brazilDoubleCasesDays} doubleCases />}
                {!loading && <InsightItem data={greatestCasesIncrease} metric={'casos'} />}
                {!loading && <InsightItem data={greatestDeathsIncrease} metric={'mortes'} />}
                {!loading && <InsightItem data={greatestMortalityIncrease} metric={'mortalidade'} />}
                {!loading && <InsightItem data={lowestMortalityIncrease} metric={'mortalidade'} decrease />}


            </Card>);


    }
}
export default Insights;

