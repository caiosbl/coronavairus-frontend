import React from 'react';
import LineChart from './Charts/LineChart';
import Map from './Charts/Map';
import Bars from './Bars';
import Rankings from './Rankings';
import Histogram from './Charts/Histogram';
import RankingWorld from './RankingWorld';
import News from './News';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { countriesPortuguese } from './portuguese';
import {CoronavairusApi } from './Services/Api';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastData: new Date(),
      timeline: { dates: [], cases: [], casesByDay: [], deathsByDay: [], prediction: [], predictionDeaths: [] },
      latest: null,
      brazil: { map: { cases: [], deaths: [], suspects: [], mortalRate: [] }, ranking: { data: [] } },
      brazilStatus: null,
      world: { cases: [], deaths: [], recovered: [], translated: [] },
      global: null,
      news: [],
      currentWidth: 1024
    }

  }

  componentDidMount() {
    setInterval(() => this.setState({ lastData: new Date() }), 300000);
    this.getData();
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize = () => {
    let currentWidth = window.innerWidth;

    if (currentWidth !== this.state.currentWidth) {
      this.setState({ currentWidth: currentWidth });
    }
  }



  getData = () => {

    CoronavairusApi.get("/country").then(res => {
      const data = res.data.content;
      let translated = [];

      data.forEach(country => {

        const translateMap = Object.values(countriesPortuguese).filter(v => v.alpha2.toUpperCase() === country.isoA2);

        if (translateMap.length > 0) 
          translated.push({ ...country, Country: translateMap[0]["name"] });
        else 
          translated.push(country);
      });

      const cases = data.map(state => [state.isoA2, state.totalCases]);
      const deaths = data.map(state => [state.isoA2, state.totalDeaths]);
      const recovered = data.map(state => [state.isoA2, state.totalRecovered]);

      this.setState({ world: { cases: cases, deaths: deaths, recovered: recovered, translated: translated } })

    }).catch(e => console.log(e))

    CoronavairusApi.get("/prediction/last").then(res => {

      const formatDate = (date) => { return `${date.split("-")[2].split("T")[0]}/${date.split("-")[1]}`};
      
      const data = res.data.content;
      const prediction = data.map(prediction => {return {x: formatDate(prediction.date), y: prediction.cases.casesHighPrediction}});
      const predictionDeaths = data.map(prediction => {return {x: formatDate(prediction.date), y: prediction.deaths.deathsHighPrediction}});

      this.setState({ timeline: {...this.state.timeline, prediction: prediction, predictionDeaths:  predictionDeaths} });

    }).catch(e => console.log(e))


    CoronavairusApi.get("/brazil/last").then(res => {

      let data = res.data.content;
      this.setState({ brazilStatus: data });

    }).catch(e => console.log(e))

    CoronavairusApi.get("/world/last").then(res => {

      let data = res.data.content;
      this.setState({ global: data });

    }).catch(e => console.log(e))


    CoronavairusApi.get("/state").then(res => {

      const data = res.data.content;
      const cases = data.map(state => [`br-${String(state.uf).toLowerCase()}`, state.latest.cases]);
      const deaths = data.map(state => [`br-${String(state.uf).toLowerCase()}`, state.latest.deaths]);
      const mortalRate = data.map(state => { return [`br-${String(state.uf).toLowerCase()}`, ((state.latest.deaths / state.latest.cases) * 100)] });

      const suspects = data.map(state => {
        const suspect = state.latest.suspects || 0;
        return [`br-${String(state.uf).toLowerCase()}`, suspect]
      });


      this.setState({
        brazil: {
          map: {
            cases: cases,
            deaths: deaths,
            suspects: suspects,
            mortalRate: mortalRate
          },
          ranking: {
            data: data
          }
        }
      });

    }).catch(e => console.log(e))

    CoronavairusApi.get("/brazil").then(res => {

      let timeline = res.data.content;
      if (timeline.slice(-2)[0].totalCases === timeline.slice(-1)[0].totalCases)
        timeline = timeline.slice(0, timeline.length - 1);

      const dates = timeline.map(d => `${d.date.split("-")[2].split("T")[0]}/${d.date.split("-")[1]}`);
      const cases = timeline.map(d => d.totalCases);
      const deaths = timeline.map(d => d.totalDeaths);
      let casesByDay = timeline.map(d => d.newCases);;
      let deathsByDay = timeline.map(d => d.newDeaths);;

      this.setState({ timeline: {...this.state.timeline, dates: dates, cases: cases, deaths: deaths, casesByDay: casesByDay, deathsByDay: deathsByDay,  } });

    }).catch(e => console.log(e))

}

  render() {

    const { lastData, timeline, world, brazil, currentWidth, global, brazilStatus } = this.state;
    const tablet = currentWidth <= 1024 && currentWidth >= 764
    const mobile = currentWidth <= 550




    return (<div style={styles.container}>



      <div style={styles.containerHeader}><Header /></div>
      <div style={styles.containerNews}><News /></div>

      <div style={styles.containerContent}>

        <div style={{ ...styles.barContainer, order: mobile ? 2 : 1 }}>
          <Bars world={global} brazil={brazilStatus} order={1} />
          {tablet && <div style={{ order: 2 }}>
            <Rankings data={brazil.ranking.data} order={2} />
            <RankingWorld data={world.translated} order={3} />
          </div>
          }
        </div>

        <div style={{ ...styles.containerCharts, order: mobile ? 1 : 2 }}>
          <Map world={world} brazil={brazil} order={1} />
          <LineChart dates={timeline.dates} cases={timeline.cases} deaths={timeline.deaths} mortalRate={timeline.mortalRate} prediction={timeline.prediction}
            predictionDeaths={timeline.predictionDeaths} order={2} />
          <Histogram dates={timeline.dates} casesByDay={timeline.casesByDay} deathsByDay={timeline.deathsByDay} order={3} />
        </div>

        {!tablet && <div style={{ ...styles.barContainer, order: 3 }}>
          <Rankings data={brazil.ranking.data} order={1} />
          <RankingWorld data={world.translated} order={2} />
        </div>}

      </div>

      <div style={styles.divider}></div>

      <Footer lastData={lastData} />

    </div>);
  }
}
export default App;


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  containerHeader: {
    paddingBottom: 40
  },
  containerNews: {
    width: "77%",
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
    minWidth: 310,
    marginTop: 10
  },
  barContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "100%",
    minWidth: 310,
    marginTop: 10
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "red",
    marginTop: 50,
    marginBottom: 30
  }

}
