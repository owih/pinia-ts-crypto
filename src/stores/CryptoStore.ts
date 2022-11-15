import { defineStore } from "pinia";
import { fetchCryptosApi } from "../api/cryptoApi";
import { notify } from "@kyvg/vue3-notification";

export type Crypto = {
  name: string;
  price: number;
  img: string;
  changes: number;
};

export const useCryptoStore = defineStore("crypto-store", {
  state: () => ({
    isFirstLoad: true as boolean,
    cryptos: [] as Crypto[] | [],
    chosenList: [] as string[],
    loading: true as boolean,
  }),
  getters: {
    getCryptos(): Crypto[] {
      return this.cryptos;
    },
    getChosenList(): string[] {
      return this.chosenList;
    },
    getIsCryptoWasChosen(): (cryptoName: string) => boolean {
      return (cryptoName: string) => !!this.chosenList.find((item) => item === cryptoName.trim().toLowerCase());
    },
    getLoadingState(): boolean {
      return this.loading;
    },
    getStateFromLocalStorage(): string[] {
      const storage: string | null = localStorage.getItem('chosenCryptos');
      return storage ? storage.split(',') : [];
    }
  },
  actions: {
    async fetchCryptos() {
      this.loading = true;
      const queries: string = this.chosenList.join(",");
      await fetchCryptosApi(queries)
        .then((res) => {
          if (this.chosenList.length === res.length && this.chosenList.length !== this.cryptos.length && this.chosenList.length !== 0) {
            this.cryptos = res;
            const addedItem = this.chosenList[this.chosenList.length - 1].toUpperCase();

            if (this.isFirstLoad) return;
            notify({
              title: `${addedItem} was added`,
              type: 'success'
            })
          } else if (this.chosenList.length !== this.cryptos.length) {
            const deletedItem = this.chosenList.splice(this.chosenList.length - 1, 1);
            notify({
              title: `Cant find any "${deletedItem}" crypto`,
              type: 'warning'
            })
          }
          this.loading = false;
        })
        .catch((e): void => {
          this.loading = false;
          notify({
            title: e,
            type: 'error'
          })
        })
        .finally(() => this.loading = false)
    },
    addChosenCrypto(cryptoName: string): void {
      this.chosenList.push(cryptoName.trim().toLowerCase());
    },
    removeCrypto(cryptoName: string): void {
      this.chosenList = this.chosenList.filter((item) => item !== cryptoName.trim().toLowerCase());
      this.cryptos = this.cryptos.filter((item) => item.name.trim().toLowerCase() !== cryptoName.trim().toLowerCase());
      notify({
        title: `${cryptoName.toUpperCase()} was removed`,
        type: 'success'
      })
    },
    saveStateToLocalStorage(): void {
      localStorage.removeItem('chosenCryptos');
      localStorage.setItem('chosenCryptos', this.chosenList.toString());
      notify({
        title: `Current list state was saved to local storage`,
        type: 'success'
      })
    },
    setStateFromLocalStorage(): void {
      const storage: string | null = localStorage.getItem('chosenCryptos');
      this.chosenList = storage ? storage.split(',') : [];
    },
    clearCryptoStore(): void {
      this.chosenList = [];
      this.cryptos = [];
      notify({
        title: `Current list was cleared`,
        type: 'success'
      })
    },
    updateFirstLoad(isFirst: boolean): void {
      this.isFirstLoad = isFirst;
    }
  },
});
