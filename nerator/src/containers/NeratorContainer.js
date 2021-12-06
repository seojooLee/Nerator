import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Contents from "../layout/Contents";
import { addList } from "../module/nameTag";

function NeratorContainer() {
  const { data } = useSelector((state) => ({
    data: state.data,
  }));

  const dispatch = useDispatch();

  const onAddList = (data) => dispatch(addList(data));

  return <Contents data={data} addList={onAddList} />;
}

export default NeratorContainer;
