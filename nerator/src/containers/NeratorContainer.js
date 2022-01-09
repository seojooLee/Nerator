import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Contents from "../layout/Contents";
import { addList, addNameTag } from "../module/nameTag";
import { updateLocation } from "../module/location";
import { uploadExcelData } from "../module/excelData";

function NeratorContainer() {
  const { filesInfo, excelData } = useSelector((state) => ({
    excelData: state.excel,
    filesInfo: state.nameTag,
  }));

  const test = useSelector((state) => console.log(state));
  console.log("test");
  console.log(test);

  const { locData } = useSelector((state) => ({
    locData: state.location.locData,
  }));

  const dispatch = useDispatch();

  const onAddList = (excelData) => dispatch(addList(excelData.result));
  const onAddFile = (filesInfo, id) => dispatch(addNameTag(filesInfo, id));
  const setLocation = (location) => dispatch(updateLocation(location));
  const setExcelData = (excel) => dispatch(uploadExcelData(excel));

  return (
    <Contents
      excelData={excelData}
      filesInfo={filesInfo}
      addNameTag={onAddFile}
      addList={onAddList}
      setLocation={setLocation}
      setExcelData={setExcelData}
      locList={locData}
    />
  );
}

export default NeratorContainer;
