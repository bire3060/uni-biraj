import React from "react";
import { useSelector } from "react-redux";
import { UploadEditDownloadButton } from "../../../../common/buttons";
import IconManager from "../../../../common/IconManager";
import "react-toastify/dist/ReactToastify.css";

const Documents = () => {
  const { documents } = useSelector((state) => state.studentDetails);
  return (
    <div>
      {/* All uploaded files */}
      {documents.length === 0 && (
        <div className="flex justify-center">No document to show</div>
      )}
      <div className="space-y-4 py-6">
        {documents.map((document, index) => {
          const { name } = document;
          return (
            <div
              className="sm:w-11/12 mx-auto flex rounded-lg py-2 border shadow-lg"
              key={index}
            >
              <div className="flex border-r-2 border-gray-400 space-x-8 items-center px-8">
                <IconManager icon="Folder" className="w-7 h-7 cursor-pointer" />
              </div>
              <div className="flex gap-5 px-4 items-center justify-between flex-1">
                <div className="flex-1">
                  <div className="font-bold pl-8">{name}</div>
                  <div className={`text-xs text-gray5 pl-8`}>
                    {/* {(file.size / (1024 * 1024)).toFixed(2)} MB */}
                  </div>
                </div>
                <div className="space-x-2 flex">
                  {/* <UploadEditDownloadButton type="Edit" /> */}
                  <UploadEditDownloadButton type="Download" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
