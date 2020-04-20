import Axios from 'axios';

export const WorldApi = Axios.create({
  baseURL: `https://api.covid19api.com/summary`
});

export const Api = Axios.create({
  baseURL: 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalMapa',
  headers: {  'x-parse-application-id': 'unAFkcaNDeXajurGB7LChj8SgQYS2ptm' },
  timeout: 1000
});

export const BrazilApi = Axios.create({
  baseURL: `https://covid19-brazil-api.now.sh/api/report/v1`,
});

export const TimelineApi = Axios.create({
  baseURL: `https://pomber.github.io/covid19/timeseries.json`
});

export const GeoJson = Axios.create({
  baseURL: `./br-all.geo.json`,
});

export const GeoJsonWorld = Axios.create({
  baseURL: `./world-highres2.geo.json`,
});

export const CoronavairusApi = Axios.create({
  baseURL: `https://coronavairus.herokuapp.com/`,
});
