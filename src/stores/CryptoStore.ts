import { defineStore } from "pinia";
import axios from "axios";

export type Crypto = {
  USD: number;
};

export const useCryptoStore = defineStore("crypto-store", {
  state: () => ({
    cryptos: {} as Crypto,
    chosenList: ["BTC", "ETH"] as String[],
  }),
  getters: {
    getCryptos(): object {
      return this.cryptos;
    },
  },
  actions: {
    async fetchCryptos() {
      const queries = this.chosenList.join(",");
      axios
        .get(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${queries}&tsyms=USD`
        )
        .then((res): void => {
          console.log(res.data);
          this.cryptos = res.data;
        })
        .catch((e): never => {
          throw Error(e.message);
        });
    },
  },
});
