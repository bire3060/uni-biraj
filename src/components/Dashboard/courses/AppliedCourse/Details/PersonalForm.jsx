import { inputs } from "./basic_details_lists";
import { useSelector } from "react-redux";
// import axiosInstance from "../../../api/axiosInstance";
const PersonalForm = () => {
  const { basic_details } = useSelector((state) => state.studentDetails);

  return (
    <>
      <div className="md:w-4/5 lg:w-3/5 mx-auto  w-full py-1 mb-4">
        <div>
          {inputs.map((input, index) => {
            const { property, label, type } = input;
            return (
              <div key={index}>
                <div
                  className="flex md:flex-row flex-col items-center"
                  style={{ paddingTop: 12 }}
                >
                  <div className="md:w-72 w-full font-bold text-blue3 tracking-wide">
                    {label}
                  </div>
                  {type === "select" ? (
                    <div className="w-full">
                      <div className="border w-full rounded-md shadow-md px-3 border-gray-400">
                        {basic_details[property]
                          ? basic_details[property] === "M"
                            ? "Male"
                            : basic_details[property] === "F"
                            ? "Female"
                            : "Others"
                          : "null.."}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="border w-full rounded-md shadow-md px-3 border-gray-400">
                        {basic_details[property]
                          ? basic_details[property]
                          : "null.."}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* common save button */}
          <div className="flex justify-center mt-7">
            {" "}
            {/* <button
              type="submit"
              className="bg-pink5 px-6 text-white rounded-lg text-lg py-1"
            >
              Save
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalForm;
