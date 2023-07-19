import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from '../helpers';
import Router from 'next/router';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem('token')
);

function getUserAllNotification(page) {
    return fetchWrapper
      .get(`${baseUrl}/notifications?page=${page}`)
  
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

  function notificationDeleteById(id){
    return fetchWrapper
      .delete(`${baseUrl}/notifications?id=${id}`)
      .then((res) => {
        if(res.success){
         
        }
       
        return res;
      })
      .catch(function (error) {
        return error;
      });
  }
  function deleteAllNotifications(){
    return fetchWrapper
      .delete(`${baseUrl}/notifications/all`)
      .then((res) => {
        if(res.success){
         
        }
       
        return res;
      })
      .catch(function (error) {
        return error;
      });
  }
  function notificationCount(){
    return fetchWrapper
      .get(`${baseUrl}/notifications/count`)
      .then((res) => {
        if(res.success){
         
        }
       
        return res;
      })
      .catch(function (error) {
        return error;
      });
  }
  function noficationUpdateStatus(notificationIds){
    return fetchWrapper
    .put(`${baseUrl}/notifications/update-status`, notificationIds)
    .then((res) => {
      if(res.success){
       
      }
     
      return res;
    })
    .catch(function (error) {
      return error;
    });
  }

export const notificationService ={
    user: userSubject.asObservable(),
    get userValue() {
      return userSubject.value;
    },
    getUserAllNotification,
    notificationDeleteById,
    deleteAllNotifications,
    notificationCount,
    noficationUpdateStatus
  };