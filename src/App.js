import React from 'react';
import LineChart from './Charts/LineChart';
import Map from './Charts/Map/Map';
import Ranking from './Rankings/Ranking';
import Histogram from './Charts/Histogram';
import RankingWorld from './RankingWorld';
import News from './News';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Timeline from './Timeline/Timeline';
import Insights from './Insights/Insights';
import BrazilSummary from './Summary/BrazilSummary';
import WorldSummary from './Summary/WorldSummary';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentWidth: 1024
    }
  }


  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize = () => {
    let currentWidth = window.innerWidth;
    if (currentWidth !== this.state.currentWidth) {
      this.setState({ currentWidth: currentWidth });
    }
  }


  render() {

    const { currentWidth } = this.state;
    const tablet = currentWidth <= 1024 && currentWidth >= 764
    const mobile = currentWidth <= 550


    return (<div style={styles.container}>

      <div style={styles.containerHeader}><Header /></div>
      <div style={styles.containerNews}><News /></div>

      <div style={styles.containerContent}>

        <div style={{ ...styles.barContainer, minWidth: mobile ? '90%' : 310, order: mobile ? 2 : 1 }}>
          <BrazilSummary order={1} />
          <Ranking order={2} />
          <Insights order={5} />
          {tablet && <WorldSummary order={3} />}
          {tablet && <RankingWorld order={4} />}
        </div>

        <div style={{ ...styles.containerCharts, order: mobile ? 1 : 2, minWidth: mobile ? '90%' : 310 }}>
          <Map order={1} />
          <LineChart order={2} />
          <Histogram order={3} />
          {tablet && <Timeline order={3} />}
        </div>

        {!tablet && <div style={{ ...styles.barContainer, minWidth: mobile ? '90%' : 310, order: 3 }}>
          <WorldSummary order={1} />
          <RankingWorld order={2} />
          <Timeline order={3} />
        </div>}

      </div>

      <div style={styles.divider}></div>

      <Footer />

    </div>);
  }
}

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: '90%',
    height: "100%",
    overflow: 'hidden'
  },

  containerHeader: {
    paddingBottom: 40
  },

  containerNews: {
    width: "95%",
    marginBottom: 10
  },

  containerContent: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: "100%"
  },

  containerCharts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "100%",
  },

  barContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "100%",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "red",
    marginTop: 50,
    marginBottom: 30
  }

}