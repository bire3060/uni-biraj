import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DashboardPath from "../../common/dashboard-path";
import PrekasAdd from "./PrekasAdd";
import PreksLists from "./PreksLists";
const steps = ["Add", "Lists"];
const paths = ["Dashboard", "Preks"];
const Preks = () => {
  const [active, setActive] = useState("Add");
  const [perkById, setperkById] = useState([]);
  //fetching blog wdata by slug
  const fetchByPerkById = (slug) => {
    axiosInstance
      .get(`/std-gift-update/${slug}/`)
      .then((res) => {
        setperkById(res.data);

        setActive("Add");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="bg-gray-100  w-full">
      <div className="flex justify-between py-1 items-center bg-white px-4">
        <DashboardPath paths={paths.concat(active)} />
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className={`font-semibold text-center shadow-2xl rounded ${
                  active === step
                    ? "bg-blue2 text-gray-100 cursor-default"
                    : "bg-white text-blue2 border border-gray-300 cursor-pointer"
                }
              }`}
                onClick={() => setActive(step)}
              >
                <p>{step}</p>
              </div>
            );
          })}
        </div>
        <div className="border rounded bg-white institution-add-input-fields-container p-4">
          {active === "Add" && <PrekasAdd perkById={perkById} />}
          {active === "Lists" && (
            <PreksLists fetchByPerkById={fetchByPerkById} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Preks;
