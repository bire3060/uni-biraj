import React, { useState, useEffect, useRef } from "react";
// import { useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { SaveButton } from "../../common/buttons";
import TextEditor from "../../common/text-editor/TextEditor";
import SucessMessage from "../../common/SucessMessage";

function AddBlog({ blogBySlug }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [save, setSave] = useState(false);
  /*sate to get the description */
  const [editorText, setEditorText] = useState("");
  const [courseCategoryList, setCourseCategoryList] = useState([]);
  const [selecetdCourseCategoryList, setSelecetdCourseCategoryList] = useState(
    blogBySlug.category == null ? [] : blogBySlug.category
  );
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [toggle, settoggle] = useState(false);
  /* destructring title, category, image and auth */
  const selectedImageName = useRef();
  const [blogImage, setblogImage] = useState("");
  const [imageError, setImageError] = useState("");
  /* sate to get title, category, author and image */
  const [blog, setblog] = useState({
    title: blogBySlug.length !== null ? blogBySlug.title : "",
    category: blogBySlug.category == null ? "" : blogBySlug.category,
    description: blogBySlug.length !== null ? blogBySlug.description : "",
    author: blogBySlug.length !== null ? blogBySlug.author : "",
    errors: {
      title: "",
      category: "",
      description: "",
      author: "",
      editorText: "",
    },
  });

  // handle editor state
  const handleEditorText = (value) => {
    setEditorText(value);
  };
  /* state to toggle */
  const handleswitchchange = () => {
    settoggle((toggle) => !toggle);
  };
  //handle sumbit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, category, author, errors } = blog;
    if (!title) {
      errors.title = "field is required";
    } else if (!category) {
      errors.title = "";
      errors.category = "field is required";
    } else if (!author) {
      errors.category = "";
      errors.author = "field is required";
    } else if (!editorText) {
      errors.author = "";
      errors.editorText = "field is required";
    } else if (!blogImage && !blogBySlug.image) {
      errors.editorText = "";
      setImageError("Choose a image");
    } else {
      setSave(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("is_photo_feture", toggle);
      formData.append("description", editorText);
      blogImage && formData.append("image", blogImage);
      formData.append("category", category);
      if (blogBySlug.slug) {
        axiosInstance
          .patch(`blog-public/update/${blogBySlug.slug}/`, formData)
          .then((res) => {
            setMessage("Information updated sucessfully");
            setSave(false);
            setOpen(true);
          })
          .catch((err) => {
            console.error(err);
            setSave(false);
          });
      } else {
        axiosInstance
          .post(`/blog/create/`, formData)
          .then((res) => {
            setMessage("Information saved sucessfully");
            setOpen(true);
            setSave(false);
          })
          .catch((err) => {
            console.error(err);
            setSave(false);
          });
      }
    }

    setblog({
      ...blog,
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
          setblogImage(file);
          // handleImageChange(file);
          setImageError("");
        } else {
          setblogImage("");
          setImageError("Invalid file");
        }
      };
      image.onerror = function () {
        setblogImage("");
        setImageError("Invalid file");
      };
      selectedImageName.current.innerHTML = fileName;
    }
  };

  const fetchCategoryList = async (signal) => {
    await axiosInstance
      .get(`/courses/only-category/list/`, { signal })
      .then((res) => {
        setCourseCategoryList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchCategoryList(signal);
    return () => {
      controller.abort();
    };
  }, []);
  const { title, author, errors } = blog;
  // console.log(blogImage);
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
              onChange={(e) => setblog({ ...blog, title: e.target.value })}
              className="w-full border border-gray-400 px-2 rounded-md"
            />
            <div className="text-sm text-red-500">{errors.title}</div>
          </div>
          {/* text editor  */}
          <div className="mt-5">
            <TextEditor
              handleEditorText={handleEditorText}
              des={blog.description}
            />
            <div className="text-sm text-red-500">{errors.editorText}</div>
          </div>
          <div>
            <div className="flex flex-col mt-4">
              <div className="flex">Category</div>
              <div className=" relative">
                <div
                  className="flex justify-between border border-gray-400 px-3 rounded-md cursor-pointer items-center shadow-lg z-20 py-2"
                  onClick={() =>
                    setCategoryToggle((categoryToggle) => !categoryToggle)
                  }
                >
                  <p className="flex-1">
                    {selecetdCourseCategoryList
                      ? selecetdCourseCategoryList.title
                      : ""}
                  </p>
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
                {categoryToggle && (
                  <div className="absolute inset-x-0 top-10 w-full flex flex-col bg-white text-black z-10 border rounded-md shadow-lg py-2 divide-y divide-gray-300 cursor-pointer h-64 overflow-auto">
                    {Array.isArray(courseCategoryList) &&
                      courseCategoryList.map((i, index) => {
                        return (
                          <div
                            className="px-4"
                            key={index}
                            onClick={() => {
                              setSelecetdCourseCategoryList(i);
                              setCategoryToggle(false);
                              setblog({ ...blog, category: i.id });
                            }}
                          >
                            {i.title}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
              <div className="text-sm text-red-500">{errors.category}</div>
            </div>
            <div className="mt-1">
              <div className="ml-1">Author Details</div>
              <input
                onChange={(e) => setblog({ ...blog, author: e.target.value })}
                type="text"
                name="author"
                value={author}
                className="w-full border border-gray-400 mt-1 py-1 px-5 rounded-md"
              />
              <div className="text-sm text-red-500">{errors.author}</div>
            </div>
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

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                <div className="self-center">Is Photo Feature</div>
                <label className="switch">
                  <input
                    onChange={handleswitchchange}
                    name="feature"
                    type="checkbox"
                  />
                  <span className="sliders round"></span>
                </label>
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
                <SaveButton update={blogBySlug.slug ? "UPDATE" : ""} />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default React.memo(AddBlog);
