import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import SucessMessage from "../../common/SucessMessage";

function Permission() {
  const [selectedRole, setSelectedRole] = useState("SA");
  const message = "Save Successfully";
  const [open, setOpen] = useState(false);
  const [roledata, setRoleDtata] = useState([]);
  const [post, setpost] = useState(true);
  const [options, setOptions] = useState([]);
  const [rolesLists, setRolesLists] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);

  useEffect(() => {
    setPermissionChecked(options);
  }, [options]);
  const getrole = () => {
    axiosInstance
      .get(`/settings/models-list/`)
      .then((res) => {
        setOptions(
          res.data.map((data) => {
            let fulldata = { ...data, checked: false };
            return fulldata;
          })
        );

        // console.log("gh", options);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getrole();
    // axiosInstance
    //   .get(`/settings/roles-list/`)
    //   .then((res) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const [permissionChecked, setPermissionChecked] = useState([...options]);
  // console.log("hi", permissionChecked);
  const handleChang = (i) => {
    let newVal = [...permissionChecked];
    // console.log("ni", newVal);
    newVal[i].checked = !newVal[i].checked;
    setPermissionChecked(newVal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoad(true);
    let permission = [];
    for (let i = 0; i < permissionChecked.length; i++) {
      if (permissionChecked[i].checked === true) {
        permission.push(permissionChecked[i].id);
      }
    }
    let val = {
      user_type: selectedRole,
      content_type: permission,
    };
    post
      ? axiosInstance
          .post(`settings/roles-list/`, val)
          .then((res) => {
            setButtonLoad(false);
            openModal();
          })
          .catch((err) => {
            console.log(err);
          })
      : axiosInstance
          .put(`settings/roles-update/${selectedRole}`, val)
          .then((res) => {
            setButtonLoad(false);
            openModal();
          })
          .catch((err) => {
            console.log(err);
          });
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
  };
  // opem modal
  const openModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    axiosInstance.get(`settings/roles-update/${selectedRole}`).then((res) => {
      setRoleDtata(res.data);
      setpost(false);
    });
    // eslint-disable-next-line
  }, [selectedRole]);

  useEffect(() => {
    // console.log(selectedRole, newpre, roledata);
    for (let i = 0; i < permissionChecked.length; i++) {
      permissionChecked[i].checked = false;
      let newpre = [...permissionChecked];
      for (let j = 0; j < roledata.content_type.length; j++) {
        if (newpre[i].id === roledata.content_type[j]) {
          newpre[i].checked = true;
        } else if (newpre[i].id !== roledata.content_type[j]) {
          // newpre[i].checked = false;
          // newpre = [...newpre, (newpre.checked = false)];
        }
        // newpre[i].id === roledata.content_type[j]
        //   ? (newpre[i].checked = true)
        //   : [...newpre, { checked: false }];
        setPermissionChecked(newpre);
      }
    }
    // eslint-disable-next-line
  }, [roledata]);

  // getting all the roles
  const getAllRolesLists = (signal) => {
    axiosInstance
      .get("/settings/roles-list/", { signal })
      .then((res) => {
        setRolesLists(
          res.data.map((data) => {
            let fullName = {
              ...data,
              fullName:
                data.user_type === "SA"
                  ? "Super Admin"
                  : data.user_type === "ST"
                  ? "Student"
                  : data.user_type === "CO"
                  ? "Counselor"
                  : data.user_type === "AM"
                  ? "Application Manager"
                  : data.user_type === "IN"
                  ? "Instructor"
                  : "Admin",
            };
            return fullName;
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllRolesLists(signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="bg-gray-100 w-full relative">
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/* top breadcrum  */}
      <div className="h-8 w-full bg-white shadow-lg">
        <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
          <div className="self-center">
            {"Dashboard > Settings > Permission"}
          </div>
        </div>
      </div>
      <div className="py-5 px-3 md:px-10 space-y-4 bg-white max-w-md mx-auto mt-20">
        <div className="text-3xl text-gray-500 text-center mb-2">
          Permission
        </div>
        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          {/* role  */}
          <div className=" flex items-center space-x-4">
            <label
              htmlFor=""
              className="text-gray-800 text-lg font-medium w-28 "
            >
              Role
            </label>
            <div>
              <select
                onChange={(e) => {
                  // setPermissionChecked([...options]);
                  setSelectedRole(e.target.value);
                }}
                name=""
                id=""
                className="appearance-none bg-transparent border border-gray-300 rounded-md px-6"
              >
                {/* <option value="SA">Super Admin</option> */}
                {/* <option value="AD">Admin</option>
                <option value="CO">Counsler</option>
                <option value="AM">Application Manager</option> */}
                {rolesLists.map((role, index) => {
                  return (
                    <option value={role.user_type} key={index}>
                      {role.fullName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* permission  */}
          <div className=" flex  space-x-4 mt-2">
            <label
              htmlFor=""
              className="text-gray-800 text-lg  w-28 font-medium"
            >
              Permissions
            </label>
            <div className="h-72 overflow-auto">
              {Array.isArray(permissionChecked) &&
                permissionChecked.map((data, index) => {
                  const { model, checked } = data;
                  // console.log("me", data.checked);
                  return (
                    <div className="flex space-x-2 text-sm mt-1" key={index}>
                      <div>
                        <input
                          checked={checked}
                          id={index}
                          onChange={() => handleChang(index)}
                          type="checkbox"
                          className="customized-checkbox cursor-pointer"
                        />
                      </div>
                      <label
                        htmlFor={index}
                        className={`cursor-pointer ${
                          checked ? "text-pink4" : ""
                        }`}
                      >
                        {model}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="mx-auto mt-3">
            <button
              type="submit"
              disabled={buttonLoad ? true : false}
              className={`bg-pink3 text-sm font-semibold py-3  text-white 
            px-8 rounded-md  hover:bg-pink4 ${
              buttonLoad ? "disabled cursor-not-allowed" : "cursor-pointer"
            }`}
            >
              {buttonLoad ? (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Permission;
