import axios from "axios";

const path = "https://uniandcolleges.herokuapp.com/api/";
// const path = "http://192.168.128.5:8001/api/";
export const url = "https://uniandcolleges.herokuapp.com/api";
// export const url = "http://192.168.128.5:8001/api/";

const axiosInstance = axios.create({
  baseURL: path,
  headers: {
    Authorization: localStorage.getItem("access")
      ? `Bearer ${localStorage.getItem("access")}`
      : "",
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
export default axiosInstance;
