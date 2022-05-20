import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import errorHandler from "../../common/error-handler";
// import { SaveButton } from "../../common/buttons";
import DashboardPath from "../../common/dashboard-path";
import {
  // AWARD_ERROR,
  // BASIC_DETAIL_ERROR,
  // FACILITY_ERROR,
  BASIC_DETAIL_ADD,
  FACILITY_ADD,
  FACILITY_UPDATE,
  AWARD_ADD,
  AWARD_UPDATE,
  DOCUMENT_ADD,
  IMAGE_ADD,
} from "../../../redux/actions/actionsTypes";
import Award from "./add/award";
import BasicDetails from "./add/basic-details";
import Document from "./add/document";
import Facilities from "./add/facilities";
import Images from "./add/images";
// import { basicDetailFields } from "./add/input-fields";
// import Schorlarship from "./add/scholarship";
import axiosInstance from "../../../api/axiosInstance";
// import SucessMessage from "../../common/SucessMessage";
import { useParams } from "react-router-dom";
const steps = [
  "Basic Detail",
  "Facilities",
  "Award",
  // "Scholarship",
  "Document",
  "Images",
];
const paths = ["Dashboard", "Institution", "Add"];
const Institutions = () => {
  const { slug } = useParams();
  const [active, setActive] = useState("Basic Detail");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (slug !== undefined) {
      setActive("");
      axiosInstance
        .get(`/institutes/detail/${slug}/`)
        .then((res) => {
          
          localStorage.setItem("id", res.data.id);
          setCountry(res.data.address);
          const basicDetails = [
            {
              property: "name",
            },
            {
              property: "contact",
            },
            {
              property: "email",
            },
            {
              property: "website",
            },
            {
              property: "about",
            },
            {
              property: "logo",
            },
            {
              property: "banner",
            },
          ];
          for (let i = 0; i < basicDetails.length; i++) {
            dispatch({
              type: BASIC_DETAIL_ADD,
              payload: {
                property: basicDetails[i].property,
                value:
                  res.data[basicDetails[i].property] === null
                    ? ""
                    : res.data[basicDetails[i].property],
              },
            });
          }
          for (let j = 1; j < res.data.facilities.length; j++) {
            dispatch({
              type: FACILITY_ADD,
            });
          }
          for (let j = 0; j < res.data.facilities.length; j++) {
            dispatch({
              type: FACILITY_UPDATE,
              payload: {
                index: j,
                value: res.data.facilities[j].title,
                property: "title",
              },
            });
            dispatch({
              type: FACILITY_UPDATE,
              payload: {
                index: j,
                value: res.data.facilities[j].description,
                property: "description",
              },
            });
            dispatch({
              type: FACILITY_UPDATE,
              payload: {
                index: j,
                value: res.data.facilities[j].id,
                property: "id",
              },
            });
          }
          for (let j = 1; j < res.data.award_and_achievement.length; j++) {
            dispatch({
              type: AWARD_ADD,
            });
          }
          for (let j = 0; j < res.data.award_and_achievement.length; j++) {
            dispatch({
              type: AWARD_UPDATE,
              payload: {
                index: j,
                value: res.data.award_and_achievement[j].title,
                property: "title",
              },
            });
            dispatch({
              type: AWARD_UPDATE,
              payload: {
                index: j,
                value: res.data.award_and_achievement[j].description,
                property: "description",
              },
            });
            dispatch({
              type: AWARD_UPDATE,
              payload: {
                index: j,
                value: res.data.award_and_achievement[j].id,
                property: "id",
              },
            });
          }
          for (let k = 0; k < res.data.document.length; k++) {
            dispatch({
              type: DOCUMENT_ADD,
              payload: {
                id: res.data.document[k].id,
                file: res.data.document[k].file,
                title: res.data.document[k].title,
              },
            });
          }
          for (let l = 0; l < res.data.gallery.length; l++) {
            dispatch({
              type: IMAGE_ADD,
              payload: {
                id: res.data.gallery[l].id,
                file: res.data.gallery[l].file,
                title: res.data.gallery[l].title,
              },
            });
          }
          setActive("Basic Detail");
        })
        .catch((err) => {
          console.log(err);
        });
      // setActive("Basic Detail");
    } else {
      setCountry("");
      setActive("Basic Detail");
    }

    // eslint-disable-next-line
  }, [slug]);
  return (
    <div className="bg-gray-100">
      {/* sucesspage from Modal*/}
      {/* <SucessMessage open={open} closeModal={closeModal} message={message} /> */}
      {/*-------------*/}
      <div className="flex justify-between py-1 items-center bg-white px-4">
        <DashboardPath paths={paths.concat(active)} />
        {/* <SaveButton handleClick={handleInstituteCreate} /> */}
      </div>
      <div className="p-4 space-y-4">
        {slug && (
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
        )}
        {slug === undefined && (
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
                >
                  <p>{step}</p>
                </div>
              );
            })}
          </div>
        )}
        <div className="border rounded bg-white institution-add-input-fields-container p-4">
          {active === "Basic Detail" && (
            <BasicDetails slug={slug} country={country} setActive={setActive} />
          )}
          {active === "Facilities" && (
            <Facilities slug={slug} setActive={setActive} />
          )}
          {active === "Award" && <Award slug={slug} setActive={setActive} />}
          {/* {active === "Scholarship" && <Schorlarship />} */}
          {active === "Document" && (
            <Document slug={slug} setActive={setActive} />
          )}
          {active === "Images" && <Images slug={slug} setActive={setActive} />}
        </div>
      </div>
    </div>
  );
};

export default Institutions;
