import React, { useState } from "react";
import CountryAdd from "./CountryAdd";
import CountryCityAdd from "./CountryCityAdd";
function Country() {
  const [id, setid] = useState("");
  return (
    <div className="bg-gray-100 w-full relative">
      {/* top breadcrum  */}
      <div className="h-8 w-full bg-white shadow-lg">
        <div className="w-11/12 flex text-center h-full text-sm font-medium  mx-auto">
          <div className="self-center">{"Dashboard > Settings > Country"}</div>
        </div>
      </div>
      <div className="md:flex justify-between  md:space-x-10   mt-20 px-10">
        <div className="flex-1">
          <CountryAdd setid={setid} />
        </div>
        <div className="flex-1">
          <CountryCityAdd id={id} />
        </div>
      </div>
    </div>
  );
}

export default Country;
