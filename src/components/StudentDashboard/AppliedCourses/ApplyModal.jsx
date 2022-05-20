import Searchcard from "./Searchcard.jsx";
import Ccard from "../Common/CCard";
import "./ApplyModal.css";
// import CourseCard from "../Common/CCard";
import { useEffect, useState } from "react";

const ApplyModal = ({ searchitem, searchdata, ShowCardModal, cardModals }) => {
  const [card, setcard] = useState(searchitem);
  useEffect(() => {
    setcard(searchitem);
  }, [searchitem]);

  return (
    <>
      {ShowCardModal && (
        <div className="absolute inset-0">
          <div
            className="bg-black rounded-2xl opacity-50 transition-all duration-300 w-full h-full"
            onClick={cardModals}
          ></div>
          <div>
            <div
              style={{ height: "80vh" }}
              className="bg-white  absolute inset-0 w-11/12 sm:w-96 lg:w-3/5  m-auto py-3 rounded-2xl"
            >
              <div className="flex justify-end items-center px-3 border-b-2 pb-2 border-gray-300">
                <button
                  className="bg-gray-800 rounded-full text-gray-100 d-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center"
                  onClick={cardModals}
                >
                  X
                </button>
              </div>
              <div
                style={{ maxHeight: "67vh" }}
                className="p-4 max-h-xl h-full sbar mr-2  overflow-auto px-8 "
              >
                <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-6 rounded-xl">
                  {Array.isArray(searchdata) &&
                    searchdata.map((persons, index) => {
                      return (
                        <div key={index}>
                          {/* {if(searchitem === "institude"){
                            return ( <Ccard persons={persons} />);
                          }
                          
                          } */}
                          {console.log("nm", searchitem)}
                          {card === "institude" ? (
                            <Ccard persons={persons} />
                          ) : card === "course" ? (
                            <Searchcard persons={persons} />
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyModal;
