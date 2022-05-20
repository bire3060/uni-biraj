import { baseUrl } from "../axiosInstance";

const institutesList = async () => {
  return await fetch(`${baseUrl}/api/institutes/`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((dta) => dta)
    .catch((error) => error);
};

export default institutesList;
