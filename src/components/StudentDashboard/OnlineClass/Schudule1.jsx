import React, { useState, useEffect } from "react";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import "./schudule.css";

import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import axiosInstance from "../../../api/axiosInstance";

const Schudule = () => {
  const [event, setEvent] = useState([
    {
      Id: 1,
      Subject: "Meeting - 1",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 16, 12, 30),
      IsAllDay: false,
    },
    {
      Id: 1,
      Subject: "Meeting - 4",
      StartTime: new Date(2018, 1, 15, 1, 0),
      EndTime: new Date(2018, 1, 16, 12, 30),
      IsAllDay: false,
    },
  ]);
  const getAllClassSchedual = (signal) => {
    axiosInstance
      .get(`/user/education/enrolled-meet-list/`, { signal })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllClassSchedual(signal);
    return () => {};
  }, []);
  return (
    <div style={{ overflow: "hidden", width: "auto", display: "flex" }}>
      <div style={{ width: "100%", margin: 50 }}>
        <ScheduleComponent
          height="550px"
          selectedDate={new Date(2018, 1, 15)}
          eventSettings={{
            dataSource: event,
            fields: {
              id: "Id",
              subject: { name: "Subject" },
              isAllDay: { name: "IsAllDay" },
              startTime: { name: "StartTime" },
              endTime: { name: "EndTime" },
            },
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
        ;
      </div>
    </div>
  );
};

export default Schudule;
