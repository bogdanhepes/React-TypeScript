import { AnyAction } from "redux";
import {
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
} from "./../../actions/Types";

const initialState = { todo:{},todos: [] };

// eslint-disable-next-line
export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
      };
    case GET_TODOS_FAIL:
      return {
        ...state,
        todos: null,
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
      };
    case ADD_TODO_FAIL:
      return {
        ...state,
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todo: payload,
      };
    case GET_TODO_FAIL:
      return {
        ...state,
        todo: null,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_TODO_FAIL:
      return {
        ...state,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
      };
    case DELETE_TODO_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
