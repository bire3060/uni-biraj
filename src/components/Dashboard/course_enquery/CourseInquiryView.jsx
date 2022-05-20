import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../api/axiosInstance";
import userImage from "../../../assets/images/student-dashboard/userImg.webp";
import botImage from "../../../assets/images/student-dashboard/botImage.webp";

const CourseInquiryView = ({ qstAns, userId, msgTitle }) => {
  const { msgRef } = useRef();
  const [messages, setMessages] = useState("");
  const [getAllChat, setAllChat] = useState([]);
  const title = msgTitle ? msgTitle : [];
  const [error, setError] = useState(false);
  const getAllMessages = (signal) => {
    axiosInstance
      .get(`/inquery/get-message/${qstAns.id}`, { signal })
      .then((res) => {
        setAllChat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (messages === "") {
      setError(true);
    } else {
      let msg = {
        title: title.id,
        message: messages,
        sender_id: userId,
      };
      axiosInstance
        .post(`/inquery/create-message/`, msg)
        .then((res) => {
          getAllMessages();
          setMessages("");
          msgRef.current.scrollIntoView();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllMessages(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col">
      <div className="px-4  h-72 overflow-auto pb-5" ref={msgRef}>
        {/* student  */}
        <div className="flex mt-4 w-full items-center text-sm">
          <div className="w-12">
            <img
              src={botImage}
              alt="admin"
              className="h-10 w-10 rounded-full object-cover bg-cover "
            />
          </div>
          <div className=" bg-green-100 p-2 rounded-lg  ml-4">
            <div>{title.title}</div>
          </div>
        </div>
        {Array.isArray(getAllChat) &&
          getAllChat.map((msg, index) => {
            const { sender, message } = msg;
            return (
              <React.Fragment key={index}>
                {/* admin  */}
                {sender.user_type === "ST" && (
                  <div className="flex mt-4 w-full items-center text-sm">
                    <div className="w-12">
                      <img
                        src={botImage}
                        alt="botImage"
                        className="h-10 w-10 rounded-full object-cover bg-cover "
                      />
                    </div>
                    <div className=" bg-green-100 p-2 rounded-lg  ml-4">
                      <div>{message}</div>
                    </div>
                  </div>
                )}
                {/* student  */}
                {sender.user_type !== "ST" && (
                  <div className="flex mt-4 w-full justify-end text-sm">
                    <div style={{ order: 2 }} className="w-12">
                      <img
                        src={userImage}
                        alt="userimage"
                        className="h-10 w-10 rounded-full object-cover bg-cover "
                      />
                    </div>
                    <div className=" bg-indigo-100 p-2 rounded-lg  mr-4">
                      <div>{message}</div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      <form
        className="flex  items-center px-5 border-t pt-2"
        onSubmit={handleSubmit}
      >
        <textarea
          name=""
          id=""
          rows="2"
          value={messages}
          onChange={(e) => {
            setMessages(e.target.value);
            setError(false);
          }}
          className={` flex-1 mr-5 resize-none rounded-lg px-5 py-1 ${
            error ? "border-2 border-pink5" : "border border-gray-300 "
          }`}
        ></textarea>
        <button
          type="submit"
          className=" rounded-full bg-blue3 flex justify-center md:my-2  text-lg py-1 text-white px-6"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CourseInquiryView;
