import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Contents from "../layout/Contents";
import { addList, addNameTag } from "../module/nameTag";
import { updateLocation } from "../module/location";

function NeratorContainer() {
  const { filesInfo } = useSelector((state) => ({
    //    excelData: state.nameTag.excelData,
    filesInfo: state.nameTag,
  }));

  // const test = useSelector((state) => console.log(state.nameTag));

  const { locData } = useSelector((state) => ({
    locData: state.location.locData,
  }));

  const dispatch = useDispatch();

  const onAddList = (excelData) => dispatch(addList(excelData.result));
  const onAddFile = (filesInfo, id) => dispatch(addNameTag(filesInfo, id));
  const setLocation = (location) => dispatch(updateLocation(location));

  return (
    <Contents
      //  excelData={excelData}
      filesInfo={filesInfo}
      addNameTag={onAddFile}
      addList={onAddList}
      setLocation={setLocation}
      locList={locData}
    />
  );
}

export default NeratorContainer;
