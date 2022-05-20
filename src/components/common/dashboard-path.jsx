import React from "react";

const DashboardPath = ({ paths }) => {
  return <div className="text-sm font-semibold">{paths.join(" > ")}</div>;
};

export default DashboardPath;
