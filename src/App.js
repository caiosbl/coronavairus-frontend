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

import { countriesEnglish } from './english';
import { countriesPortuguese } from './portuguese';
import { WorldApi,  TimelineApi, CoronavairusApi } from './Services/Api';
import { toNumber } from './Utils/Utils';
import Skeleton from 'react-loading-skeleton';
import { estados } from './Utils/Estados';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastData: new Date(),
      timeline: { dates: [], cases: [], casesByDay: [], deathsByDay: [] },
      latest: null,
      brazil: { map: { cases: [], deaths: [], suspects: [], mortalRate: [] }, ranking: { data: [] } },
      world: { cases: [], deaths: [], recovered: [], translated: [] },
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

    TimelineApi.get("").then(res => {
      const timeline = res.data["Brazil"];

      const dates = timeline.slice(35, timeline.length).map(d => `${d.date.split("-")[2]}/${d.date.split("-")[1]}`);
      const cases = timeline.slice(35, timeline.length).map(d => d.confirmed);
      const deaths = timeline.slice(35, timeline.length).map(d => d.deaths);

      let casesByDay = [];
      let deathsByDay = [];

      cases.forEach((c, i) => {
        if (i === 0) casesByDay.push(c);
        else casesByDay.push(c - cases[i - 1]);
      });

      deaths.forEach((c, i) => {
        if (i === 0) deathsByDay.push(c);
        else deathsByDay.push(c - deaths[i - 1]);
      });

      this.setState({ timeline: { dates: dates, cases: cases, deaths: deaths, casesByDay: casesByDay, deathsByDay: deathsByDay } });



    }).catch(e => console.log(e));



    WorldApi.get(`/cases_by_country.php`).then(res => {

      let translated = [];

      if (res.data["countries_stat"].length > 0) {

        res.data["countries_stat"].forEach(country => {
          if (!["North America", "Europe", "Asia", "South America", "Oceania", "Africa", ""].includes(country.country_name)) {

            if (countriesEnglish[country.country_name]) {
              translated.push({ ...country, country_name: countriesPortuguese[countriesEnglish[country.country_name]]["name"] })
            }
            else {
              translated.push(country)
            }
          }
        });


        const cases = res.data["countries_stat"].map(state => [state.country_name, toNumber(state.cases)]);
        const deaths = res.data["countries_stat"].map(state => [state.country_name, toNumber(state.deaths)]);
        const recovered = res.data["countries_stat"].map(state => [state.country_name, toNumber(state.total_recovered)]);

        this.setState({ world: { cases: cases, deaths: deaths, recovered: recovered, translated: translated } })


      }

    }).catch(e => console.log(e))


    CoronavairusApi.get("/state").then(res => {

      const data = res.data.content;
      const cases = data.map(state => [`br-${String(state.uf).toLowerCase()}`, state.latest.cases]);
      const deaths = data.map(state => [`br-${String(state.uf).toLowerCase()}`, state.latest.deaths]);
      const mortalRate = data.map(state => {
        
        
        return [`br-${String(state.uf).toLowerCase()}`, ((state.latest.deaths / state.latest.cases) * 100) ]});

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


  }



  render() {

    const { lastData, timeline, world, brazil, currentWidth } = this.state;
    const tablet = currentWidth <= 1024 && currentWidth >= 764
    const mobile = currentWidth <= 550




    return (<div style={styles.container}>

      <div style={styles.containerHeader}><Header /></div>
      <div style={styles.containerNews}><News /></div>

      <div style={styles.containerContent}>

        <div style={{ ...styles.barContainer, order: mobile ? 2 : 1 }}>
          <Bars countries={world.translated} order={1} />
          {tablet && <div style={{ order: 2 }}>
            <Rankings data={brazil.ranking.data} order={2} />
            <RankingWorld data={world.translated} order={3} />
          </div>
          }
        </div>

        <div style={{ ...styles.containerCharts, order: mobile ? 1 : 2 }}>
          <Map world={world} brazil={brazil} order={1} />
          <LineChart dates={timeline.dates} cases={timeline.cases} deaths={timeline.deaths} mortalRate={timeline.mortalRate} order={2} />
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
