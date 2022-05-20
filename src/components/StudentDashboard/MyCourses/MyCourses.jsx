import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";
import Skeleton from "../Common/skeleton";

// import logo1 from "../../../assets/images/courses/Course-card-logo1.png";
// import logo2 from "../../../assets/images/courses/Course-card-logo2.png";
// import logo3 from "../../../assets/images/courses/Course-card-logo3.png";

// import Ccard from "../Common/CCard";
// import ApplyModal from "./ApplyModal";
import Searchcard from "./Searchcard";

function Details() {
  // search data
  // const [input, setinput] = useState({
  //   institude: "",
  //   course: "",
  // });
  // const [searchitem, setsearchitem] = useState("");
  // const { institude, course } = input;
  // const handleChang = (e) => {
  //   const { name, value } = e.target;
  //   setinput((pre) => {
  //     return { ...pre, [name]: value };
  //   });
  //   setsearchitem(name);
  // };

  // const [searchdata, setsearchdata] = useState([]);
  // const handelSearch = () => {
  //   searchitem === "institude"
  //     ? axiosInstance
  //         .get(`institutes/?search=${institude}&search_fields=name`)
  //         .then((res) => {
  //           setsearchdata(res.data);
  //         })
  //         .catch((err) => console.log(err))
  //     : axiosInstance
  //         .get(`/courses/list/?search=${course}`)
  //         .then((res) => {
  //           setsearchdata(res.data);
  //         })
  //         .catch((err) => console.log(err));
  // };

  // tags state
  // const [showTags, setShowTags] = useState(false);

  //  cards state
  const [ShowCardModal, setShowCardModal] = useState(true);
  const [load, setload] = useState(true);
  const pop = 0;

  const [getdata, setgetdata] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/courses/std-applied-course-list/")
      .then((res) => {
        setgetdata(res.data);
        setload(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Add tags
  // const tags = [
  //   {
  //     name: "institude",
  //     value: institude,
  //     tagName: "Institute",
  //     url: "",
  //   },
  //   {
  //     name: "course",
  //     value: course,
  //     tagName: "Course",
  //     url: "",
  //   },
  // ];

  const cardModals = () => {
    setShowCardModal(!ShowCardModal);
  };
  useEffect(() => {
    if (pop === 0) {
      setShowCardModal(false);
      // setShowTags(false);
    }
    if (pop === 1) {
      // setShowTags(true);
    } else if (pop === 2) {
      setShowCardModal(true);
    }
    // pop === 0 ? setShowTags(true) : pop === 1 ? setShowCardModal(true) : null;
  }, [pop]);

  return (
    <div>
      <div className="h-8 mb-2 w-full bg-white shadow-md">
        <div className="w-11/12 flex text-center h-full text-sm font-medium mx-auto">
          <div className="self-center">{"Dashboard > My Courses"}</div>
        </div>
      </div>

      <main className="rounded-xl mx-4 bg-white relative md:p-7 p-3 shadow-2xl">
        <div>
          {getdata.length === 0 && !load && (
            <div className="flex justify-center">No data to show</div>
          )}

          {load && (
            <div className=" flex mt-4  w-full justify-center space-x-2 items-center ">
              <span className="text-lg">Loading</span>
              <span>
                <DataLoader />
              </span>
            </div>
          )}

          {getdata.length > 0 && (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-10 rounded-xl">
                {getdata.map((persons, index) => {
                  return (
                    <div className=" rounded-lg" key={index}>
                      <Searchcard persons={persons} cardModals={cardModals} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Details;
