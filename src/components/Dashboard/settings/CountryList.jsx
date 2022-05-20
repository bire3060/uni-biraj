import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DeleteAlertModal from "../../common/DeleteAlertModal";
import DeleteModal from "../../common/DeleteModal";

function CountryList({
  setimages,
  setid,
  setcountryname,
  setstatuss,
  setselectid,
  setpost,
  setcontinent,
}) {
  const [countryList, setCountryList] = React.useState([]);
  const [instituteId, setInstituteId] = useState("");
  const [openDeleteSucess, setOpenDeleteSucess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Data deleted sucessfully!");
  const getAllCountryLists = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        setCountryList(res.data.reverse());
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllCountryLists(signal);
    return () => {
      controller.abort();
    };
  }, []);
  // delete modal popup
  const popUpDeleteModal = (slug) => {
    setInstituteId(`/institutes/country/update/${slug}/`);
    setOpen(true);
  };
  //Close delete sucess Modal
  const closeModalDeleteMessage = () => {
    setOpenDeleteSucess(false);
    window.location.reload();
  };
  //Close delete  Modal
  const closeModalDeleteAlert = (sucess) => {
    if (sucess !== "") {
      getAllCountryLists();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  return (
    <div>
      {/* sucess delete page from Modal*/}
      <DeleteModal
        open={openDeleteSucess}
        closeModal={closeModalDeleteMessage}
        message={message}
      />
      {/*-------------*/}
      {/*  delete alert  page from Modal*/}
      <DeleteAlertModal
        open={open}
        closeModal={closeModalDeleteAlert}
        deleteUrl={instituteId}
        setMessage={setMessage}
      />
      <div className="text-xl text-gray-500 mt-5 py-5 border-t border-gray-300">
        Country Lists
      </div>
      <div className="w-full flex">
        <table className="table-auto w-full text-white">
          <thead>
            <tr className="bg-blue2">
              <th>Country</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(countryList) &&
              countryList.map((country, index) => {
                const { status, title, slug, country_image, continent } =
                  country;

                return (
                  <tr className="text-gray-600  ack" key={index}>
                    <td className="text-center py-1">{title}</td>
                    <td className="text-center py-1">
                      {status === "PH" ? "Publish" : "Draft"}
                    </td>
                    <td className="text-center py-1">
                      <span
                        onClick={() => {
                          setpost(false);
                          setid(slug);
                          setselectid(slug);
                          setimages(country_image);
                          window.scrollTo(0, 0);
                          setstatuss(status === "PH" ? true : false);
                          setcountryname(title);
                          setcontinent(continent);
                        }}
                        className="bg-green-500 text-xs cursor-pointer text-gray-100 hover:bg-green-600 px-2 p-0.5 rounded focus:outline-none"
                      >
                        Update
                      </span>
                      <span
                        // onClick={() => {
                        //   // handelDelete(id);
                        //   setdltid(id);
                        // }}
                        // onClick={() => setalertModal(id)}
                        onClick={() => {
                          popUpDeleteModal(slug);
                        }}
                        className="bg-red-500 ml-2 text-xs cursor-pointer text-gray-100 hover:bg-red-600 px-2 p-0.5 rounded focus:outline-none"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryList;
