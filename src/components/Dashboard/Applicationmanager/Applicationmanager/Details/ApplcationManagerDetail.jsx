import React from "react";
const ApplcationManagerDetail = ({ coursedetail }) => {
  // console.log(coursedetail);
  const {
    category,
    degree_level,
    description,
    domestic_fee,
    duration,
    images,
    institution,
    international_fee,
    status,
    study_load,
    study_mode,
  } = coursedetail;
  return (
    <div className="p-4">
      <div className=" text-2xl text-blue3 font-semibold">CSIT In Nepal</div>
      <img alt="" src={images} className="my-2 w-52" />
      <div className="md:flex  mt-4justify-between gap-8">
        <div className="w-100">
          <table className="mt-4  text-gray-600 " id="customer">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Category:</td>
                <td>{category.title}</td>
              </tr>
              <tr>
                <td>Institution:</td>
                <td>{institution.name}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{status === "PH" ? "Publish" : "Draft"}</td>
              </tr>
              <tr>
                <td>Duration:</td>
                <td>{duration} years</td>
              </tr>
              <tr>
                <td>Domestic fee:</td>
                <td>{domestic_fee}</td>
              </tr>
              <tr>
                <td>International fee:</td>
                <td>{international_fee}</td>
              </tr>
              <tr>
                <td>Study mode:</td>
                <td>
                  {study_mode === "ON"
                    ? "Online"
                    : study_mode === "OC"
                    ? "ON Campus"
                    : "Both"}
                </td>
              </tr>
              <tr>
                <td>Study load:</td>
                <td>
                  {study_load === "BO"
                    ? "Both"
                    : study_load === "FT"
                    ? "Full Time"
                    : "Part Time"}
                </td>
              </tr>
              <tr>
                <td>Degree level:</td>
                <td>{degree_level.title}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
};
export default ApplcationManagerDetail;
