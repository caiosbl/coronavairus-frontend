import React from 'react';
import BarNavigatorMap from '../../BarNavigatorMap';
import WorldMap from './WorldMap';
import Card from '../../Components/Card';
import BrazilMap from './BrazilMap';


class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapType: 0,
      loading: false
    }
  }

  render() {

    const { mapType, loading } = this.state;
    const { order } = this.props;


    return (<Card order={order} minHeight={600} loading={loading}>
      <div style={styles.navigatorContainer}>
        {!loading && <div><BarNavigatorMap active={mapType} setActive={(type) => this.setState({ mapType: type })} /></div>}
      </div>

      {mapType === 0 && <BrazilMap handleLoading={(loading) => this.setState({loading: loading})} />}
      {mapType === 1 && <WorldMap handleLoading={(loading) => this.setState({loading: loading})}/>}

    </Card>);


  }
}
export default Map;

const styles = {
  navigatorContainer: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    width: "100%"
  }
}