import React from "react";

const Progress = ({ done, total, percentComplete }) => {
  return (
    <div className="text-xs flex items-center space-x-2">
      <div>{done}</div>
      <div className="flex-1 bg-gray4 h-1 rounded-full overflow-hidden">
        <div
          className="bg-pink2 h-1"
          style={{ width: percentComplete + "%" }}
        ></div>
      </div>
      <div>{total}</div>
    </div>
  );
};

export default Progress;
