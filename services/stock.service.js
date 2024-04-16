import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { fetchWrapper } from "../helpers";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("token")
);

function stockDetailGraph({ stock, typeData, perSelected }) {
  return fetchWrapper
    .get(
      `${baseUrl}/stock/stockDetail-graph?stock=${stock}&type=${typeData}&stockProperty=${perSelected}`
    )

    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

function getTopGainer() {
  return fetchWrapper
    .get(`${baseUrl}/stock/top-gainer`)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}
function getTopLooser() {
  return fetchWrapper
    .get(`${baseUrl}/stock/top-looser`)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}
function getAllStock() {
  return fetchWrapper
    .get(`${baseUrl}/stock/all`)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

function getAllStockSectors() {
  return fetchWrapper
    .get(`${baseUrl}/stock/sectors`)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

function filterStocks(stock) {
  return fetchWrapper
    .post(`${baseUrl}/stock/filter`, stock)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

function addPriceAlert(body) {
  return fetchWrapper
    .post(`${baseUrl}/watchlist/priceAlert`, body)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

function addToWatchListStock(stock) {
  return fetchWrapper
    .post(`${baseUrl}/watchlist`, stock)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}
function AllWathchList() {
  return fetchWrapper
    .get(`${baseUrl}/watchlist`)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

function removeItem(symbol) {
  return fetchWrapper
    .delete(`${baseUrl}/watchlist?symbol=${symbol}`)

    .then((res) => {
      if (res.success) {
      }
      return res;
    })
    .catch((error) => {
      if (error?.length > 0) {
        return error[0];
      }
      return error;
    });
}

export const stockService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getTopGainer,
  getTopLooser,
  getAllStock,
  getAllStockSectors,
  filterStocks,
  addToWatchListStock,
  addPriceAlert,
  AllWathchList,
  removeItem,
  stockDetailGraph,
};
