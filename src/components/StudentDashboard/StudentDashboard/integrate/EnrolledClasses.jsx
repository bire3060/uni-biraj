import React from "react";

function EnrolledClasses({ classes }) {
  return (
    <div className="lg:w-64 ">
      <div className="flex flex-col border rounded-md p-4">
        <span className="text-xl font-semibold text-blue3">
          Enrolled Classes
        </span>
        {classes.length === 0 ? (
          <div className="text-xs mt-1">
            You haven't enrolled any classes yet
          </div>
        ) : (
          <div className="flex flex-col mt-5">
            {Array.isArray(classes) &&
              classes.map((data) => {
                const { agenda, id, start_time, join_url } = data;
                return (
                  <div
                    key={id}
                    className="bg-gray-100 mt-1 flex items-center justify-between px-3 py-2"
                  >
                    <div>
                      <div>{agenda}</div>
                      <div className="text-xs">
                        Start at: {start_time.split("T")[1].split(":")[0]}:
                        {start_time.split("T")[1].split(":")[1]}
                        {start_time.split("T")[1].split(":")[0] > 11
                          ? " PM"
                          : " AM"}
                      </div>
                    </div>
                    <div>
                      <a
                        href={join_url}
                        className="text-xs bg-pink3  text-white px-3 py-1 rounded-md"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Join
                      </a>{" "}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrolledClasses;
