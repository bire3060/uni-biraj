import React, { useState, useEffect } from "react";
import ClassicExtended from "ckeditor5-build-classic-extended";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function TextEditor({ handleEditorText, des }) {
  const [text, setText] = useState("");
  const handleText = (editor) => {
    const data = editor.getData();
    setText(data);
    handleEditorText(data);
  };
  useEffect(() => {
    des ? setText(`${des}`) : setText("");
    // eslint-disable-next-line
  }, [des]);
  return (
    <>
      <div className="w-fullz-0 ">
        <CKEditor
          editor={ClassicExtended}
          data={text}
          config={{
            toolbar: [
              "heading",
              "|",
              "fontColor",
              "fontSize",
              "fontFamily",
              "bold",
              "italic",
              "underline",
              "subscript",
              "superscript",
              "|",
              "link",
              "numberedList",
              "bulletedList",
              "|",
              "imageUpload",
              "|",
              "blockQuote",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          }}
          onChange={(event, editor) => {
            handleText(editor);
          }}
        />
      </div>
    </>
  );
}

export default React.memo(TextEditor);
