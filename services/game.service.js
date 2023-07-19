import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { fetchWrapper } from "../helpers";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("token")
);

function createGame(data) {
  data.dateRange = `${data.startDate} ${data.endDate}`;
  data.startingCash = Number(data.startingCash);
  data.startDate=new Date(data.startDate)
  
  return fetchWrapper
    .post(`${baseUrl}/game/createGame`, data)

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

// update game ..........................
function updateGame(data, gameId) {
  data.dateRange = `${data.startDate} ${data.endDate}`;
  data.endDate=new Date(data.endDate)

  // delete data.startDate;
  // delete data.endDate;
  // console
  return fetchWrapper
    .patch(`${baseUrl}/game/update/${gameId}`, data)

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

// get all game .....
function getAllGame(search,page=1,limit=5) {
  // console
  return fetchWrapper
    .get(`${baseUrl}/game?search=${search}&page=${page}&limit=${limit}`)

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

function getMYGame(search,page=1,limit=5) {
  // console
  return fetchWrapper
    .get(`${baseUrl}/game/myGames?search=${search}&page=${page}&limit=${limit}`)

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

function joinGame(data) {
  // console
  return fetchWrapper
    .post(`${baseUrl}/game/join-game`, data)

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

function myRank(data) {
  // console
  return fetchWrapper
    .get(
      `${baseUrl}/game/my-rank?gameId=${localStorage.getItem("GameId") || ""}`
    )

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
function allRank(page,limit=10) {
  // console
  return fetchWrapper
    .get(
      `${baseUrl}/game/all-rank?gameId=${localStorage.getItem("GameId") || ""}&page=${page}&limit=${limit}`
    )

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

function deleteGame(id) {
  // console
  return fetchWrapper
    .delete(`${baseUrl}/game/delete/${id}`)

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

function portfolioResetting(id) {
  // console
  return fetchWrapper
    .delete(`${baseUrl}/game/reset-my-portfolio?gameId=${id}`)

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
function leaveCompetion(id) {
  // console
  return fetchWrapper
    .delete(`${baseUrl}/game/leave-UserCompetition?gameId=${id}`)

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
function inviteGame(data) {
  // console
  return fetchWrapper
    .post(`${baseUrl}/game/invite-game`, data)

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
function inviteFriends(emails) {
  // console
  return fetchWrapper
    .post(`${baseUrl}/userrefferal`, {emails})

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
function refferalInfo() {
  // console
  return fetchWrapper
    .get(`${baseUrl}/userrefferal`)

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

function getWinner(date){
  return fetchWrapper
    .get(`${baseUrl}/winnerlist?gameId=${localStorage.getItem('GameId')}&date=${date}`)

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

function getMYPastGame() {
  // console
  return fetchWrapper
    .get(`${baseUrl}/game/myPastGames`)

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

function getLeaderBoard(gameId){
  return fetchWrapper
    .get(`${baseUrl}/game/leaderboard?gameId=${gameId}`)

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
function getTradeHistory(gameId){
  return fetchWrapper
    .get(`${baseUrl}/game/trade-history?gameId=${gameId}`)

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
export const gameService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  createGame,
  getAllGame,
  getMYGame,
  joinGame,
  myRank,
  updateGame,
  deleteGame,
  portfolioResetting,
  allRank,
  inviteGame,
  getWinner,
  getMYPastGame,
  getLeaderBoard,
  getTradeHistory,
  leaveCompetion,
  inviteFriends,
  refferalInfo
};
