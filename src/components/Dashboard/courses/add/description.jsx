import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_DESCRIPTION_ADD } from "../../../../redux/actions/actionsTypes";
import TextEditor from "../../../common/text-editor/TextEditor";
// import DescriptionEditor from "./text-editor/DescriptionEditor";

const Description = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.course);
  const des = useSelector((state) => state.course.descripton);
  /*sate to get the description */
  const [editorText, setEditorText] = useState("");
  const handleEditorText = (value) => {
    setEditorText(value);
  };
  useEffect(() => {
    dispatch({
      type: COURSE_DESCRIPTION_ADD,
      payload: editorText,
    });
    // eslint-disable-next-line
  }, [editorText]);
  return (
    <div style={{ height: 440 }} className="sm:p-4 p-2 ">
      <div className="">
        <TextEditor handleEditorText={handleEditorText} des={des} />
        <div className="text-sm text-red-500">{errors.descripton}</div>
      </div>
    </div>
  );
};

export default Description;
