import React from "react";

function Basicdetail({ HandelChange, input, error }) {
  const { fname, lname, email, country_code, phone, country, city, message } =
    input;
  return (
    <div className="flex flex-col space-y-2">
      {/* first name  */}
      <div className="flex-1 flex flex-col ">
        <label
          htmlFor=""
          className="text-semibold mb-1 flex items-center space-x-1 text-sm text-gray-700 ml-1"
        >
          <span>First Name</span>
          <span className="text-red-500 font-semibold text-lg">*</span>
        </label>
        <div>
          <input
            onChange={(e) => {
              HandelChange(e);
            }}
            type="text"
            name="fname"
            value={fname}
            placeholder="First name"
            spellCheck="false"
            className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
          />
          {error.fname && (
            <p className="text-sm pl-2 text-red-500">{error.fname}</p>
          )}
        </div>
        {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
      </div>
      {/* lname  */}
      <div className="flex-1 flex flex-col ">
        <label
          htmlFor=""
          className="text-semibold mb-1 flex items-center space-x-1 text-sm text-gray-700 ml-1"
        >
          <span>Last Name</span>
          <span className="text-red-500 font-semibold text-lg">*</span>
        </label>
        <div>
          <input
            onChange={(e) => {
              HandelChange(e);
            }}
            type="text"
            name="lname"
            value={lname}
            placeholder="Last name"
            spellCheck="false"
            className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
          />
          {error.lname && (
            <p className="text-sm pl-2 text-red-500">{error.lname}</p>
          )}
        </div>
        {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
      </div>
      {/* email  */}
      <div className="flex-1 flex flex-col ">
        <label
          htmlFor=""
          className="text-semibold flex items-center space-x-1 mb-1 text-sm text-gray-700 ml-1"
        >
          <span>Email</span>
          <span className="text-red-500 font-semibold text-lg">*</span>
        </label>
        <div>
          <input
            onChange={(e) => {
              HandelChange(e);
            }}
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            spellCheck="false"
            className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
          />
          {error.email && (
            <p className="text-sm pl-2 text-red-500">{error.email}</p>
          )}
        </div>
        {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
      </div>
      {/* phone number  */}
      <div className="flex-1 flex flex-col ">
        <label
          htmlFor=""
          className="text-semibold flex items-center space-x-1 mb-1 text-sm text-gray-700 ml-1"
        >
          <span>Phone</span>
          <span className="text-red-500 font-semibold text-lg">*</span>
        </label>
        <div className="flex items-center space-x-4">
          <input
            onChange={(e) => {
              HandelChange(e);
            }}
            type="number"
            name="country_code"
            value={country_code}
            placeholder="Code"
            spellCheck="false"
            className={`text-sm w-28 placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
          />

          <input
            onChange={(e) => {
              HandelChange(e);
            }}
            type="number"
            name="phone"
            value={phone}
            placeholder="Phone number"
            spellCheck="false"
            className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
          />
        </div>
        {error.country_code && (
          <p className="text-sm pl-2 text-red-500">{error.country_code}</p>
        )}
        {error.phone && (
          <p className="text-sm pl-2 text-red-500">{error.phone}</p>
        )}
        {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
      </div>
      {/* country city  */}
      <div className="flex items-center justify-between space-x-4">
        {/* country  */}
        <div className="flex-1 flex flex-col ">
          <label
            htmlFor=""
            className="text-semibold flex items-center space-x-1 mb-1 text-sm text-gray-700 ml-1"
          >
            <span>Country</span>
            <span className="text-red-500 font-semibold text-lg">*</span>
          </label>
          <div>
            <input
              onChange={(e) => {
                HandelChange(e);
              }}
              type="text"
              name="country"
              value={country}
              placeholder="Country"
              spellCheck="false"
              className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
            />
            {error.country && (
              <p className="text-sm pl-2 text-red-500">{error.country}</p>
            )}
          </div>
          {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
        </div>
        {/* city  */}
        <div className="flex-1 flex flex-col ">
          <label
            htmlFor=""
            className="text-semibold mb-1 flex items-center space-x-1 text-sm text-gray-700 ml-1"
          >
            <span>City</span>
            <span className="text-red-500 font-semibold text-lg">*</span>
          </label>
          <div>
            <input
              onChange={(e) => {
                HandelChange(e);
              }}
              type="text"
              name="city"
              value={city}
              placeholder="City"
              spellCheck="false"
              className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
            />
            {error.city && (
              <p className="text-sm pl-2 text-red-500">{error.city}</p>
            )}
          </div>
          {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
        </div>
      </div>
      {/* message  */}
      <div className="flex-1 flex flex-col ">
        <label
          htmlFor=""
          className="text-semibold flex items-center space-x-1 mb-1 text-sm text-gray-700 ml-1"
        >
          <span>Message</span>
          <span className="text-red-500 font-semibold text-lg">*</span>
        </label>
        <div>
          <textarea
            type="text"
            name="message"
            value={message}
            onChange={(e) => {
              HandelChange(e);
            }}
            placeholder="Message"
            spellCheck="false"
            className={`text-sm w-full placeholder-gray-500 px-3 py-2.5 border border-gray3 rounded-lg focus:bg-pink1 focus:border-pink1`}
          />
          {error.message && (
            <p className="text-sm pl-2 text-red-500">{error.message}</p>
          )}
        </div>
        {/* {email && (
                <div className="bg-pink-700 relative text-white mt-1 text-xs px-2 py-1.5 rounded">
                  <span className="z-10">{email}</span>
                  <span className="w-3 h-3 bg-pink-700 absolute transform rotate-45 -top-1 left-5  z-0"></span>
                </div>
              )} */}
      </div>
    </div>
  );
}

export default Basicdetail;
