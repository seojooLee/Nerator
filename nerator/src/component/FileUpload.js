import React, { useRef } from "react";
import Button from "./Button";

const FileUpload = (props) => {
  const fileInputInfo = useRef(null);
  const handleClick = (e) => {
    fileInputInfo.current.click();
  };

  const handleChangeUpload = (e) => {
    const fileUpload = e.target.files[0];
    props.handleFile(fileUpload);
  };

  return (
    <>
      <Button text={"파일 업로드"} onClick={(e) => handleClick(e)} />
      <input
        type="file"
        accept={".xls,.xlsx"}
        ref={fileInputInfo}
        style={{ display: "none" }}
        onChange={(e) => handleChangeUpload(e)}
      />
    </>
  );
};

export default FileUpload;

//https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
