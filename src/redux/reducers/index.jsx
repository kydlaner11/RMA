import { combineReducers } from "redux";
import app from "./appReducer";
import auth from "./authReducer";

export default combineReducers({
  auth,
  app,
});
