import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import errorHandler from "../../common/error-handler";
// import ieltsErrorHandler from "../../common/ieltsErrorHandler";
import { basicDetailFields } from "./add/input-fields";
import { SaveButton } from "../../common/buttons";
import DashboardPath from "../../common/dashboard-path";
import CoursesBasicDetails from "./add/courses-basic-details";
import CoursesStudyLoads from "./add/courses-study-loads";
import Description from "./add/description";
import FeesAndFunds from "./add/fees-and-funds";
import IELTS from "./add/ielts";
import Images from "./add/images";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  COURSE_BASIC_DETAIL_ERROR,
  COURSE_INSTITUTE_ADD,
  COURSE_IELTS_DETAILS_ADD,
  COURSE_CATEGORY_ADD,
  COURSE_PTE_DETAILS_ADD,
  ADD_DEGREE_LEVEL_BASIC,
  COURSE_DESCRIPTION_ERROR,
  COURSE_DOMESTICE_FEE_ERROR,
  COURSE_INTERNATION_FEE_ERROR,
  // COURSE_IELTS_DETAILS_ERROR,
  // COURSE_PTE_DETAILS_ERROR,
  COURSE_BASIC_DETAIL_ADD,
  COURSE_DESCRIPTION_ADD,
  COURSE_STUDY_LOAD_ADD,
  COURSE_STUDY_MODE_ADD,
  COURSE_INTERNATION_FEE_ADD,
  COURSE_DOMESTICE_FEE_ADD,
} from "../../../redux/actions/actionsTypes";
// import createCourse from "../../../api/course/create-course";
import SucessMessage from "../../common/SucessMessage";
import axiosInstance from "../../../api/axiosInstance";
const steps = [
  "Basic Detail",
  "Description",
  "Study Loads",
  "Fees & Funds",
  "IELTS",
  "Images",
];
// const ieltsFields = [
//   "listening",
//   "reading",
//   "writing",
//   "reading",
//   "overall",
//   "speaking",
// ];
const paths = ["Dashboard", "Course", "Add"];

