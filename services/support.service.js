import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem('token')
);

function createSupport(data) {
    return fetchWrapper
      .post(`${baseUrl}/support`,data)
  
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


  function GetAllLearning() {
    return fetchWrapper
      .get(`${baseUrl}/learning/all-learning-info`)
  
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


  

export const supportService ={
    user: userSubject.asObservable(),
    get userValue() {
      return userSubject.value;
    },
    createSupport,
    GetAllLearning
 
  };