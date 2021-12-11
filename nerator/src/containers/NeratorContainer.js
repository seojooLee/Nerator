import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Contents from "../layout/Contents";
import { addList, addNameTag } from "../module/nameTag";
import { updateLocation } from "../module/location";

function NeratorContainer() {
  const { excelData, filesInfo } = useSelector((state) => ({
    excelData: state.nameTag.excelData,
    filesInfo: state.nameTag.filesInfo,
  }));

  const { locData } = useSelector((state) => ({
    locData: state.location.locData,
  }));

  const dispatch = useDispatch();

  const onAddList = (excelData) => dispatch(addList(excelData.result));
  const onAddNameTag = (filesInfo) => dispatch(addNameTag(filesInfo));
  const setLocation = (location) => dispatch(updateLocation(location));

  return (
    <Contents
      excelData={excelData}
      filesInfo={filesInfo}
      addNameTag={onAddNameTag}
      addList={onAddList}
      setLocation={setLocation}
      locList={locData}
    />
  );
}

export default NeratorContainer;