const CourseAdd = () => {
  const { slug } = useParams();
  const [active, setActive] = useState("Basic Detail");
  // let headingErr = false;
  const course = useSelector((state) => state.course);
  // const ielts = useSelector((state) => state.course.ietls);
  // const pte = useSelector((state) => state.course.pte);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [institute, setInstitute] = useState("");
  const [category, setCategory] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [backImg, setBackImg] = useState("");
  const handleCourseCreate = (e) => {
    e.preventDefault();
    let goAheadAndSubmit = true;

    if (!course.descripton) {
      goAheadAndSubmit = false;
      dispatch({
        type: COURSE_DESCRIPTION_ERROR,
        payload: "Field is required",
      });
    } else {
      goAheadAndSubmit = true;
      dispatch({
        type: COURSE_DESCRIPTION_ERROR,
        payload: "",
      });
    }
    if (!course.international_fee) {
      goAheadAndSubmit = false;
      dispatch({
        type: COURSE_INTERNATION_FEE_ERROR,
        payload: "Field is Required",
      });
    } else {
      goAheadAndSubmit = true;
      dispatch({
        type: COURSE_INTERNATION_FEE_ERROR,
        payload: "",
      });
    }
    if (!course.domestice_fee) {
      goAheadAndSubmit = false;
      dispatch({
        type: COURSE_DOMESTICE_FEE_ERROR,
        payload: "Field is Required",
      });
    } else {
      goAheadAndSubmit = true;
      dispatch({
        type: COURSE_DOMESTICE_FEE_ERROR,
        payload: "",
      });
    }
    // if (!course.image) {
    //   goAheadAndSubmit = false;
    // } else {
    //   goAheadAndSubmit = true;
    // }
    // basic error handeller
    basicDetailFields.map((field) => {
      const { property } = field;
      const error = errorHandler(property, course[property], true);
      dispatch({
        type: COURSE_BASIC_DETAIL_ERROR,
        payload: {
          property: property,
          error: error,
        },
      });
      if (error) {
        goAheadAndSubmit = false;
        setActive("Basic Detail");
      }
      return "";
    });
    if (goAheadAndSubmit) {
      setError("");
      let formData = new FormData();
      const { reading, writing, listening, overall, speaking } = course.pte;
      const ielts = course.ietls;
      let newPte = {
        reading: reading,
        writing: writing,
        listening: listening,
        overall: overall,
        speaking: speaking,
      };
      let newIelts = {
        reading: ielts.reading,
        writing: ielts.writing,
        listening: ielts.listening,
        overall: ielts.overall,
        speaking: ielts.speaking,
      };
      formData.append("title", course.title);
      formData.append("description", course.descripton);
      formData.append("study_mode", course.study_mode);
      formData.append("study_load", course.study_load);
      course.image && formData.append("images", course.image);
      formData.append("institution", course.institute.id);
      formData.append("category", course.category.id);
      formData.append("international_fee", course.international_fee);
      formData.append("domestic_fee", course.domestice_fee);
      formData.append("degree_level", course.degree_level.id);
      formData.append("pte", JSON.stringify(newPte));
      formData.append("itels", JSON.stringify(newIelts));
      formData.append("status", "PH");
      formData.append("duration", "one");
      formData.append("level", "IE");
      if (slug === undefined) {
        axiosInstance
          .post(`/courses/create/`, formData)
          .then((res) => {
    
            setMessage("Information saved sucessfully");
            setOpen(true);
          })
          .catch((err) => {
            console.log(err)
          });
      } else {
        axiosInstance
          .put(`/courses/update/${slug}/`, formData)
          .then((res) => {
            
            setMessage("Information updated sucessfully");
            setOpen(true);
          })
          .catch((error) => {
            
            toast.error(`${error.response.data.title}`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
           
          });
      }
    } else {
      setError("please fill the information properly");
      setOpen(true);
    }
  };
  const closeModal = (isError) => {
    if (isError) {
      setOpen(false);
    } else {
      setOpen(false);
      window.location.reload();
      window.location = "/dashboard/course/add";
    }
  };
  React.useEffect(() => {
    if (slug !== undefined) {
      setActive("");
      axiosInstance
        .get(`/courses/detail/${slug}/`)
        .then((res) => {
          setInstitute(res.data.institution);
          setCategory(res.data.category);
          setDegreeLevel(res.data.degree_level);
          setBackImg(res.data.images);
          dispatch({
            type: COURSE_INSTITUTE_ADD,
            payload: res.data.institution,
          });
          dispatch({
            type: ADD_DEGREE_LEVEL_BASIC,
            payload: res.data.degree_level,
          });
          dispatch({
            type: COURSE_CATEGORY_ADD,
            payload: res.data.category,
          });
          dispatch({
            type: COURSE_BASIC_DETAIL_ADD,
            payload: {
              property: "title",
              value: res.data.title,
            },
          });
          dispatch({
            type: COURSE_DESCRIPTION_ADD,
            payload: res.data.description,
          });
          dispatch({
            type: COURSE_STUDY_LOAD_ADD,
            payload: res.data.study_load,
          });
          dispatch({
            type: COURSE_STUDY_MODE_ADD,
            payload: res.data.study_mode,
          });
          dispatch({
            type: COURSE_DOMESTICE_FEE_ADD,
            payload: res.data.domestic_fee,
          });
          dispatch({
            type: COURSE_INTERNATION_FEE_ADD,
            payload: res.data.international_fee,
          });
          const ielts = [
            {
              property: "listening",
            },
            {
              property: "reading",
            },
            {
              property: "writing",
            },
            {
              property: "speaking",
            },
            {
              property: "overall",
            },
          ];
          for (let i = 0; i < ielts.length; i++) {
            dispatch({
              type: COURSE_IELTS_DETAILS_ADD,
              payload: {
                property: ielts[i].property,
                value: res.data.itels[ielts[i].property],
              },
            });
            dispatch({
              type: COURSE_PTE_DETAILS_ADD,
              payload: {
                property: ielts[i].property,
                value: res.data.pte[ielts[i].property],
              },
            });
          }
          setActive("Basic Detail");
        })
        .catch((err) => {
          console.log(err);
        });
      // setActive("Basic Detail");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <form className="bg-gray-100" onSubmit={handleCourseCreate}>
      {/* sucesspage from Modal*/}
      <SucessMessage
        open={open}
        closeModal={closeModal}
        message={message}
        error={error}
      />
      {/*-------------*/}
      <div className="flex justify-between py-1 items-center bg-white px-4">
        <DashboardPath paths={paths.concat(active)} />
        <SaveButton />
      </div>
      <div className="p-4 space-y-4">
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className={`font-semibold text-center shadow-2xl rounded ${
                  active === step
                    ? "bg-blue2 text-gray-100 cursor-default"
                    : "bg-white text-blue2 border border-gray-300 cursor-pointer"
                }
              }`}
                onClick={() => setActive(step)}
              >
                <p>{step}</p>
              </div>
            );
          })}
        </div>

        <div className="border rounded bg-white institution-add-input-fields-container p-4">
          {active === "Basic Detail" && (
            <CoursesBasicDetails
              institute={institute}
              category={category}
              degreeLevel={degreeLevel}
            />
          )}
          {active === "Description" && <Description />}
          {active === "Study Loads" && <CoursesStudyLoads />}
          {active === "Fees & Funds" && <FeesAndFunds />}
          {active === "IELTS" && <IELTS />}
          {active === "Images" && <Images backImg={backImg} />}
        </div>
      </div>
    </form>
  );
};

export default CourseAdd;
