import { baseUrl } from "../axiosInstance";

const createInstitute = async (data) => {
  return await fetch(`${baseUrl}/api/institutes/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((dta) => dta)
    .catch((error) => error);
};

export default createInstitute;
