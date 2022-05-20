import React, { useState } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
function CourseInfoToggle({
  study_mode,
  study_load,
  category,
  degree_level,
  international_fee,
  domestic_fee,
  admissionTel,
  campusName,
  institution,
  campusPostcode,
  countryCodeStr,
  courseCode,
  created,
  currency,
  disteduAvailable,
  duration,
  govPrivate,
  postCode,
  regionNameEn,
  intakeDateEn,
  marketingEmail1,
  marketingEmail2,
  enquiryEmail1,
  enquiryEmail2,
  englishReq,
  admissionReq,
  courseWebsite,
}) {
  const headBar = [
    "Overall Course",
    "Requirements",
    "Fee & Funds",
    "Contact",
    "Others",
  ];

  const [active, setActive] = useState(0);
  const [head, setHead] = useState("Overall Course");
  const handleIndex = (data, header) => {
    setActive(parseInt(data));
    setHead(header);
  };

  return (
    <div className="flex flex-col mt-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-200 shadow-md p-5 rounded-md px-4 sm:px-10">
        {headBar.map((head, index) => {
          return (
            <div
              key={index}
              onClick={() => handleIndex(index, head)}
              className={`${
                active === index ? "bg-blue3 text-white" : "text-gray-600"
              }  text-center rounded-md py-1 cursor-pointer`}
            >
              {head}
            </div>
          );
        })}
      </div>
      <div className=" border border-gray-200 shadow-md p-5 rounded-md px-4 sm:px-10 mt-5">
        {head === "Overall Course" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* study load  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Study Load:</span>
              <span className="text-gray-600">
                {" "}
                {study_load === "PT" && "Part Time"}
                {study_load === "FT" && "Full Time"}
                {study_load === "BO" && "Both"}
              </span>
            </div>
            {/* study Mode  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Study Mode:</span>
              <span className="text-gray-600">
                {study_mode === "BO" && "Online/On Campus"}
                {study_mode === "ON" && "Online"}
                {study_mode === "OC" && "On Campus"}
              </span>
            </div>
            {/* Course Category  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Discipline:</span>
              <span className="text-gray-600">
                {category ? category.title : ""}
              </span>
            </div>
            {/* Degree Level  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Degree Level:</span>
              <span className="text-gray-600">
                {degree_level ? degree_level.title : ""}
              </span>
            </div>
            {/* Location  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Location:</span>
              <span className="text-gray-600">{institution.address.title}</span>
            </div>

            {/* campus name  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Campus Name:</span>
              <span className="text-gray-600">
                {campusName ? campusName : ""}
              </span>
            </div>

            {/* country code  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Country Code:</span>
              <span className="text-gray-600">
                {countryCodeStr ? countryCodeStr : ""}
              </span>
            </div>

            {/* intake date  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Intake Date:</span>
              <span className="text-gray-600">
                {intakeDateEn ? intakeDateEn : ""}
              </span>
            </div>
          </div>
        )}
        {head === "Requirements" && (
          <div className="flex flex-col">
            {/* ielts  */}
            {/* <div className="flex items-center space-x-5 mt-5 ">
              <div className="text-blue3 font-semibold text-lg">IELTS</div>
              <div
                className=" overflow-x-auto"
                style={{
                  width: "500px",
                }}
              >
                <table className=" table-auto w-full h-20">
                  <thead>
                    <tr>
                      <th className="text-left text-gray-600">Listening</th>
                      <th className="text-left text-gray-600">Reading</th>
                      <th className="text-left text-gray-600">Writing</th>
                      <th className="text-left text-gray-600">Speaking</th>
                      <th className="text-left text-gray-600">Overall</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td>{itels ? itels.listening : ""}</td>
                      <td>{itels ? itels.reading : ""}</td>
                      <td>{itels ? itels.writing : ""}</td>
                      <td>{itels ? itels.speaking : ""}</td>
                      <td>
                        <span className="bg-blue3 text-white rounded-full w-10 h-10 flex justify-center items-center">
                          {itels ? itels.overall : ""}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            {/* PTE  */}
            {/* <div className="flex items-center space-x-5 mt-10 ">
              <div className="text-blue3 font-semibold text-lg">PTE</div>
              <div
                className=" overflow-x-auto"
                style={{
                  width: "500px",
                }}
              >
                <table className=" table-auto w-full h-20">
                  <thead>
                    <tr>
                      <th className="text-left text-gray-600">Listening</th>
                      <th className="text-left text-gray-600">Reading</th>
                      <th className="text-left text-gray-600">Writing</th>
                      <th className="text-left text-gray-600">Speaking</th>
                      <th className="text-left text-gray-600">Overall</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td>{pte ? pte.listening : ""}</td>
                      <td>{pte ? pte.reading : ""}</td>
                      <td>{pte ? pte.writing : ""}</td>
                      <td>{pte ? pte.speaking : ""}</td>
                      <td>
                        <span className="bg-blue3 text-white rounded-full w-10 h-10 flex justify-center items-center">
                          {pte ? pte.overall : ""}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            <div className="grid grid-cols-1 gap-6">
              {/* admission requirement */}
              <div className="flex justify-center flex-col">
                <div className="font-semibold">Admission Requirement:</div>
                <div className="text-gray-600">
                  <div className="flex space-x-2 items-center mt-1">
                    <span className="overflow-hidden">
                      {admissionReq ? admissionReq : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* english requirement */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold">English Requirement:</span>
                <span className="text-gray-600">
                  {englishReq ? englishReq : ""}
                </span>
              </div>
            </div>
          </div>
        )}
        {head === "Fee & Funds" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
            {/* internatrional fee  */}
            <div className="flex space-x-2">
              <span className="mt-1">
                <svg
                  className="w-8 h-8 text-blue3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-semibold text-gray-600">
                  $ {international_fee}
                </span>
                <span className="text-pink4 text-sm">International fee</span>
              </div>
            </div>
            {/* Domestic fee  */}
            <div className="flex space-x-2">
              <span className="mt-1">
                <svg
                  className="w-8 h-8 text-blue3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-semibold text-gray-600">
                  $ {domestic_fee}
                </span>
                <span className="text-pink4 text-sm">Domestic fee</span>
              </div>
            </div>
            {/* currency */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Currency:</span>
              <span className="text-gray-600">{currency ? currency : ""}</span>
            </div>
          </div>
        )}
        {/* {head === "Images" && (
          <div className="flex py-5">
            <div>
              <img src={images} alt="" />
            </div>
          </div>
        )} */}
        {head === "Contact" && (
          <div className="grid grid-cols-1 gap-6">
            {/* marketing email 1 */}
            <div className="flex justify-center flex-col">
              <div className="font-semibold">Marketing Email:</div>
              <div className="text-gray-600">
                <div className="flex space-x-2 items-center mt-1">
                  <span>
                    <VscDebugBreakpointLog />
                  </span>
                  <span className="overflow-hidden">
                    {marketingEmail1 ? marketingEmail1 : ""}
                  </span>
                </div>
              </div>
              <div className="text-gray-600">
                <div className="flex space-x-2 items-center mt-1">
                  <span>
                    <VscDebugBreakpointLog />
                  </span>
                  <span className="overflow-hidden">
                    {marketingEmail2 ? marketingEmail2 : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* enquiry email */}
            <div className="flex justify-center flex-col">
              <div className="font-semibold">Enquiry Email:</div>
              <div className="text-gray-600">
                <div className="flex space-x-2 items-center mt-1">
                  <span>
                    <VscDebugBreakpointLog />
                  </span>
                  <span className="overflow-hidden">
                    {enquiryEmail1 ? enquiryEmail1 : ""}
                  </span>
                </div>
              </div>
              <div className="text-gray-600">
                <div className="flex space-x-2 items-center mt-1">
                  <span>
                    <VscDebugBreakpointLog />
                  </span>
                  <span className="overflow-hidden">
                    {enquiryEmail2 ? enquiryEmail2 : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* marketing email 1 */}
            <div className="flex justify-center flex-col">
              <div className="font-semibold">Course Website:</div>
              <div className="text-gray-600">
                <div className="flex items-center mt-1">
                  <span className="overflow-hidden">
                    {courseWebsite ? courseWebsite : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
              {/* admission telephone */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Admission Telephone:</span>
                <span className="text-gray-600">
                  {admissionTel ? admissionTel : ""}
                </span>
              </div>

              {/* institution contact */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Institution Contact:</span>
                <span className="text-gray-600">
                  {institution || institution.contact
                    ? institution.contact
                    : ""}
                </span>
              </div>
            </div>
          </div>
        )}
        {head === "Others" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* distance education available  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Education Available:</span>
              <span className="text-gray-600">
                {disteduAvailable
                  ? disteduAvailable === "1"
                    ? "Available"
                    : "Not Available"
                  : ""}
              </span>
            </div>

            {/* duration  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Duration:</span>
              <span className="text-gray-600">{duration ? duration : ""}</span>
            </div>

            {/* gov private  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Private Government:</span>
              <span className="text-gray-600">
                {govPrivate ? (govPrivate === "1" ? "True" : "False") : ""}
              </span>
            </div>

            {/* post code  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Post Code:</span>
              <span className="text-gray-600">{postCode ? postCode : ""}</span>
            </div>

            {/* region name  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Region Name:</span>
              <span className="text-gray-600">
                {regionNameEn ? regionNameEn : ""}
              </span>
            </div>
            {/* created  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Course Added:</span>
              <span className="text-gray-600">
                {created ? created.split("T")[0] : ""}
              </span>
            </div>
            {/* course code  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Course Code:</span>
              <span className="text-gray-600">
                {courseCode ? courseCode : ""}
              </span>
            </div>

            {/* campus post code  */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Campus Post Code:</span>
              <span className="text-gray-600">
                {campusPostcode ? campusPostcode : ""}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseInfoToggle;
