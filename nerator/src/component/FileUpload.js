import React, { useRef } from "react";
import Button from "./Button";

const FileUpload = (props) => {
  const fileInputInfo = useRef(null);
  const handleClick = (e) => {
    fileInputInfo.current.click();
  };

  const handleChangeUpload = (e) => {
    props.handleFile(e);
  };

  return (
    <>
      <Button text={props.text} onClick={(e) => handleClick(e)} />
      <input
        type="file"
        id={props.id}
        accept={props.extension}
        ref={fileInputInfo}
        style={{ display: "none" }}
        onChange={(e) => handleChangeUpload(e)}
      />
    </>
  );
};

FileUpload.defaultProps = {
  extension: ".xls,.xlsx",
  text: "파일 업로드",
  id: "",
};

export default FileUpload;

//https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
