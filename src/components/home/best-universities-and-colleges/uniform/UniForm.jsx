import React, { useEffect, useState } from "react";
import Basicdetail from "./Basicdetail";
import EduDetail from "./EduDetail";
import Otherdetail from "./Otherdetail";
import axiosInstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UniForm({ slug }) {
  const [active, setActive] = useState({
    basic: true,
    edu: false,
    other: false,
  });
  const [dataCheck, setdataCheck] = useState(false);
  const [error, setError] = useState({});
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [category, setCategory] = useState([]);
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    country_code: "",
    phone: "",
    country: "",
    city: "",
    message: "",
    degree: "",
    course_cat: "",
    aca_score: "",
    scoretype: "",
    eng_test: "",
    overall_score: "",
    nationality: "",
    preferred_country: "",
    preferred_intake: "",
  });
  const {
    fname,
    lname,
    email,
    country_code,
    phone,
    country,
    city,
    message,
    degree,
    course_cat,
    aca_score,
    scoretype,
    eng_test,
    overall_score,
    nationality,
    preferred_country,
    preferred_intake,
  } = input;
  const HandelChange = (e) => {
    const { name, value } = e.target;
    setInput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const Validation = (input) => {
    let error = {};
    // if (!input.preferred_intake) {
    //   error.preferred_intake = "Enter your preferred intake";
    // }
    // if (!input.preferred_country) {
    //   error.preferred_country = "Enter your preferred country";
    // }
    // if (!input.nationality) {
    //   error.nationality = "Enter your nationality";
    // }
    // if (!input.overall_score) {
    //   error.overall_score = "Enter your overall score";
    // }
    // if (!input.eng_test) {
    //   error.eng_test = "Enter your english test";
    // }
    // if (!input.scoretype) {
    //   error.scoretype = "Enter your score type";
    // }
    // if (!input.aca_score) {
    //   error.aca_score = "Enter your academic score";
    // }
    // if (!input.course_cat) {
    //   error.course_cat = "Enter your course catagory";
    // }
    // if (!input.degree) {
    //   error.degree = "Enter your Degree";
    // }
    if (!input.message) {
      error.message = "Enter your message";
    }
    if (!input.city) {
      error.city = "Enter your city";
    }
    if (!input.fname) {
      error.fname = "Enter your first name";
    }
    if (!input.lname) {
      error.lname = "Enter your last name";
    }
    if (!input.email) {
      error.email = "Enter your email";
    }
    if (
      !email.match(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
      )
    ) {
      error.email = "Invalid email";
    }
    if (!input.country_code) {
      error.country_code = "Enter your country code";
    }
    if (isNaN(input.country_code) || input.country_code.charAt("0") === "-") {
      error.country_code = "Invalid country code";
    }
    if (!input.phone) {
      error.phone = "Enter this phone number";
    }
    if (isNaN(input.phone) || input.phone.charAt("0") === "-") {
      error.phone = "Invalid phone number";
    }
    if (input.phone.length < 8) {
      error.phone = "Phone must be more then 8 characters";
    }
    if (!input.country) {
      error.country = "Enter your country";
    }
    return error;
  };
  const HandelSubmit = (e) => {
    e.preventDefault();
    setError(Validation(input));
    setActive({
      basic: true,
      edu: true,
      other: true,
    });
    setdataCheck(true);
  };
  const getCategoryList = (signal) => {
    axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        setCategory(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDegreeLevel = (signal) => {
    axiosInstance
      .get(`/courses/degree-level/list/`, { signal })
      .then((res) => {
        let val = [];
        for (let i = 0; i < res.data.length; i++) {
          val.push({
            label: res.data[i].title,
            value: res.data[i].id,
          });
        }
        setDegreeLevels(val);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && dataCheck === true) {
      let sendData = {
        institution: slug,
        f_name: fname,
        l_name: lname,
        email: email,
        phone: country_code + phone,
        country: country,
        city: city,
        message: message,
        degree_level: degree,
        course_category: course_cat,
        academic_score: aca_score,
        score_type: scoretype,
        english_test: eng_test,
        overall_score: overall_score,
        nationality: nationality,
        preferred_country: preferred_country,
        preferred_intake: preferred_intake,
      };
      console.log(sendData);
      axiosInstance
        .post("/institutes/institute-inquery/create/", sendData)
        .then((res) => {
          toast.success("Sent successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setInput({
            fname: "",
            lname: "",
            email: "",
            country_code: "",
            phone: "",
            country: "",
            city: "",
            message: "",
            degree: "",
            course_cat: "",
            aca_score: "",
            scoretype: "",
            eng_test: "",
            overall_score: "",
            nationality: "",
            preferred_country: "",
            preferred_intake: "",
          });
        })
        .catch((err) => {
          // let [key, value] = Object.entries(err.response.data)[0];
          // toast.error(`${key}:${value}`, {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
        });
    }
    // eslint-disable-next-line
  }, [error]);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getCategoryList(signal);
    getDegreeLevel(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <form onSubmit={HandelSubmit} className="flex flex-col space-y-2 ">
        <div
          onClick={() => {
            setActive({ ...active, basic: !active.basic });
          }}
          className="py-2 pl-3 text-lg font-medium bg-gray-100 cursor-pointer text-blue3 border-b border-blue3 "
        >
          Basic Details
        </div>
        {active.basic && (
          <Basicdetail
            input={input}
            error={error}
            HandelChange={HandelChange}
          />
        )}
        <div
          onClick={() => {
            setActive({ ...active, edu: !active.edu });
          }}
          className="py-2 pl-3 text-lg font-medium bg-gray-100 cursor-pointer text-blue3 border-b border-blue3 "
        >
          Education Detail
        </div>
        {active.edu && (
          <EduDetail
            input={input}
            error={error}
            category={category}
            degreeLevels={degreeLevels}
            HandelChange={HandelChange}
          />
        )}
        <div
          onClick={() => {
            setActive({ ...active, other: !active.other });
          }}
          className="py-2 pl-3 text-lg font-medium bg-gray-100 cursor-pointer text-blue3 border-b border-blue3 "
        >
          Other Details
        </div>
        {active.other && (
          <Otherdetail
            input={input}
            error={error}
            HandelChange={HandelChange}
          />
        )}
        <br />
        <button
          type="submit"
          className="text-white bg-blue3 hover:bg-opacity-95 rounded-md py-1.5  w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default UniForm;
