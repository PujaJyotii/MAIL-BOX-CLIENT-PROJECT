import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import UIshowReducer from "./UIshow";

const store = configureStore({
  reducer: { auth: authReducer ,UIshow : UIshowReducer},
});
export default store;