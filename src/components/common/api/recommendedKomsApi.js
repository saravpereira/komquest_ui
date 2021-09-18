import axios from "axios";
import { KOMS_BACKEND } from "../constants/urls";

export function getRecommendedKoms(params) {
  return axios
    .get(`${KOMS_BACKEND}recommend_cycling`, { params })
    .then(({ data }) => data);
}
