import { combineReducers } from "redux";
import nameTag from "./nameTag";
import location from "./location";

const rootReducer = combineReducers({ nameTag, location });

export default rootReducer;
