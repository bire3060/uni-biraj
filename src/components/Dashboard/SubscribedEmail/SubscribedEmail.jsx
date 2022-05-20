import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Pagination from "../../common/Pagination";
import Preloader from "../../get-started/common/PreLoader";

const SubscribedEmail = () => {
  const [data, setData] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);

  const getAllData = (signal) => {
    axiosInstance
      .get(`settings/claim-gift/list/?page=${currentButton}`, {
        signal,
      })
      .then((res) => {
        setPage(res.data.total_pages);
        setData(res.data.results);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const openModal = (data) => {
  //     setDetail(data);
  //     setOpen(true);
  //   };
  //   const closeModal = (data) => {
  //     setOpen(false);
  //   };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllData(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton]);

  return (
    <>
      {load && <Preloader />}

      <div className="py-10">
        <div className="px-14 font-bold text-2xl text-gray-600 mb-4">
          All Subscribed Email List
        </div>
        <div
          // style={{ width: window.innerWidth > 1019 ? "75vw" : "100vw" }}
          className="overflow-x-auto sm:px-2 lg:px-0 pb-8"
        >
          {data.length === 0 ? (
            <div className="flex justify-center mt-10">No data to show</div>
          ) : (
            <div
              style={{ width: window.innerWidth < 1260 && 1000 }}
              className=" mx-auto  md:w-11/12 bg-white border mt-2 border-gray-300 rounded-2xl px-5 py-2"
            >
              <table
                style={{ color: "crimson" }}
                className=" table-auto w-full"
              >
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Country</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Contact</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Array.isArray(data) &&
                    data.map((i, index) => {
                      const { contact, country, email, f_name } = i;

                      return (
                        <tr
                          className={` px-3 border-l-8 py-2 text-sm text-gray-700  border-white`}
                          key={index}
                        >
                          <td className="py-2">{f_name}</td>
                          <td className="py-2">{country}</td>
                          <td className="py-2">{email}</td>
                          <td className="py-2">{contact}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {page > 1 && (
          <Pagination
            setCurrentButton={setCurrentButton}
            currentButton={currentButton}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default SubscribedEmail;
