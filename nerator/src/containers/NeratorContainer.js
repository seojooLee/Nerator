import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Contents from "../layout/Contents";
import { addList, addNameTag } from "../module/nameTag";

function NeratorContainer() {
  const { excelData, filesInfo } = useSelector((state) => ({
    excelData: state.nameTag.excelData,
    filesInfo: state.nameTag.filesInfo,
  }));
  console.log("container");
  console.log(excelData);

  const dispatch = useDispatch();

  const onAddList = (excelData) => dispatch(addList(excelData.result));
  const onAddNameTag = (filesInfo) => dispatch(addNameTag(filesInfo));

  return (
    <Contents
      excelData={excelData}
      filesInfo={filesInfo}
      addNameTag={onAddNameTag}
      addList={onAddList}
    />
  );
}

export default NeratorContainer;
