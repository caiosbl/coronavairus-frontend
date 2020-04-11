import React from 'react';
import Axios from 'axios';
import Ranking from './Ranking';




class Rankings extends React.Component {

  constructor(props) {
    super(props);
  }


  toNumber = (number) => Number(number.replace(",", ""));


  render() {

    const { data} = this.props;


    return (<Ranking order={this.props.order} color={'#ff001e'} data={data} />);


  }
}
export default Rankings;
