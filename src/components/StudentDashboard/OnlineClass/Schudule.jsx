import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import axiosInstance from "../../../api/axiosInstance";

const Schudule = () => {
  const [events, setevents] = useState([]);
  const getAllClassSchedual = (signal) => {
    axiosInstance
      .get(`/user/education/enrolled-meet-list/`, { signal })
      .then((res) => {
        // id: createEventId(),
        // title,
        // start: selectInfo.startStr,
        // end: selectInfo.endStr,
        // allDay: selectInfo.allDay
        // console.log(res.data);
        let tem = [];
        res.data.map((data) => {
          const { agenda, start_time, end_date_time, join_url } = data;
          const sdate = start_time.split("T")[0];
          const edate = end_date_time.split("T")[0];
          tem.push({
            id: data.id,
            title: agenda,
            start: sdate,
            end: edate,
            url: join_url,
          });
          return tem;
        });
        setevents(tem);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEvents = (events) => {
    console.log(events);
  };

  // console.log(events);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllClassSchedual(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full max-w-4xl  mx-auto my-10">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventsSet={handleEvents}
      />
    </div>
  );
};
export default Schudule;
