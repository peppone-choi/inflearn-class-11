import axios from 'axios';

const googleInstance = axios.create({
  baseURL: 'https://www.googleapis.com/oauth2/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default googleInstance;
