import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  COURSE_IELTS_DETAILS_ADD,
  COURSE_PTE_DETAILS_ADD,
} from "../../../../redux/actions/actionsTypes";
const ielts = [
  {
    property: "listening",
    label: "Listening",
    type: "number",
  },
  {
    property: "reading",
    label: "Reading",
    type: "number",
  },
  {
    property: "writing",
    label: "Writing",
    type: "number",
  },
  {
    property: "speaking",
    label: "Speaking",
    type: "number",
  },
  {
    property: "overall",
    label: "Overall",
    type: "number",
  },
];
const ptes = [
  {
    property: "listening",
    label: "Listening",
    type: "number",
  },
  {
    property: "reading",
    label: "Reading",
    type: "number",
  },
  {
    property: "writing",
    label: "Writing",
    type: "number",
  },
  {
    property: "speaking",
    label: "Speaking",
    type: "number",
  },
  {
    property: "overall",
    label: "Overall",
    type: "number",
  },
];
const IELTS = () => {
  const { ietls, pte } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="text-xl font-medium ml-4">IELTS</div>
      <div className="p-4 mb-2 shadow-lg">
        <div className=" mx-auto border border-gray-200 rounded-lg overflow-hidden">
          {ielts.map((field, index) => {
            const { property, label, type } = field;
            const error = ietls.errors[property];
            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center  sm:pr-4 ${
                  ielts.length - 1 > index && "border-b border-gray-400"
                }`}
              >
                <div className=" sm:w-40 h-10 w-full  pl-4 flex items-center bg-gray-200">
                  {label}
                </div>
                <input
                  className=" h-10 flex-1 px-2 "
                  spellCheck="false"
                  type={type}
                  name={label}
                  value={ietls[property]}
                  onChange={(event) =>
                    dispatch({
                      type: COURSE_IELTS_DETAILS_ADD,
                      payload: {
                        property: property,
                        value: event.target.value,
                      },
                    })
                  }
                />
                {error && <div className="text-sm text-red-400">{error}</div>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-xl font-medium ml-4">PTE</div>
      <div className="p-3 shadow-lg">
        <div className=" mx-auto border border-gray-200 rounded-lg overflow-hidden">
          {ptes.map((field, index) => {
            const { property, label, type } = field;
            const error = pte.errors[property];
            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center  sm:pr-4 ${
                  ptes.length - 1 > index && "border-b border-gray-400"
                }`}
              >
                <div className=" sm:w-40 h-10 w-full  pl-4 flex items-center bg-gray-200">
                  {label}
                </div>
                <input
                  className=" h-10 flex-1 px-2"
                  spellCheck="false"
                  type={type}
                  name={label}
                  value={pte[property]}
                  onChange={(event) =>
                    dispatch({
                      type: COURSE_PTE_DETAILS_ADD,
                      payload: {
                        property: property,
                        value: event.target.value,
                      },
                    })
                  }
                />
                {error && <div className="text-sm text-red-400">{error}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IELTS;
