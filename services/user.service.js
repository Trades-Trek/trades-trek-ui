import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from '../helpers';
import Router from 'next/router';
import { isBrowser, isMobileOnly, isTablet } from "react-device-detect";
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem('token')
);

function login(data) {
  return fetchWrapper
    .post(`${baseUrl}/user/login`, data)
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.success) {
        userSubject.next(res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem("GameId",res.GameId)
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
//signup function
function signup(data) {
 
  return fetchWrapper
    .post(`${baseUrl}/user/signup`, data)

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
//Verify Otp
function verifyLoginOtp(email, otp, isDownloadCampaign) {
  return fetchWrapper
    .post(`${baseUrl}/user/verifyEmail`, {
      email: email,
      otp: otp,
    })
    .then((res) => {
      if (res.success) {
        userSubject.next(res.token);
        if (!isDownloadCampaign) {
          localStorage.setItem("token", res.token);
          Router.replace("/dashboard");
        } else {
          Router.replace("/download-app");
        }
      }
      return res;
    })
    .catch(function(error) {
      return error;
    });
}


// forgot password ...................     
function forgot_password(email) {
  return fetchWrapper
    .post(`${baseUrl}/user/forgotPasswordSendOtp`, {
      email: email,
     
    })
    .then((res) => {
      if (res.success) {
        userSubject.next(res.token);
        localStorage.setItem('token', res.token);
      }
      return res;
    })
    .catch(function (error) {
      return error;
    });
}


// reset password .............. 
function reset_password(data) {
  return fetchWrapper
    .patch(`${baseUrl}/user/resetPassword`, data
    )
    .then((res) => {
      if (res.success) {
        userSubject.next(res.token);
        localStorage.setItem('token', res.token);
      }
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
//Logout Function
function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('token');
  localStorage.removeItem('GameId')
  localStorage.removeItem('indexTrade')
  localStorage.removeItem('indexPort')
  localStorage.removeItem('email')
  localStorage.removeItem('otp')
  userSubject.next(null);
  Router.push('/');
}

// user info ............................................. 
function userInfo(){
  var device=''
  if(isBrowser){
    device="Browser"
  }else if(isMobileOnly){
    device="Mobile"
  }else{
    device='Tablet'
  }
  return fetchWrapper

      .get(`${baseUrl}/user/get/info?device=${device}&gameId=${localStorage.getItem("GameId") || ''}`)
  
      .then((res) => {
        if(res?.message?.block){
          
          localStorage.removeItem('token');
          localStorage.removeItem('GameId')
          userSubject.next(null);
          Router.push('/')
        }else if(res.success==false){
          localStorage.removeItem('token');
          localStorage.removeItem('GameId')

          userSubject.next(null);
          Router.push('/')
        }else if(res.success){
          return res;
        }
       
       
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}
function userGraph({typeData,perSelected}){
  return fetchWrapper
      .get(`${baseUrl}/user/user-graph?gameId=${localStorage.getItem("GameId") || ''}&type=${typeData}&per=${perSelected}`)
  
      .then((res) => {
      
       return res
       
       
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}


//Resend Otp
function resendOtp(email, otp) {
  return fetchWrapper
    .post(`${baseUrl}/user/resendOtp`, {
      email: email,
      otp: otp,
    })
    .then((res) => {
      if (res.success) {
        userSubject.next(res.token);
        localStorage.setItem('token', res.token);
      }
      return res;
    })
    .catch(function (error) {
      return error;
    });
}

// Change password .........................  

function changePassword(data){
  return fetchWrapper
  .patch(`${baseUrl}/user/changePassword`, data)
  .then((res) => {
    if (res.success) {
      userSubject.next(res.token);
      localStorage.setItem('token', res.token);
    }
    return res;
  })
  .catch(function (error) {
    return error;
  });
}

// user performance history ..................... 
function userPerformanceHistory(page){
  return fetchWrapper
      .get(`${baseUrl}/user/performanceHistory?page=${page}&gameId=${localStorage.getItem("GameId") || ''}`)
  
      .then((res) => {
        // if (res.success) {
        // }
        return res;
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}

function userPerformanceHistoryAll(){
  return fetchWrapper
      .get(`${baseUrl}/user/performanceHistory-all?gameId=${localStorage.getItem("GameId") || ''}`)
  
      .then((res) => {
        // if (res.success) {
        // }
        return res;
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}

// anotheruser performance history 
function anotherUserPerformanceHistory(page,username){
  return fetchWrapper
      .get(`${baseUrl}/user/another-user-performanceHistory?page=${page}&userName=${username}&gameId=${localStorage.getItem("GameId") || ''}`)
  
      .then((res) => {
        // if (res.success) {
        // }
        return res;
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}

function anotherUserPerformanceHistoryAll(username){
  return fetchWrapper
      .get(`${baseUrl}/user/another-user-all-performanceHistory?userName=${username}&gameId=${localStorage.getItem("GameId") || ''}`)
  
      .then((res) => {
        // if (res.success) {
        // }
        return res;
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}

function getHoliday() {
 
  return fetchWrapper
    .get(`${baseUrl}/holiday`)

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

function getAllSubscription() {
 
  return fetchWrapper
    .get(`${baseUrl}/subscription/all-subscription`)

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

function getAllPaidSubscription() {
 
  return fetchWrapper
    .get(`${baseUrl}/subscription/paid`)

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

function subscriptions() {
 
  return fetchWrapper
    .get(`${baseUrl}/subscription`)

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
function GetUserSubscriptionHistory() {
 
  return fetchWrapper
    .get(`${baseUrl}/subscription/user-subscription-history`)

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

function verifyTransaction(data) {
  return fetchWrapper
    .post(`${baseUrl}/subscription/verify`,data)
    .then((res) => {
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}

function withoutVerifyTransaction(data) {

  data.email=localStorage.getItem('email')
  return fetchWrapper
    .post(`${baseUrl}/subscription/verify-without-login`,data)
    .then((res) => {
      if(res.success){
        userSubject.next(res.token);
        localStorage.setItem('token', res.token);
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function cancelTransaction(id) {
  return fetchWrapper
    .get(`${baseUrl}/subscription/cancel-subscription?id=${id}`)
    .then((res) => {
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function GetSingleUser(userName) {
 
  return fetchWrapper
    .get(`${baseUrl}/user/single-user-info?userName=${userName}&gameId=${localStorage.getItem('GameId')}`)

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
function anotherUserGraph({temp,userName,typeData,perSelected}){
  return fetchWrapper
      .get(`${baseUrl}/user/another-user-graph?gameId=${localStorage.getItem("GameId") || ''}&type=${typeData}&per=${perSelected}&username=${userName}&user=${temp.username}&anotheruser=${temp.anotheruser}`)
  
      .then((res) => {
      
       return res
       
       
      })
      .catch((error) => {
        if (error?.length > 0) {
          return error[0];
        }
        return error;
      });

}
function addTransaction(data) {

  
  return fetchWrapper
    .post(`${baseUrl}/transaction`,data)
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function getTransaction() {

  
  return fetchWrapper
    .get(`${baseUrl}/transaction`)
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function getBankDetail() {

  
  return fetchWrapper
    .get(`${baseUrl}/transaction/bank-details`)
    .then((res) => {
      if(res.success){
       res
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}

function userRankDetails() {

  
  return fetchWrapper
    .get(`${baseUrl}/user/get/rank-info?gameId=${localStorage.getItem("GameId")}`)
    .then((res) => {
      if(res.success){
       res
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}


function getBanks() {  
  return fetchWrapper
    .get(`${baseUrl}/bank`)
    .then((res) => {
      if(res.success){
       res
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}

function verifyAccountNumber({account_number,bank_code }) {  
  return fetchWrapper
    .get(`${baseUrl}/bank/verifyAccount?account_number=${account_number}&bank_code=${bank_code}`)
    .then((res) => {
      if(res.success){
       res
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}


function allowNotificationStatus(status) {

  
  return fetchWrapper
    .get(`${baseUrl}/user/allow-notification-status?allowNotification=${status}`)
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function updateAccount(data){
  return fetchWrapper
    .post(`${baseUrl}/user/update-user`,data)
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function updateProfile(data){
  return axios
    .post(`${baseUrl}/user/uploadProfile`,{'image':data},{
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => {
      if(res.success){
       
      }
     
      return res.data;
    })
    .catch(function (error) {
      return error;
    });
}
function removeProfile(){
  return fetchWrapper
    .delete(`${baseUrl}/user/remove-pic`
    )
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}
function updateTimeStamp(){
  return fetchWrapper
    .get(`${baseUrl}/user/timestamp`
    )
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}

function getNews() {
 
  return fetchWrapper
    .get(`${baseUrl}/news`)

    .then((res) => {
      
      return res;
    })
    .catch((error) => {
      
      return error;
    });
}

function deleteUser(){
  return fetchWrapper
    .delete(`${baseUrl}/user/delete-account`
    )
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
}


export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  getNews,
  getBanks,
  verifyAccountNumber,
  getBankDetail,
  removeProfile,
  updateAccount,
  anotherUserGraph,
  logout,
  signup,
  verifyLoginOtp,
  resendOtp,
  forgot_password,
  reset_password,
  userInfo,
  changePassword,
  userPerformanceHistory,
  userRankDetails,
  userPerformanceHistoryAll,
  anotherUserPerformanceHistoryAll,
  getHoliday,
  getAllSubscription,
  getAllPaidSubscription,
  verifyTransaction,
  GetSingleUser,
  cancelTransaction,
  subscriptions,
  withoutVerifyTransaction,
  userGraph,
  anotherUserPerformanceHistory,
  addTransaction,
  getTransaction,
  allowNotificationStatus,
  updateProfile,
  GetUserSubscriptionHistory,
  updateTimeStamp,
  deleteUser
};
