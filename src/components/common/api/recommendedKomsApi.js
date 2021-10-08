import axios from "axios";
import { KOMS_BACKEND } from "../constants/urls";

export function getRecommendedCycling(params) {
  return axios
    .get(`${KOMS_BACKEND}recommend_cycling`, { params })
    .then(({ data }) => data);
}

export function getRecommendedRunning(params) {
  return axios
    .get(`${KOMS_BACKEND}recommend_running`, { params })
    .then(({ data }) => data);
}