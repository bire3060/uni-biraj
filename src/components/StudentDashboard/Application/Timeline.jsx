import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "./timeline.css";
const Timeline = () => {
  const [getdata, setgetdata] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/courses/course-process-list/`).then((res) => {
      setgetdata(res.data);
    });
  }, []);
  return (
    <div style={{ paddingLeft: 100 }}>
      <section className="ps-timeline-sec w-full">
        <div className="container w-full">
          <ol
            style={{
              width: 250 * getdata.length,
              marginTop: 200,
              marginBottom: 0,
              paddingBottom: 200,
            }}
            className="ps-timeline"
          >
            {Array.isArray(getdata) &&
              getdata.map((list, index) => {
                const { status, description, created_at, course } = list;
                const date = created_at.split("T")[0];
                return (
                  <div key={index}>
                    {index % 2 === 0 ? (
                      <li
                        style={{
                          height: "180px",
                          width: 250,
                        }}
                      >
                        <div className="img-handler-top">
                          <div className="ps-bot">
                            <div
                              className="dots"
                              style={{
                                color: "gray",
                                fontWeight: 400,
                                fontSize: 15,
                                lineHeight: 1.2,
                              }}
                            >
                              {description}
                            </div>
                            <div className="text-xs line-clamp-1">{course}</div>
                            <div style={{ fontSize: 23, fontWeight: 700 }}>
                              {date}
                            </div>
                          </div>
                        </div>
                        <span className="ps-sp-top flex justify-center items-center text-xl font-semibold text-gray-50">
                          *
                        </span>
                        <div className="numbert">{index + 1}</div>
                        <h3 className="titlet font-semibold">{status}</h3>
                      </li>
                    ) : (
                      <li style={{ height: "180px" }}>
                        <div className="img-handler-bot"></div>
                        <div className="ps-top">
                          <div className="text-xs line-clamp-1">{course}</div>
                          <div style={{ fontSize: 23, fontWeight: 700 }}>
                            {date}
                          </div>
                          <div
                            className="dots"
                            style={{
                              color: "gray",
                              fontWeight: 400,
                              fontSize: 15,
                              height: 60,
                              width: "100%",
                              lineHeight: 1.2,
                            }}
                          >
                            {description}
                          </div>
                        </div>
                        <span className="ps-sp-bot "></span>
                        <div className="numberb">{index + 1}</div>
                        <h3 className="titleb font-semibold">{status}</h3>
                      </li>
                    )}
                  </div>
                );
              })}
          </ol>
        </div>
      </section>
    </div>
  );
};
export default Timeline;
