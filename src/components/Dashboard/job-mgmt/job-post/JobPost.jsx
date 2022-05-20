import React from "react";
import { useState, useEffect } from "react";
import { SaveButton } from "../../../common/buttons";
import axiosInstance from "../../../../api/axiosInstance";
import SucessMessage from "../../../common/SucessMessage";
import TextEditor from "../../../common/text-editor/TextEditor";

// const companyList = ["company1", "company2", "company3"];

const JobPost = ({ jobBySlug }) => {
  // const [com, setcom] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [allJobCat, setAllJobCat] = useState([]);
  //editor state
  const [editorText, setEditorText] = useState("");
  const handleEditorText = (value) => {
    setEditorText(value);
  };
  //title, taga, from, to, user, feature state
  const [job, setjob] = useState({
    company: jobBySlug.length !== 0 ? jobBySlug.company.id : "",
    title: jobBySlug.length !== 0 ? jobBySlug.title : "",
    tag: jobBySlug.length !== 0 ? jobBySlug.tags : "",
    vaccany_open: jobBySlug.length !== 0 ? jobBySlug.vaccany_open : "",
    vaccany_close: jobBySlug.length !== 0 ? jobBySlug.vaccany_close : "",
    author: jobBySlug.length !== 0 ? jobBySlug.author : "",
    description: jobBySlug.length !== 0 ? jobBySlug.description : "",
    category: jobBySlug.length !== 0 ? jobBySlug.category.id : "",
    errors: {
      company: "",
      title: "",
      tag: "",
      vaccany_open: "",
      vaccany_close: "",
      author: "",
      editorText: "",
    },
  });
  const [companyList, setCompanyList] = useState([]);
  const [companyName, setCompanyName] = useState(
    jobBySlug.length !== 0 ? jobBySlug.company.company : ""
  );
  const [companyToggle, setCompanyToggle] = useState(false);
  const handelsubmit = (e) => {
    e.preventDefault();
    setjob({
      ...job,
      errors: {
        company: "",
        title: "",
        tag: "",
        vaccany_open: "",
        vaccany_close: "",
        author: "",
        editorText: "",
      },
    });
    const {
      company,
      title,
      tag,
      vaccany_open,
      vaccany_close,
      author,
      errors,
      category,
    } = job;
    let goAhead;
    // console.log(`${year},${month},${day}`);
    if (!title) {
      errors.title = "field is required";
      goAhead = false;
    } else if (!tag) {
      errors.tag = "field is required";
      goAhead = false;
    } else if (!vaccany_open) {
      errors.vaccany_open = "field is required";
      goAhead = false;
    } else if (!vaccany_close) {
      errors.vaccany_close = "field is required";
      goAhead = false;
    } else if (
      vaccany_close.split("-")[0] < vaccany_open.split("-")[0] ||
      vaccany_close.split("-")[1] < vaccany_open.split("-")[1] ||
      vaccany_close.split("-")[2] < vaccany_open.split("-")[2]
    ) {
      errors.vaccany_close = "Cannot select date before vaccancy date";
      goAhead = false;
    } else if (!author) {
      errors.author = "field is required";
      goAhead = false;
    } else if (!editorText) {
      errors.editorText = "field is required";
      goAhead = false;
    } else if (!company) {
      errors.company = "field is required";
      goAhead = false;
    } else {
      setjob({
        ...job,
        errors: {
          company: "",
          title: "",
          tag: "",
          vaccany_open: "",
          vaccany_close: "",
          author: "",
          editorText: "",
        },
      });
      goAhead = true;
    }

    if (goAhead) {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("company", company);
      formData.append("description", editorText);
      formData.append("vaccany_open", vaccany_open);
      formData.append("vaccany_close", vaccany_close);
      formData.append("category", category);
      formData.append("tags", tag);
      if (jobBySlug.slug) {
        axiosInstance
          .put(`/job/update/${jobBySlug.slug}/`, formData)
          .then((res) => {
            setMessage("Information saved sucessfully");
            setOpen(true);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        axiosInstance
          .post(`/job/create/`, formData)
          .then((res) => {
            setMessage("Information saved sucessfully");
            setOpen(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    setjob({
      ...job,
      errors,
    });
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  };
  /*Fetch job list */
  const fetchJobLists = (signal) => {
    axiosInstance
      .get("/job-provider/create/", { signal })
      .then((res) => {
        // console.log(res.data);
        setCompanyList(res.data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // console.log(job);
  const getAllJobCategory = (signal) => {
    axiosInstance
      .get(`/job-category/create/`, { signal })
      .then((res) => {
        // console.log(res.data);
        setAllJobCat(res.data);
        jobBySlug.length === 0 && setjob({ ...job, category: res.data[0].id });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllJobCategory(signal);
    fetchJobLists(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  const {
    title,
    tag,
    vaccany_open,
    vaccany_close,
    errors,
    author,
    description,
    category,
  } = job;
  return (
    <div className="bg-gray-100  w-full">
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <form
        style={{ width: "98%" }}
        className="mx-auto bg-white pb-4 border mt-2  border-gray-300 rounded-2xl"
        onSubmit={handelsubmit}
      >
        <div className="pt-1 px-6">
          {/* Company  */}
          <div>
            <div className="ml-1">Company </div>
            <div className="flex-1 relative">
              <div
                className="flex justify-between border border-blue-400 px-3 rounded-md cursor-pointer items-center shadow-lg py-2 z-50"
                onClick={() =>
                  setCompanyToggle((companyToggle) => !companyToggle)
                }
              >
                <p className="flex-1">{companyName}</p>
                <div className="">
                  <div className="text-white bg-blue-400 rounded-full p-0.5">
                    <svg
                      className="w-4 h-4 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {companyToggle && (
                <div className="absolute w-full flex flex-col bg-white text-black z-0 border rounded-md shadow-lg  py-2 divide-y divide-gray-300 cursor-pointer max-h-64 overflow-auto">
                  {Array.isArray(companyList) &&
                    companyList.map((c, index) => {
                      const { id, company } = c;
                      return (
                        <div
                          className="w-full px-5"
                          key={index}
                          onClick={() => {
                            setjob({
                              ...job,
                              company: id,
                            });
                            setCompanyName(company);
                            setCompanyToggle((companyToggle) => !companyToggle);
                          }}
                        >
                          {company}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div className=" text-sm text-red-500">{errors.company}</div>
          </div>
          {/* Caregory  */}
          <div>
            <div className="ml-1">Category </div>
            <div className="flex-1 relative">
              {!companyToggle && (
                <select
                  name=""
                  id=""
                  className="w-full px-5 rounded-md py-1"
                  value={category}
                  onChange={(e) => setjob({ ...job, category: e.target.value })}
                >
                  <option value="0" disabled>
                    Select job category
                  </option>
                  {Array.isArray(allJobCat) &&
                    allJobCat.map((cat) => {
                      return (
                        <option value={cat.id} key={cat.id}>
                          {cat.title}
                        </option>
                      );
                    })}
                </select>
              )}
            </div>

            <div className=" text-sm text-red-500">{errors.company}</div>
          </div>
          {/* title  */}
          <div>
            <div className="ml-1">Title</div>

            <input
              onChange={(e) => setjob({ ...job, title: e.target.value })}
              type="text"
              name="title"
              value={title}
              className="w-full border p-2 text-sm border-gray-400  rounded-md"
            />
            <div className=" text-sm text-red-500">{errors.title}</div>
          </div>
          {/* text editor  */}
          <div className="mt-5 z-10">
            <div className="ml-1">Description</div>
            {!companyToggle && (
              <TextEditor
                handleEditorText={handleEditorText}
                des={description}
              />
            )}
            <div className="text-sm text-red-500">{errors.editorText}</div>
          </div>
          <div>
            {/* tags  */}
            <div>
              <div className="ml-1">Tags</div>
              <input
                type="text"
                onChange={(e) => setjob({ ...job, tag: e.target.value })}
                name="tag"
                value={tag}
                className="w-64 border p-2 text-sm border-gray-400  rounded-md"
              />
              <div className="text-sm text-red-500">{errors.tag}</div>
            </div>
            {/* from to  */}
            <div className="flex flex-col">
              <div>Vaccancy Date</div>
              <div className="flex sm:flex-row flex-col gap-4">
                {/* from  */}
                <div className="flex flex-col">
                  <div className="text-xs pl-2">from</div>
                  <input
                    type="date"
                    onChange={(e) =>
                      setjob({ ...job, vaccany_open: e.target.value })
                    }
                    name="from"
                    value={vaccany_open}
                    className=" text-sm shadow-lg rounded-full px-2"
                  />
                  <span className="ml-2 text-sm text-red-500">
                    {errors.vaccany_open}
                  </span>
                </div>
                {/* to  */}
                <div className="flex flex-col">
                  <div className="text-xs pl-2">to</div>
                  <input
                    type="date"
                    onChange={(e) =>
                      setjob({ ...job, vaccany_close: e.target.value })
                    }
                    name="to"
                    value={vaccany_close}
                    className=" text-sm shadow-lg rounded-full px-2"
                  />
                  <span className=" ml-2 text-sm text-red-500">
                    {errors.vaccany_close}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <div className="ml-1">Author Details </div>
              <input
                onChange={(e) => setjob({ ...job, author: e.target.value })}
                type="text"
                name="user"
                value={author}
                className="w-full border p-2 text-sm border-gray-400 mt-1 rounded-md"
              />
              <div className="text-sm text-red-500">{errors.author}</div>
            </div>

            {/* <div className="flex mt-2 gap-1">
              <div className="self-center">Is Photo Feature</div>
              <label
                onClick={() => {
                  setjob((pre) => {
                    return {
                      ...pre,
                      feature: !feature,
                    };
                  });
                }}
                name="feature"
                className="switch"
              >
                <input type="checkbox" />
                <span className="sliders round"></span>
              </label>
            </div> */}
          </div>
        </div>
        <div className="my-1 flex justify-end  px-10 py-2">
          <div>
            <SaveButton update={jobBySlug.slug ? "UPDATE" : ""} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default JobPost;
