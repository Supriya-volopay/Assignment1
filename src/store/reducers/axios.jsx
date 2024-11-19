import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
  baseURL: "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo",
});

export default API;