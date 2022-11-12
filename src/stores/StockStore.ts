import { defineStore } from "pinia";
import { fetchStocksApi } from "../api/cryptoApi";

export type StockItem = {
  name: string;
  price: number;
  img: string;
  changes: number;
  symbol: string;
};

export const useStockStore = defineStore("stock-store", {
  state: () => ({
    stocks: [] as StockItem[] | [],
    chosenStocks: ["AAPL"] as string[],
    loading: true as boolean,
  }),
  getters: {
    getStocks(): StockItem[] {
      return this.stocks;
    },
    getIsCryptoWasChosen(): (stockName: string) => boolean {
      return (stockName: string) => !!this.chosenStocks.find((item) => item === stockName);
    },
    getLoadingState(): boolean {
      return this.loading;
    }
  },
  actions: {
    async fetchStocks() {
      this.loading = true;
      const queries: string = this.chosenStocks.join(",");
      fetchStocksApi(queries)
        .then((res) => {
          this.stocks = res;
          this.loading = false;
        })
        .catch((): void => { this.loading = false })
        .finally(() => this.loading = false)
    },
    addChosenStock(stockName: string): void {
      this.chosenStocks.push(stockName);
    },
    removeStock(stockName: string): void {
      this.chosenStocks = this.chosenStocks.filter((item) => item !== stockName);
      this.stocks = this.stocks.filter((item) => item.name !== stockName);
    },
    saveStateToLocalStorage(): void {
      localStorage.removeItem('chosenStocks');
      localStorage.setItem('chosenStocks', this.chosenStocks.toString());
    },
    setStateFromLocalStorage(): void {
      const storage: string | null = localStorage.getItem('chosenStocks');
      this.chosenStocks = storage ? storage.split(',') : ["AAPL"]; // Оставил для примера
    }
  },
});
