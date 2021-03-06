import React from "react";
// import { SimpleSelectField } from "../common/input-field";
import { useSelector } from "react-redux";
const Heading = ({ toggleCourseFilter }) => {
  // const [sort, setSort] = useState(sortOptions[0].value);
  // const handleChange = (event) => {
  //   setSort(event.target.value);
  // };
  const { course_count } = useSelector((state) => state.courseFilter);
  return (
    <>
      <div className="flex items-end justify-between ">
        <div>
          <div className="font-bold text-lg md:text-xl lg:text-2xl">
            Courses
          </div>
          <div className="text-sm text-gray7">{course_count} Results</div>
        </div>
      </div>
      <div className="flex justify-end mr-2 xl:hidden">
        <div
          className="mt-2 cursor-pointer flex space-x-2 hover:bg-gray3 py-1 px-2 rounded-lg"
          onClick={toggleCourseFilter}
        >
          <div className="">Filters</div>
          <div>
            <svg viewBox="0 0 512 512" className="w-5 h-5" fill="currentColor">
              <g>
                <path d="m432.733 112.467h-228.461c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-35.661c-8.284 0-15 6.716-15 15s6.716 15 15 15h35.662c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h228.461c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-273.133 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z" />
                <path d="m432.733 241h-35.662c-6.281-18.655-23.927-32.133-44.672-32.133s-38.39 13.478-44.671 32.133h-228.461c-8.284 0-15 6.716-15 15s6.716 15 15 15h228.461c6.281 18.655 23.927 32.133 44.672 32.133s38.391-13.478 44.672-32.133h35.662c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-80.333 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z" />
                <path d="m432.733 369.533h-164.194c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-99.928c-8.284 0-15 6.716-15 15s6.716 15 15 15h99.928c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h164.195c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-208.866 32.134c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.685 17.133 17.132-7.686 17.134-17.133 17.134z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
