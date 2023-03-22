import { Dispatch } from "redux";
import {
  ADD_TODO_FAIL,
  ADD_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_TODO_SUCCESS,
  GET_TODOS_FAIL,
  GET_TODOS_SUCCESS,
  GET_TODO_FAIL,
  GET_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_SUCCESS,
} from "./Types";

import TodosService from "../services/Todos.service";

export const getTodos = () => (dispatch: Dispatch) => {
  return TodosService.getTodos().then(
    (response) => {
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: GET_TODOS_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const getTodo = (id: number) => (dispatch: Dispatch) => {
  return TodosService.getTodo(id).then(
    (response) => {
      dispatch({
        type: GET_TODO_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: GET_TODO_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const updateTodo =
  (id: number, edits: { description: string; status: boolean }) =>
  (dispatch: Dispatch) => {
    return TodosService.updateTodo(id, edits).then(
      (response) => {
        dispatch({
          type: UPDATE_TODO_SUCCESS,
        });

        return Promise.resolve();
      },
      (error) => {

        dispatch({
          type: UPDATE_TODO_FAIL,
        });

        return Promise.reject();
      }
    );
  };

export const addTodo = (description: string) => (dispatch: Dispatch) => {
  return TodosService.addTodo(description).then(
    (response) => {
      dispatch({
        type: ADD_TODO_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: ADD_TODO_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const deleteTodo = (id: number) => (dispatch: Dispatch) => {
  return TodosService.deleteTodo(id).then(
    (response) => {
      dispatch({
        type: DELETE_TODO_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: DELETE_TODO_FAIL,
      });

      return Promise.reject();
    }
  );
};
