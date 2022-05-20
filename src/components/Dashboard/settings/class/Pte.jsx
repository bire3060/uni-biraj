import React from "react";

function Pte() {
  return (
    <>
      {/* sucesspage from Modal*/}
      {/* <SucessMessage open={open} closeModal={closeModal} message={message} /> */}
      {/*-------------*/}
      <div className="flex flex-col bg-white py-5 px-3 md:px-10 space-y-4  ">
        <div>
          <div className="text-xl text-gray-500  mb-2">Ielts Class Entry</div>
          <form
            action=""
            className="flex flex-col space-y-2"
            //   onSubmit={handleSubmit}
          >
            {/* class name  */}
            <div className=" flex  flex-col">
              <label htmlFor="" className="text-gray-800  font-medium mb-2">
                Class Name
              </label>
              <div>
                <input
                  name="ielts"
                  value="Ielts"
                  type="text"
                  readOnly
                  placeholder="Enter country name"
                  className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 space-x-4">
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Start Date
                </label>
                <div>
                  <input
                    name="ielts"
                    type="date"
                    placeholder="Enter country name"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  Start Time
                </label>
                <div>
                  <input
                    name="ielts"
                    type="time"
                    placeholder="Enter country name"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className=" flex  flex-col flex-1">
                <label htmlFor="" className="text-gray-800  font-medium">
                  End Time
                </label>
                <div>
                  <input
                    name="ielts"
                    type="time"
                    placeholder="Enter country name"
                    className="w-full placeholder-gray-500 bg-gray2 px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300  focus:ring-offset-2 rounded focus:bg-transparent"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto mt-3">
              <button
                type="submit"
                className="bg-pink3 text-sm font-semibold py-1 text-white 
    px-6 rounded-md cursor-pointer hover:bg-pink4"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Pte;
