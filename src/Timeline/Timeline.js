import React from 'react';
import Card from '../Components/Card';
import { IoMdInformationCircle } from 'react-icons/io';
import { CoronavairusApi } from '../Services/Api';
import TimelineItem from './TimelineItem';


class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            height: 100
        };
        this.content = React.createRef();
    }

    componentDidMount() {
        CoronavairusApi.get("/timeline").then(res => {

            const data = res.data;

            this.setState({
                data: data,
                loading: false
            })

        }).catch(e => console.log(e));

     
    }


    render() {
        

        const { data, loading, height } = this.state;
        const { order } = this.props;
        return (
            <Card height={620} title={'Timeline'} loading={loading} order={order}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '90%', marginTop: 10 }}>



                    {!loading && <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', overflow: 'auto' }}>

                        <div style={{ width: '2%', marginLeft: '12%', height: this.content? this.content.scrollHeight : '100vh' , backgroundColor: 'red', marginBottom: data.length > 5 ? 10 : 0 }}></div>

                        <div style={{ width: '100%', height: '100%', }} ref={element => this.content = element}>
                            {data.map((element, i) => <TimelineItem date={element.date} key={i} cases={element.numberOfCases} deaths={element.numberOfDeaths} recovered={element.numberOfRecovered} />)}
                        </div>

                    </div>}



                </div>


            </Card>);


    }
}
export default Timeline;

