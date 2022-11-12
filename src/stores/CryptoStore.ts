import { defineStore } from "pinia";
import { fetchCryptosApi } from "../api/cryptoApi";

export type Crypto = {
  name: string;
  price: number;
  img: string;
  changes: number;
};

export const useCryptoStore = defineStore("crypto-store", {
  state: () => ({
    cryptos: [] as Crypto[] | [],
    chosenList: [] as string[],
    loading: true as boolean,
  }),
  getters: {
    getCryptos(): Crypto[] {
      return this.cryptos;
    },
    getIsCryptoWasChosen(): (cryptoName: string) => boolean {
      return (cryptoName: string) => !!this.chosenList.find((item) => item === cryptoName);
    },
    getLoadingState(): boolean {
      return this.loading;
    }
  },
  actions: {
    async fetchCryptos() {
      this.loading = true;
      const queries: string = this.chosenList.join(",");
      fetchCryptosApi(queries)
        .then((res) => {
          this.cryptos = res;
          this.loading = false;
        })
        .catch((): void => { this.loading = false })
        .finally(() => this.loading = false)
    },
    addChosenCrypto(cryptoName: string): void {
      this.chosenList.push(cryptoName);
    },
    removeCrypto(cryptoName: string): void {
      this.chosenList = this.chosenList.filter((item) => item !== cryptoName);
      this.cryptos = this.cryptos.filter((item) => item.name !== cryptoName);
    },
    saveStateToLocalStorage(): void {
      localStorage.removeItem('chosenCryptos');
      localStorage.setItem('chosenCryptos', this.chosenList.toString());
    },
    setStateFromLocalStorage(): void {
      const storage: string | null = localStorage.getItem('chosenCryptos');
      this.chosenList = storage ? storage.split(',') : [];
    }
  },
});
