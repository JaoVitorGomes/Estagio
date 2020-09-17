import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/'
});
const apiExterna = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
});

export {api, apiExterna};
