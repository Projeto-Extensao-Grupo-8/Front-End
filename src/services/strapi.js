import axios from "axios";

export const strapi = axios.create({
  baseURL: "http://localhost:1337",
});