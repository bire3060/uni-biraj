import React from "react";

function Detail({
  f_name,
  l_name,
  country,
  degree_level,
  overall_score,
  english_test,
  phone,
  email,
  city,
  preferred_country,
  preferred_intake,
  message,
}) {
  return (
    <div className="w-full">
      <div className="text-gray-900 font-semibold">Student Detail</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Name:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {f_name} {l_name}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Email:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {email}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Country:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {country}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">City:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {city}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Degree Level:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {degree_level}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Phone:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {phone}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">English Test:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {english_test}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Overall Score:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {overall_score}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Preferred Country:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {preferred_country}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-gray-800">Preferred Intake:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600">
            {preferred_intake}
          </span>
        </div>
        <div className="col-span-1 md:col-span-2 flex space-x-2 items-center">
          <span className="text-gray-800">Message:</span>
          <span className="border border-gray-200 rounded-md py-1 px-3 text-gray-600 w-full">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Detail;
