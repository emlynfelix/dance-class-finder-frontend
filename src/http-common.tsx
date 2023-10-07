import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN"
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.withCredentials = true

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
