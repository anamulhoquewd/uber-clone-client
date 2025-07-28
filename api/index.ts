import axios from "axios";
const baseURL =
  `${process.env.NEXT_PUBLIC_API_DOMAIN}` || "http://localhost:4000";

const api = axios.create({
  baseURL,
  withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${getStorage("accessToken")}`,
  //   },
});

export default api;
