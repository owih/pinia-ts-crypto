import axios from "axios";
import type { Crypto } from '../stores/CryptoStore'
import type { StockItem } from '../stores/StockStore'

export const apiUrl: string = 'https://www.cryptocompare.com';
const currency: string = 'USD';
export const fetchCryptosApi = async (queries: string) => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${queries}&tsyms=${currency}`
    )
    .then((res): Crypto[] => {
      const response = res.data.RAW;
      const result:Crypto[] = [];
      for (let key in response) {
        result.push({ name: key, price: response[key][currency].PRICE, img: apiUrl + response[key][currency].IMAGEURL, changes: response[key][currency].CHANGE24HOUR})
      }
      return result;
    })
    .catch((e): never => {
      throw Error(e.message);
    });
}

export const fetchStocksApi = async (queries: string) => {
  return axios
    .get(
      `https://financialmodelingprep.com/api/v3/profile/${queries}?apikey=8a20e88bfefbde43db0b1633c7bbc3a3`
    )
    .then((res): StockItem[] => {
      const response = res.data;
      const result:StockItem[] = [];
      response.forEach((item: any) => {
        result.push({ name: item.companyName, price: item.price, img: item.image, changes: item.changes, symbol: item.symbol})
      })
      return result;
    })
    .catch((e): never => {
      throw Error(e.message);
    });
}
