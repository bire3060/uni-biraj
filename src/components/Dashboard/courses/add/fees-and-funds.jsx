import React, { useState, useEffect } from "react";
import {
  COURSE_INTERNATION_FEE_ADD,
  COURSE_DOMESTICE_FEE_ADD,
} from "../../../../redux/actions/actionsTypes";
import { useDispatch, useSelector } from "react-redux";
const FeesAndFunds = () => {
  const dispatch = useDispatch();
  const [domestic, setDomestic] = useState("");
  const [international, setInternational] = useState("");
  const { errors } = useSelector((state) => state.course);
  const { domestice_fee, international_fee } = useSelector(
    (state) => state.course
  );
  useEffect(() => {
    if (domestice_fee) {
      setDomestic(domestice_fee);
    }
    if (international_fee) {
      setInternational(international_fee);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="p-4 mb-2 w-full  md:w-1/2 shadow-lg">
        <div className=" mx-auto border border-gray-200 rounded-lg overflow-hidden">
          <div
            className={`flex flex-col sm:flex-row items-center border-b border-gray-400 sm:pr-4 relative`}
          >
            <div className="sm:w-60 h-10 w-full  pl-4 flex items-center bg-gray-200">
              Domestic Fee
            </div>
            <input
              className=" h-10 w-full px-2"
              id="domestice"
              name="domestice"
              value={domestic}
              onChange={(e) => {
                dispatch({
                  type: COURSE_DOMESTICE_FEE_ADD,
                  payload: e.target.value,
                });
                setDomestic(e.target.value);
              }}
              spellCheck="false"
              type="number"
            />
            <div className="text-sm text-red-400 absolute top-2.5 right-2.5">
              {errors.domestice_fee}
            </div>
          </div>
          <div
            className={`flex flex-col sm:flex-row items-center  sm:pr-4 relative`}
          >
            <div className="sm:w-60 h-10 w-full  pl-4 flex items-center bg-gray-200">
              International Fee
            </div>
            <input
              className=" h-10 w-full px-2"
              id="international"
              name="international"
              value={international}
              onChange={(e) => {
                dispatch({
                  type: COURSE_INTERNATION_FEE_ADD,
                  payload: e.target.value,
                });
                setInternational(e.target.value);
              }}
              spellCheck="false"
              type="number"
            />
            <div className="text-sm text-red-400 absolute top-2.5 right-2.5">
              {errors.international_fee}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesAndFunds;
