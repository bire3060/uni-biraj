import React, { useState, useRef, useEffect } from "react";
// import { useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import SucessMessage from "../../common/SucessMessage";
import { SaveButton } from "../../common/buttons";
import { toast } from "react-toastify";

function PrekasAdd({ perkById }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [save, setSave] = useState(false);
  /* destructring title, category, image and auth */
  const selectedImageName = useRef();
  const [perkImage, setPerkImg] = useState("");
  const [imageError, setImageError] = useState("");
  const [countryList, setCountryList] = useState([]);
  /* sate to get title, category, author and image */
  const [perk, setperk] = useState({
    title: perkById ? perkById.title : "",
    description: perkById ? perkById.details : "",
    country: perkById ? perkById.country : "",
    errors: {
      title: "",
      description: "",
      country: "",
    },
  });
  //handle sumbit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, errors } = perk;
    let goAhead;
    if (!title) {
      errors.title = "field is required";
      goAhead = false;
    } else if (description === "") {
      errors.title = "";
      errors.description = "field is required";
      goAhead = false;
    } else if (country === "") {
      errors.description = "";
      errors.country = "field is required";
      goAhead = false;
    } else if (!perkImage && !perkById.image) {
      setImageError("Choose a image");
      goAhead = false;
    } else {
      setImageError("");
      goAhead = true;
    }
    if (goAhead) {
      setSave(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("details", description);
      formData.append("country", country);
      perkImage && formData.append("image", perkImage);
      if (perkById.id) {
        axiosInstance
          .patch(`/std-gift-update/${perkById.id}/`, formData)
          .then((res) => {
            setMessage("Information updated sucessfully");
            setSave(false);
            setOpen(true);
          })
          .catch((err) => {
            setSave(false);
            toast.error(`${err.response.data.image}`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        axiosInstance
          .post(`/std-gift-create/`, formData)
          .then((res) => {
            setMessage("Information saved sucessfully");
            setOpen(true);
            setSave(false);
          })
          .catch((err) => {
            setSave(false);
            toast.error(`${err.response.data.image}`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    }

    setperk({
      ...perk,
      errors,
    });
  };
  //Close Modal
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  };
  // setImage
  const handleImageSet = (file) => {
    if (file) {
      const fileName = file.name;
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = function () {
        let arr = fileName.split(".");
        let extension = arr[arr.length - 1];
        const extensions = ["PNG", "JPEG", "JPG", "png", "jpg", "jpeg", "webp"];
        let bool = false;
        for (let i = 0; i < extensions.length; i++) {
          if (extensions[i] === extension) {
            bool = true;
            i = extensions.length;
          }
        }
        if (bool) {
          setPerkImg(file);
          // handleImageChange(file);
          setImageError("");
        } else {
          setPerkImg("");
          setImageError("Invalid file");
        }
      };
      image.onerror = function () {
        setPerkImg("");
        setImageError("Invalid file");
      };
      selectedImageName.current.innerHTML = fileName;
    }
  };
  const getAllCountry = (signal) => {
    axiosInstance
      .get(`/institutes/country/list/`, { signal })
      .then((res) => {
        setCountryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllCountry(signal);
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);
  const { title, description, errors, country } = perk;
  // console.log(perkImage);
  return (
    <>
      {/* sucesspage from Modal*/}
      <SucessMessage open={open} closeModal={closeModal} message={message} />
      {/*-------------*/}
      <div
        style={{ width: "98%" }}
        className="mx-auto bg-white pb-4 border mt-2 relative border-gray-300 rounded-2xl"
      >
        <form className="pt-1 px-6" onSubmit={handleSubmit}>
          {/* title  */}
          <div>
            <div className="ml-1">Title</div>
            <input
              name="title"
              value={title}
              type="text"
              onChange={(e) => setperk({ ...perk, title: e.target.value })}
              className="w-full border border-gray-400 px-2 rounded-md"
            />
            <div className="text-sm text-red-500">{errors.title}</div>
          </div>
          {/* text editor  */}
          <div className="mt-5">
            <div className="ml-1">Descrption</div>{" "}
            <textarea
              className="w-full border border-gray-400 p-2 h-32 resize-none rounded-md"
              onChange={(e) =>
                setperk({ ...perk, description: e.target.value })
              }
              value={description}
            ></textarea>
            <div className="text-sm text-red-500">{errors.description}</div>
          </div>
          {/* Country  */}
          <div className="mt-5">
            <div className="ml-1">Country</div>{" "}
            <select
              name=""
              id=""
              className="w-full border border-gray-400 px-2 rounded-md"
              value={country}
              onChange={(e) => setperk({ ...perk, country: e.target.value })}
            >
              {Array.isArray(countryList) &&
                countryList.map((data) => {
                  return (
                    <option key={data.id} value={data.title}>
                      {data.title}
                    </option>
                  );
                })}
            </select>
            <div className="text-sm text-red-500">{errors.country}</div>
          </div>
          <div className="mb-5">
            {/* image  */}
            <div className="mt-4 space-x-4">
              <label className="ml-1 ">Image</label>
              <input
                type="file"
                id="input-file"
                className=""
                onChange={(event) => {
                  handleImageSet(event.target.files[0]);
                }}
                ref={selectedImageName}
              />
              <div className="text-sm text-red-500">{imageError}</div>
            </div>
          </div>
          {save ? (
            <div className="bg-pink3 text-sm font-semibold py-1 text-white flex space-x-1 items-center px-2 rounded-md cursor-pointer hover:bg-pink4">
              <div className="lds-ring m-auto mb-2">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <SaveButton update={perkById.id ? "UPDATE" : ""} />
          )}
        </form>
      </div>
    </>
  );
}

export default React.memo(PrekasAdd);
