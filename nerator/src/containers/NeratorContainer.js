import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Contents from "../layout/Contents";
import { addList } from "../module/nameTag";

function NeratorContainer() {
  const { excelData } = useSelector((state) => ({
    excelData: state.nameTag.excelData,
  }));
  console.log("container");
  console.log(excelData);

  const dispatch = useDispatch();

  //const onAddList = (excelData) => dispatch(addList(excelData.result));
  const onAddList = (excelData) => {
    console.log(excelData);
    dispatch(addList(excelData.result));
  };

  return <Contents excelData={excelData} addList={onAddList} />;
}

export default NeratorContainer;
