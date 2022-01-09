import { combineReducers } from "redux";
import nameTag from "./nameTag";
import location from "./location";
import excel from "./excelData";

const rootReducer = combineReducers({ nameTag, location, excel });

export default rootReducer;
