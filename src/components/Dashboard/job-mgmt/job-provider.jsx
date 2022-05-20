import React, { useState, useEffect } from "react";
import { isImageValid } from "../../common/filechecker";
import { SimpleFileSelectField } from "../../common/input-field";
import DashboardPath from "../../common/dashboard-path";
import { SaveButton } from "../../common/buttons";
import axiosInstance from "../../../api/axiosInstance";
import JobProviderLists from "./JobProviderLists";
import SucessMessage from "../../common/SucessMessage";

const JobProvider = () => {
  const [userinput, setUserinput] = useState({
    company: "",
    address: "",
    contact: "",
    email: "",
    website: "",
    errors: {
      company: "",
      address: "",
      contact: "",
      email: "",
      website: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [jobSlug, setJobSlub] = useState("");
  const [message, setMessage] = useState("");
  const [jobSearch, setJobSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [searchData, setSearchData] = useState("");
  const [currentButton, setCurrentButton] = useState(1);
  const [buttonLoader, setButtonLoader] = useState(true);
  const [page, setPage] = useState("");
  /*create state to put job list */
  const [joblist, setJoblist] = useState([]);

  const handleImageChange = async (event) => {
    if (event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      const forward = await isImageValid(uploadedFile);
      if (forward) {
        setSelectedFile(uploadedFile);
      } else {
      }
    }
  };
  // handeling input change
  const handleChange = ({ target: { value } }, property) => {
    handleErrors(property, value);
    setUserinput({
      ...userinput,
      [property]: value,
    });
  };
  // handeling errors
  const handleErrors = (property, value) => {
    const { company, email, address, contact, website, errors } = userinput;
    let result;
    if (property === "company") {
      if (company === "") {
        errors.company = "Field is required";
        result = false;
      } else {
        errors.company = "";
        result = true;
      }
    } else if (property === "address") {
      if (address === "") {
        errors.address = "Address cannot be left empty";
        result = false;
      } else {
        errors.address = "";
        result = true;
      }
    } else if (property === "contact") {
      if (contact === "") {
        errors.contact = "Invalid contact";
        result = false;
      } else {
        errors.contact = "";
        result = true;
      }
    } else if (property === "email") {
      if (
        !email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi
        )
      ) {
        errors.email = "Invalid email";
        result = false;
      } else {
        errors.email = "";
        result = true;
      }
    } else if (property === "website") {
      if (
        !website.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
        )
      ) {
        errors.website = "Invalid url";
        result = false;
      } else {
        errors.website = "";
        result = true;
      }
    }
    setUserinput({
      ...userinput,
      errors,
    });
    return result;
  };
  const handlesumbit = (e) => {
    e.preventDefault();
    const { company, email, address, contact, website } = userinput;
    const credentials = ["company", "address", "contact", "email", "website"];
    let goAhead;
    for (let i = 0; i < credentials.length; i++) {
      const result = handleErrors(credentials[i]);
      if (goAhead !== false) {
        goAhead = result;
      }
    }

    if (goAhead) {
      let formData = new FormData();
      formData.append("company", company);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("website", website);
      selectedFile && formData.append("image", selectedFile);
      if (jobSlug) {
        axiosInstance
          .put(`/job-provider/update/${jobSlug}/`, formData)
          .then((res) => {
            setMessage("Data updated sucessfully");
            setOpen(true);
          })
          .catch((err) => err);
      } else {
        axiosInstance
          .post("/job-provider/create/", formData)
          .then((res) => {
            setMessage("Data saved sucessfully");
            setOpen(true);
          })
          .catch((err) => err);
      }
    }
  };

  // get all job provider lists
  const fetchJobLists = (signal) => {
    axiosInstance
      .get(`/job-provider/list/?page=${currentButton}&search=${searchData}`, {
        signal,
      })
      .then((res) => {
        setPage(res.data.total_pages);
        setJoblist(res.data.results);
        setButtonLoader(false);
      })
      .catch((err) => {
        setButtonLoader(false);
        console.error(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchJobLists(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [currentButton, page]);

  const setJobProviderSlug = (job, slug) => {
    setJobSlub(slug);
    setUserinput({
      company: job.company,
      address: job.address,
      contact: job.contact,
      email: job.email,
      website: job.website,
      errors: {
        company: "",
        address: "",
        contact: "",
        email: "",
        website: "",
      },
    });
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  };

  // searching
  const searchHandler = (e) => {
    e.preventDefault();
    fetchJobLists();
  };

  const paths = ["Dashboard", "Job Management", "Job Provider"];

  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <div className="bg-gray-100">
        <div className="flex justify-between py-1 items-center bg-white px-4">
          <DashboardPath paths={paths} />
        </div>
        <div className="bg-white sm:p-2 m-1 sm:m-4 rounded-lg border border-blue-400">
          <form onSubmit={handlesumbit} className="sm:pl-4 pt-4">
            <div className="bg-blue3 w-36 ml-6 sm:ml-0  text-center uppercase font-bold rounded-lg text-white">
              Job Provider
            </div>

            <div className="w-10/12 mx-auto sm:mx-0 pt-2 shadow-md rounded">
              {/* company  */}
              <div className="sm:flex pt-2   min-h-8 rounded shadow-lg">
                <div className="sm:w-2/12 w-full bg-gray-100 sm:bg-white h-full text-center align-middle sm:border-r border-blue-400">
                  Company
                </div>
                <div className="sm:w-10/12 flex-1">
                  <input
                    id="company"
                    className="w-full sm:h-full px-3"
                    type="text"
                    name="company"
                    value={userinput.company}
                    onChange={(e) => handleChange(e, "company")}
                  />
                </div>
                {userinput.errors.company && (
                  <div className="text-sm text-red-400">
                    {userinput.errors.company}
                  </div>
                )}
              </div>
              {/* address  */}
              <div className="sm:flex pt-2   min-h-8 rounded shadow-lg">
                <div className="sm:w-2/12 w-full bg-gray-100 sm:bg-white h-full text-center align-middle sm:border-r border-blue-400">
                  Address
                </div>
                <div className="sm:w-10/12 flex-1">
                  <input
                    id="address"
                    className="w-full sm:h-full px-3"
                    type="text"
                    name="address"
                    value={userinput.address}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </div>
                {userinput.errors.address && (
                  <div className="text-sm text-red-400">
                    {userinput.errors.address}
                  </div>
                )}
              </div>
              {/* contact  */}
              <div className="sm:flex pt-2   min-h-8 rounded shadow-lg">
                <div className="sm:w-2/12 w-full bg-gray-100 sm:bg-white h-full text-center align-middle sm:border-r border-blue-400">
                  Contact
                </div>
                <div className="sm:w-10/12 flex-1">
                  <input
                    id="contact"
                    className="w-full sm:h-full px-3"
                    type="number"
                    name="contact"
                    value={userinput.contact}
                    onChange={(e) => handleChange(e, "contact")}
                  />
                </div>
                {userinput.errors.contact && (
                  <div className="text-sm text-red-400">
                    {userinput.errors.contact}results
                  </div>
                )}
              </div>
              {/* email  */}
              <div className="sm:flex pt-2   min-h-8 rounded shadow-lg">
                <div className="sm:w-2/12 w-full bg-gray-100 sm:bg-white h-full text-center align-middle sm:border-r border-blue-400">
                  Email
                </div>
                <div className="sm:w-10/12 flex-1">
                  <input
                    id="email"
                    className="w-full sm:h-full px-3"
                    type="email"
                    name="email"
                    value={userinput.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </div>
                {userinput.errors.email && (
                  <div className="text-sm text-red-results400">
                    {userinput.errors.email}
                  </div>
                )}
              </div>
              {/* website  */}
              <div className="sm:flex pt-2   min-h-8 rounded shadow-lg">
                <div className="sm:w-2/12 w-full bg-gray-100 sm:bg-white h-full text-center align-middle sm:border-r border-blue-400">
                  Website
                </div>
                <div className="sm:w-10/12 flex-1">
                  <input
                    id="website"
                    className="w-full sm:h-full px-3"
                    type="url"
                    name="website"
                    value={userinput.website}
                    onChange={(e) => handleChange(e, "website")}
                  />
                </div>
                {userinput.errors.website && (
                  <div className="text-sm text-red-400">
                    {userinput.errors.website}
                  </div>
                )}
              </div>
            </div>

            <div className="w-10/12 mx-auto sm:mx-0 pt-2  rounded">
              <div className="flex h-9 rounded shadow-lg">
                <div className="w-2/12 px-1 sm:px-0 h-full text-center align-middle sm:border-r border-blue-400">
                  Image
                </div>
                <div className="w-10/12 px-3">
                  <SimpleFileSelectField
                    file={selectedFile}
                    handleImageChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <SaveButton update={jobSlug && "Update"} />
            </div>
          </form>
          {/* lists  */}
          <div className="bg-white shadow-lg mt-8 ">
            <div className="flex sm:flex-row gap-2 sm:gap-0 flex-col justify-between">
              <div className="bg-blue3 mx-auto sm:mx-0 w-36 text-center uppercase font-bold rounded-lg text-white">
                Job Provider
              </div>
              <div className="relative mx-auto sm:mx-0">
                <form onSubmit={searchHandler}>
                  <input
                    type="text"
                    value={searchData}
                    placeholder="Search by company name"
                    className={` text-sm w-52 h-8 mx-1 sm:mx-4 placeholder-gray-500 shadow-lg bg-white p-3 pr-8 border border-gray3 rounded-full `}
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 h-7 w-7 rounded-full right-5 cursor-pointer flex items-center justify-center"
                    style={{ transform: "translateY(-50%)" }}
                  >
                    <svg
                      viewBox="0 0 512.005 512.005"
                      fill="currentColor"
                      className="w-4"
                    >
                      <g>
                        <g>
                          <path
                            d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
              S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
              c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
               M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div
              // style={{ width: window.innerWidth > 1019 ? "100%" : "80vw" }}
              className="overflow-x-auto  lg:mx-0 mt-4  "
            >
              <JobProviderLists
                setJobProviderSlug={setJobProviderSlug}
                fetchJobLists={fetchJobLists}
                buttonLoader={buttonLoader}
                page={page}
                setCurrentButton={setCurrentButton}
                currentButton={currentButton}
                joblist={joblist}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobProvider;
