import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import PopDetail from "./PopDetail";
import Pagination from "../../common/Pagination";
import Preloader from "../../get-started/common/PreLoader";
import DataLoader from "../../common/Loader";

function InstituteEnquiry() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [selectItems, setSelectItems] = useState(["All"]);
  const [currentButton, setCurrentButton] = useState(1);
  const [page, setPage] = useState("");
  const [load, setLoad] = useState(true);
  const [institutesLoad, setInstitutesLoad] = useState(true);
  const getAllData = (signal) => {
    axiosInstance
      .get(`/institutes/institute-inquery/list/?page=${currentButton}`, {
        signal,
      })
      .then((res) => {
        // console.log(res.data.results);
        setPage(res.data.total_pages);
        setData(res.data.results);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllInstitute = (signal) => {
    axiosInstance
      .get(`/institutes/all-list/`, { signal })
      .then((res) => {
        let val = ["All"];
        // console.log(res.data);
        res.data.forEach((data) => {
          val.push(data.name);
        });
        setSelectItems(val);
        setInstitutesLoad(false);
      })
      .catch((err) => {
        setInstitutesLoad(false);
        console.error(err);
      });
  };
  const handleSearch = (data) => {
    if (data === "All") {
      getAllData();
    } else {
      axiosInstance
        .get(`/institutes/institute-inquery/list/?search=${data}`)
        .then((res) => {
          setPage(res.data.total_pages);
          setData(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const openModal = (data) => {
    setDetail(data);
    setOpen(true);
  };
  const closeModal = (data) => {
    setOpen(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllData(signal);
    getAllInstitute(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton]);
  return (
    <>
      {load && <Preloader />}
      <PopDetail open={open} closeModal={closeModal} detail={detail} />
      <div className="py-10">
        <div className=" flex  px-10 lg:px-20">
          <div className="flex space-x-2 items-center">
            <span className="text-lg font-semibold">Filter</span>
            <select
              name=""
              id=""
              className=" border border-gray-200 focus-outline:none focus:ring-2 focus:ring-offset-2 focus:ring-pink2 rounded-lg px-10"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            >
              {Array.isArray(selectItems) &&
                selectItems.map((data, index) => {
                  return (
                    <option value={data} key={index}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="ml-2">{institutesLoad && <DataLoader />}</div>
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
                    <th className="text-left">Email</th>
                    <th className="text-left">Institute</th>
                    <th className="text-left">Inquiry Date</th>
                    <th className="text-left">Phone</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Array.isArray(data) &&
                    data.map((i, index) => {
                      const {
                        f_name,
                        l_name,
                        email,
                        phone,
                        institution,
                        created_at,
                      } = i;
                      return (
                        <tr
                          className={` px-3 border-l-8 py-2 text-sm text-gray-700  border-white`}
                          key={index}
                        >
                          <td className="py-2">
                            {f_name} {l_name}
                          </td>
                          <td className="py-2">{email}</td>
                          <td className="py-2">{institution}</td>
                          <td className="py-2">{created_at.split("T")[0]}</td>
                          <td className="py-2">{phone}</td>
                          <td className="">
                            <span
                              className="bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer"
                              onClick={() => openModal(i)}
                            >
                              View
                            </span>
                          </td>
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
}

export default InstituteEnquiry;
