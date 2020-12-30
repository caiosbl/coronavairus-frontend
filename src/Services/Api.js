import Axios from 'axios';

export const GeoJson = Axios.create({
  baseURL: `./br-all.geo.json`,
});

export const GeoJsonWorld = Axios.create({
  baseURL: `./world-highres2.geo.json`,
});

export const CoronavairusApi = Axios.create({
  baseURL: `https://coronavairus.herokuapp.com/`,
});
