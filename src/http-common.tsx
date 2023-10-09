import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const wiki_http = axios.create({
  baseURL: "https://en.wikipedia.org/api/rest_v1/page/summary",
  headers: {
    "Content-Type": "application/json",
  },
});
