import { baseUrl } from "../axiosInstance";

const createCourse = async (data) => {
  return await fetch(`${baseUrl}/api/courses/create/`, {
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

export default createCourse;
