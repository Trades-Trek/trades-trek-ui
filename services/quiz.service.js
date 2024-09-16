import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import { fetchWrapper } from "../helpers";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`; 
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("token")
);

function getLearningModuleByGroupName(name) {
  return fetchWrapper
    .get(`${baseUrl}/learning-quiz-module/group/${name}`)
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      return error;
    });
}

function getLearningModule() {
  return fetchWrapper
    .get(`${baseUrl}/learning-quiz-module`)
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      return error;
    });
}

function getLearningModuleGroups() {
  return fetchWrapper
    .get(`${baseUrl}/learning-module-groups`)
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      return error;
    });
}

function getUserProgress() {
  return fetchWrapper
    .get(`${baseUrl}/user-progress`)
    .then((res) => {
      return res;
    })
    .catch(function(error) {
      return error;
    });
}

export const quizService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getLearningModuleGroups,
  getLearningModule,
  getLearningModuleByGroupName,
  getUserProgress
};
