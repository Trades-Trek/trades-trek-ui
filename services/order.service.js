import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("token")
);

function getPendingOrders(page=1) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/pendings?page=${page}&limit=5&gameId=${localStorage.getItem("GameId") || ''}`)

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
function createOrder(data){
delete data._id
  data.symbol=data.Symbol
  data.quantity=Number(data.quantity)
  data.rate=data.orderType=='Limit'?Number(data.rate):Number(data.Last)
  data.gameId=localStorage.getItem("GameId")
  return fetchWrapper
    .post(`${baseUrl}/user/order/create`,data)

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

function getFailedOrders(page=1) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/failedOrders?page=${page}&limit=5&gameId=${localStorage.getItem("GameId") || ''}`)

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

function getHoldingOrder() {
  return fetchWrapper
    .get(`${baseUrl}/user/order/holdings`)

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

// get cancel Order .........................
function getCancelOrder() {
  return fetchWrapper
    .get(`${baseUrl}/user/order/cancelOrders`)

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

// cancel order by id .........................
function cancelOrder(id) {
  return fetchWrapper
    .patch(`${baseUrl}/user/order/cancelOrder/${id}`)

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

// show max ..................................................

function showMax(rate, action, symbol) {
  return fetchWrapper
    .post(`${baseUrl}/user/order/showMax`, {
      rate: rate,
      action: action,
      symbol: symbol,
      gameId:localStorage.getItem("GameId")
    })
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      return error;
    });
}

function StockDetail(symbol) {
  return fetchWrapper
    .post(`${baseUrl}/user/order/stockDetail`, { symbol: symbol })
    .then((res) => {
      return res[0];
    })
    .catch(function(error) {
      return error;
    });
}

function profitOrLoss() {
  return fetchWrapper
    .post(`${baseUrl}/user/order/profitOrLoss`)
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      return error;
    });
}
function popularCompanies() {
  return fetchWrapper
    .get(`${baseUrl}/user/order/popularCompanies`)
    .then((res) => {
      return res.data;
    })
    .catch((errr) => {

      return errr;
    });
}

// trade history .........................
function tradeHistory(page) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/history?page=${page}&gameId=${localStorage.getItem("GameId") || ''}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}

// trade history for another user ......... 
function tradeHistoryAnotheUser(page,username) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/history-other-user?page=${page}&gameId=${localStorage.getItem("GameId") || ''}&userName=${username}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}

// holding profit or loss ........................
function holdingProfitOrLoss(page = 1) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/holdingProfitOrLoss?page=${page}&limit=5&gameId=${localStorage.getItem("GameId") || ''}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}
function holdingProfitOrLossAnotherUser(page,user) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/holdingProfitOrLoss-otherUser?page=${page}&gameId=${localStorage.getItem("GameId") || ''}&userName=${user}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}


// pending holding ...... 
function pendingHolding(page = 1) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/pending-holding?page=${page}&limit=5&gameId=${localStorage.getItem("GameId") || ""}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}

// Pending short ......  
function pendingShort(page = 1) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/pending-short?page=${page}&limit=5&gameId=${localStorage.getItem("GameId") || ""}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}

// short profit or loss ........................
function shortProfitOrLoss(page = 1) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/shortProfitOrLoss?gameId=${localStorage.getItem('GameId')}&page=${page}&limit=5`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}

// shortProfitOrLoss-another-user

function shortProfitOrLossAnotherUser(page,userName) {
  return fetchWrapper
    .get(`${baseUrl}/user/order/shortProfitOrLoss-another-user?page=${page}&gameId=${localStorage.getItem('GameId')}&userName=${userName}`)
    .then((res) => {
      return res;
    })
    .catch((errr) => {

      return errr;
    });
}
export const orderService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getPendingOrders,
  getHoldingOrder,
  getCancelOrder,
  cancelOrder,
  showMax,
  StockDetail,
  profitOrLoss,
  popularCompanies,
  tradeHistory,
  holdingProfitOrLoss,
  shortProfitOrLoss,
  getFailedOrders,
  pendingHolding,
  pendingShort,
  holdingProfitOrLossAnotherUser,
  shortProfitOrLossAnotherUser,
  tradeHistoryAnotheUser,
  createOrder
};
