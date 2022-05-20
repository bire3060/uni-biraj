import React from "react";
import { AdvancedSelectField } from "../../common/input-field";
import Header from "../common/header";
// import Proceed from "../common/proceed";
import { useDispatch } from "react-redux";
import { ADD_GET_STARTED_FILTER } from "../../../redux/actions/getStartedType";

// duration first
let duration1 = [];

for (let i = 0; i <= 12; i++) {
  duration1.push(i);
}

// duration first
let duration2 = [];

for (let i = 13; i <= 24; i++) {
  duration2.push(i);
}

// duration first
let duration3 = [];

for (let i = 25; i <= 36; i++) {
  duration3.push(i);
}

// duration first
let duration4 = [];

for (let i = 37; i <= 48; i++) {
  duration4.push(i);
}

// duration first
let duration4Plus = [];

for (let i = 49; i <= 96; i++) {
  duration4Plus.push(i);
}

const durations = [
  {
    label: "select from here",
    value: null,
  },
  {
    label: "1 Year",
    value: duration1.join(),
  },
  {
    label: "2 Years",
    value: duration2.join(),
  },
  {
    label: "3 Years",
    value: duration3.join(),
  },
  {
    label: "4 Years",
    value: duration4.join(),
  },
  {
    label: "4+ Years",
    value: duration4Plus.join(),
  },
];

const scrollToTop = () => window.scrollTo(0, 0);
const Duration = ({ setActive, setStep }) => {
  const dispatch = useDispatch();
  const handleChange = (data) => {
    dispatch({
      type: ADD_GET_STARTED_FILTER,
      payload: data,
      property: "duration_started",
    });
    setStep((preVal) => preVal + 1);
    setActive("studyLoad");
    scrollToTop();
  };
  // const [activeDegree, setActiveDegree] = useState("");
  return (
    <div className="space-y-10  py-6 rounded-lg ">
      <Header text="Duration of your study?" />
      <div>
        <div className="text-sm text-gray-700 text-center mb-2">
          Education is not the learning of facts, but the training of the mind
          to think
        </div>
        <div className="flex justify-center space-x-5 "></div>
      </div>
      <div className="w-60 mx-auto md:w-72 lg:w-96">
        <AdvancedSelectField
          label="Select your duration"
          handleChange={handleChange}
          options={durations}
        />
      </div>
      {/* <Proceed setActive={() => setActive("highestEducationLevel")} step={2} /> */}
      <div className="pt-5">
        {/* <Proceed setActive={() => setActive("studyLoad")} step={5} /> */}
      </div>
    </div>
  );
};

export default Duration;
