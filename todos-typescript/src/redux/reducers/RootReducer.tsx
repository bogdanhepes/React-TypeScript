import { combineReducers } from "redux";
import Todos from "./Todos";

export const rootReducer = combineReducers({
  Todos,
});
export type RootState = ReturnType<typeof rootReducer>;
