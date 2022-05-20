import React from "react";
import Chart from "react-apexcharts";
function DonutCharts({ popurCourseTitle, popurCourseCount }) {
  const state = {
    options: {
      labels: popurCourseTitle,
    },
    series: popurCourseCount,
  };
  return (
    <div className="donut">
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
}

export default DonutCharts;
