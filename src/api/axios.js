import axios from 'axios';

export const googleInstance = axios.create({
  baseURL: 'https://www.googleapis.com/oauth2/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pokemonInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});
