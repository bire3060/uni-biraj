import React from "react";
import ClassesLists from "./ClassesLists";
import IeltsAndPte from "./IeltsAndPte";
import axiosInstance from "../../../../api/axiosInstance";

function OnlineClasses() {
  const [classes, setClasses] = React.useState([]);
  const getAllClasses = (data, signal) => {
    axiosInstance
      .get(`/user/education/zoom-start/?search=${data}`, { signal })
      .then((res) => {
        // console.log(res.data);
        setClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getAllClasses("ielts");
  }, []);
  return (
    <div className="bg-gray-100 w-full relative">
      {/* top breadcrum  */}
      <div className="h-8 w-full bg-white shadow-lg">
        <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
          <div className="self-center">
            {"Dashboard > Settings > Online Classes"}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between  md:space-x-6 my-20 px-5 ">
        <div className="">
          <IeltsAndPte getAllClasses={getAllClasses} />
        </div>
        <div className="mt-10">
          <ClassesLists getAllClasses={getAllClasses} classes={classes} />
        </div>
      </div>
    </div>
  );
}

export default OnlineClasses;
